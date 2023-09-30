<template>
  <div :class="['relative transition-all duration-500']">
    <TransitionGroup
      mode="in-out"
      name="fade"
      :class="['absolute bottom-0 left-0 right-0 top-0 h-full w-full', 'transition-group-for-blur']"
    >
      <BlurHashCanvas
        v-show="!isLoaded"
        :hash="hash"
        :width="width"
        :height="height"
        :punch="punch"
        key="canvas"
        :class="['absolute bottom-0 left-0 right-0 top-0 h-full w-full', 'canvas-for-blur']"
      />
      <img
        v-show="isLoaded"
        v-bind="$attrs"
        key="image"
        :class="['absolute bottom-0 left-0 right-0 top-0 h-full w-full', 'image-for-blur']"
        :src="src"
        :srcset="srcset"
        @load="isLoaded = true"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, defineOptions, ref } from 'vue';
import BlurHashCanvas, { type BlurCanvasProps } from './BlurCanvas.vue';

// Use custom options to bind image props to not-the-parent.
defineOptions({ inheritAttrs: false });

export interface BlurHashProps extends BlurCanvasProps {
  src?: string;
  srcset?: string;
  transitionDuration?: number;
}
const props = defineProps<BlurHashProps>();
const hasImage = computed(() => !!(props.src || props.srcset));

const isLoaded = ref(false);
</script>
