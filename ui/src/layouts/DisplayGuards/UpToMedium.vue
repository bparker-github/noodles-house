<template>
  <MainGuard
    v-bind="mediumProps"
    class="hidden md:flex"
  >
    <slot></slot>
  </MainGuard>
</template>

<script setup lang="ts">
import MainGuard, { MainGuardProps } from './MainGuard.vue';

const mediumProps = withDefaults(defineProps<MainGuardProps>(), {
  title: 'Only Mobile and small sizes supported',
  subTitle:
    'This site is currently designed only with support for mobile screens, and other nearly-as-small screens. On desktop, you can shrink the window, or use mobile emulation via the Developer Tools. Otherwise, visit this site on your phone, silly!',
});
</script>
