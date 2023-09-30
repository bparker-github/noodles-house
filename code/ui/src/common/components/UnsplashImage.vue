<template>
  <div class="unsplash-image relative transition-opacity duration-500">
    <BlurCanvas
      v-if="state >= UIS.HAS_RESPONSE"
      :class="['image-placeholder-blur h-full w-full', { 'opacity-0': state > UIS.HAS_RESPONSE }]"
      :height="scaledHeight"
      :width="scaledWidth"
      :hash="blurHash!"
      key="canvas"
    />
    <img
      v-if="state >= UIS.HAS_RESPONSE"
      v-show="state === UIS.LOADED_REGULAR"
      class="h-full w-full object-cover object-center"
      :src="photoResp!.urls.regular"
      :alt="description"
      @load="handleImageLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { BlurCanvas } from '@noodles-house/blur-hash';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { computed, ref, watch } from 'vue';
import { useUnsplash } from '../stores/unsplashStores';

/** UnsplashImageState */
enum UIS {
  NONE = 0,
  HAS_RESPONSE = 1,
  LOADED_REGULAR = 2,
  ERROR = -1,
}

const props = defineProps<{ id: string }>();

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
  }, 5000);
}

watch(
  () => props.id,
  async (newId) => {
    // Reset state. If we have a previous image, we can show it's blur until we re-load - continue fetch.
    state.value = !photoResp.value ? UIS.NONE : UIS.HAS_RESPONSE;

    try {
      // Fetch and set state.
      const resp = await unsplashApi.getPhoto(newId);
      state.value = UIS.HAS_RESPONSE;

      // Update the response, and continue onward.
      photoResp.value = resp;
    } catch (err) {
      console.log('Unsplash image error:', err);
      state.value = UIS.ERROR;
    }
  },
  { immediate: true }
);
</script>
