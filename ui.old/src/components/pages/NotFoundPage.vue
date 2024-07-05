<template>
  <div
    :class="[
      'h-full w-full flex flex-col flex-1 gap-y-4',
      'bg-nh-dark-green p-2 text-center text-white',
    ]"
  >
    <h1
      class="main-title"
      style="font-size: clamp(10rem, 40vw + 1rem, 50rem)"
    >
      {{ title }}
    </h1>

    <div class="main-body flex flex-col flex-1 gap-y-5 items-center">
      <p class="main-body-copy">{{ copy }}</p>

      <div class="flex flex-row gap-x-5 text-nh-darkest-green">
        <NhButton
          as="RouterLink"
          :b-style="BStyle.INLINE"
          :b-theme="BTheme.BOURBON"
          :to="primaryLink"
          :text="primaryText"
        />
        <NhButton
          as="RouterLink"
          :b-style="BStyle.SOLID"
          :b-theme="BTheme.BOURBON"
          :to="secondaryLink"
          :text="secondaryText"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import { RouteName } from '@/router/RouteName';

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
  primaryLink: () => ({ name: RouteName.LOGOUT }),
  primaryText: 'Logout',
  secondaryLink: () => ({ name: RouteName.HOME }),
  secondaryText: 'Home',
});
</script>
