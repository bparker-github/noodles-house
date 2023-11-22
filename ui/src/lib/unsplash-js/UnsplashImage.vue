<template>
  <div class="unsplash-image relative">
    <!-- Step 1: No data yet. Display a loading background. -->
    <div
      v-if="state === UIS.NONE"
      key="no-data"
      :class="['absolute inset-0 bg-nh-bourbon-200', normalizeClass(sharedClass)]"
    />

    <!-- Step 2: The response has been fetched or loaded, add <img> to load the desired inner image url. -->
    <img
      v-if="state >= UIS.HAS_RESPONSE"
      key="main-image"
      :class="[
        'absolute inset-0 h-full w-full object-cover object-center',
        'transition-opacity opacity-0 duration-700',
        { 'opacity-100': state === UIS.LOADED_REGULAR },
        normalizeClass(sharedClass),
      ]"
      :src="photoResp!.urls.regular"
      :alt="description"
      @load="handleImageLoaded"
    />

    <!-- Step 2.5: Response contains a blur-hash (probably); we can display that for now. -->
    <!-- Display it further down the DOM to be visible overtop of the <img> above -->
    <BlurCanvas
      key="blur-canvas"
      :class="[
        'absolute inset-0 h-full w-full',
        'transition-opacity opacity-0',
        {
          'opacity-100': state === UIS.HAS_RESPONSE,
          'duration-250': state <= UIS.HAS_RESPONSE,
          'duration-1000': state > UIS.HAS_RESPONSE,
        },
        normalizeClass(sharedClass),
      ]"
      :height="scaledHeight"
      :width="scaledWidth"
      :hash="blurHash!"
    />

    <!-- The user can provide content to display overtop of this element (parent relative); -->
    <div :class="['absolute inset-0 h-full w-full', normalizeClass(sharedClass)]">
      <slot></slot>
    </div>
    <!-- <div
      class="image-content"
      key="main-content"
    >

    </div> -->

    <!-- We must credit the creator of the images with a click section -->
    <UnsplashImageCredit
      v-if="photoResp && !omitCredit"
      :photo-resp="photoResp"
    />
  </div>
</template>

<script setup lang="ts">
import { BlurCanvas } from '../blur-hash';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { computed, ref, watch, normalizeClass } from 'vue';
import UnsplashImageCredit from './UnsplashImageCredit.vue';
import { useUnsplash } from '@/stores/unsplashStore';
import type { normalize } from 'path';

/** UnsplashImageState */
enum UIS {
  ERROR = -1,
  NONE = 0,
  HAS_RESPONSE = 1,
  LOADED_REGULAR = 2,
}

type CN_Value = string | number | boolean | undefined | null;
type CN_Mapping = Record<string, unknown>;
interface CN_ArgumentArray extends Array<CN_Argument> {}
interface CN_ReadonlyArgumentArray extends ReadonlyArray<CN_Argument> {}
export type CN_Argument = CN_Value | CN_Mapping | CN_ArgumentArray | CN_ReadonlyArgumentArray;

interface UnsplashImageProps {
  /** The ID of the photo to fetch for this block. */
  id: string;
  /** An optional value indicating whether we want to omit the credit; non-standard. */
  omitCredit?: boolean;
  /** An optional value indicating the number of ms to display the Blur before transitioning back. @default 1000 */
  transitionTime?: number;
  /**
   * A ClassList of styles to apply to all levels of the image
   *  - Helpful for borders and rounded etc.
   */
  sharedClass?: CN_Argument;
}
const props = defineProps<UnsplashImageProps>();

const state = ref(UIS.NONE);
const photoResp = ref<Full | null>(null);
const unsplashApi = useUnsplash();

const blurHash = computed(() => photoResp.value?.blur_hash ?? undefined);
const description = computed(
  () => photoResp.value?.description ?? photoResp.value?.alt_description ?? undefined
);
const scaledHeight = computed(() => {
  if (!photoResp.value) {
    return;
  }

  const ratio = photoResp.value.height / photoResp.value.width;
  return Math.round(ratio * 128);
});
const scaledWidth = computed(() => (!photoResp.value ? undefined : 128));

function handleImageLoaded() {
  setTimeout(() => {
    state.value = UIS.LOADED_REGULAR;
  }, props.transitionTime ?? 1000);
}

watch(
  () => props.id,
  async (newId) => {
    // Reset state. If we have a previous image, we can show it's blur until we re-load - continue fetch.
    state.value = !photoResp.value ? UIS.NONE : UIS.HAS_RESPONSE;

    try {
      // Fetch and set state.
      const resp = await unsplashApi.getPhoto(newId);

      if (resp) {
        state.value = UIS.HAS_RESPONSE;

        // Update the response, and continue onward.
        photoResp.value = resp;
      } else {
        state.value = UIS.ERROR;
      }
    } catch (err) {
      console.log('Unsplash image error:', err);
      state.value = UIS.ERROR;
    }
  },
  { immediate: true }
);
</script>
