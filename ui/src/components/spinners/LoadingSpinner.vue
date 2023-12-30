<template>
  <div
    role="status"
    class="loading-spinner"
  >
    <BasicSpinner
      :class="[
        !omitDefaultColors &&
          'fill-nh-bourbon-500 text-nh-bourbon-900 dark:text-nh-bourbon-800 dark:fill-nh-bourbon-500',
      ]"
    />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import BasicSpinner from './BasicSpinner.vue';

defineProps<{
  omitDefaultColors?: boolean;
}>();
</script>
