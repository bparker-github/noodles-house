<template>
  <div
    class="background-spinner absolute flex flex-col flex-1 h-full w-full justify-center items-center"
  >
    <div
      v-if="!hideOverlay"
      :class="[
        'overlay',
        'absolute inset-0 backdrop-blur-xs',
        'bg-nh-bourbon-950/20',
        $attrs.class,
      ]"
    />
    <LoadingSpinner
      :class="[
        {
          'h-8 w-8': spinnerSize === 'xs',
          'h-10 w-10': spinnerSize === 'sm',
          'h-12 w-12': !spinnerSize || spinnerSize === 'md',
          'h-14 w-14': spinnerSize === 'lg',
          'h-16 w-16': spinnerSize === 'xl',
          'h-20 w-20': spinnerSize === '2xl',
        },
      ]"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';

export interface PageSpinnerProps {
  hideOverlay?: boolean;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  title?: string;
  details?: string;
}
defineProps<PageSpinnerProps>();
</script>
