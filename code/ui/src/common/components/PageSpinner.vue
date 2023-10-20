<template>
  <div class="page-spinner flex flex-col h-full justify-center items-center">
    <div
      v-if="!hideOverlay"
      :class="['overlay', 'fixed inset-0', 'bg-bourbon-950/20']"
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
