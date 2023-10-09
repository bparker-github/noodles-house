<template>
  <div class="fullscreen bg-blue center flex p-2 text-center text-white">
    <div>
      <div style="font-size: 30vh">{{ title }}</div>

      <div
        class="text-h2"
        style="opacity: 0.4"
      >
        {{ copy }}
      </div>

      <RouterLink :to="primaryLink">{{ primaryText }}</RouterLink>
      <RouterLink :to="secondaryLink">{{ secondaryText }}</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

export interface NotFoundPageProps {
  title?: string;
  copy?: string;
  primaryLink?: RouteLocationRaw;
  primaryText?: string;
  secondaryLink?: RouteLocationRaw;
  secondaryText?: string;
}
withDefaults(defineProps<NotFoundPageProps>(), {
  title: '404',
  copy: 'Oops. Nothing here...',
  primaryLink: '/',
  primaryText: 'Root',
  secondaryLink: '/home',
  secondaryText: 'Home',
});
</script>
