<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { parseAsInt } from './tools';
import { decode } from 'blurhash';

export interface BlurCanvasProps {
  /** The blurhash of the image to decode. */
  hash: string;
  /** The optional height to decode as. @default 128 */
  height?: string | number;
  /** The optional width to decode as. @default 128 */
  width?: string | number;
  /** The optional 'punch' to scale the blurhash as. @default 1 */
  punch?: number;
}
const props = defineProps<BlurCanvasProps>();
const curHeight = computed(() => parseAsInt(props.height ?? 128));
const curWidth = computed(() => parseAsInt(props.width ?? 128));
const curPunch = computed(() => parseAsInt(props.punch ?? 1));

// Matches canvas ref name exactly.
const canvasRef = ref<HTMLCanvasElement | null>(null);

watch(
  [() => props.hash, () => curHeight.value, () => curWidth.value, () => curPunch.value],
  ([cHash, cHeight, cWidth, cPunch]) => {
    nextTick(() => {
      // No canvas yet, break early.
      if (!canvasRef.value) {
        return;
      }

      const pixels = decode(cHash, cWidth, cHeight, cPunch);
      const twoD = canvasRef.value.getContext('2d');

      /** Requires a two D canvas */
      if (!twoD) {
        return;
      }
      const imageData = twoD.createImageData(curWidth.value, curHeight.value);
      imageData.data.set(pixels);
      twoD.putImageData(imageData, 0, 0);
    });
  },
  { immediate: true }
);
</script>
