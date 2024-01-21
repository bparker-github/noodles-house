<template>
  <MainGuard
    v-bind="smallProps"
    class="hidden sm:flex"
  >
    <slot></slot>
  </MainGuard>
</template>

<script setup lang="ts">
import MainGuard, { MainGuardProps } from './MainGuard.vue';

const smallProps = withDefaults(defineProps<MainGuardProps>(), {
  title: 'Only Mobile sizes supported',
  subTitle:
    'This site is currently designed only with support for mobile screens. On desktop, you can shrink the window, or use mobile emulation via the Developer Tools. Otherwise, visit this site on your phone, silly!',
});
</script>
