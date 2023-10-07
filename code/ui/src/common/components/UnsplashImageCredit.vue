<template>
  <!-- We must credit the creator of the images with a click section -->
  <RouterLink
    v-if="photoResp"
    :class="[
      'credit-section absolute bottom-0 left-0 right-0 px-3 py-1',
      'text-right text-whiteish text-sm leading-4 bg-gray-500/25',
    ]"
    :to="createAttributeLink(photoResp.links.html)"
  >
    <span class="pr-1">Credit:</span>
    <RouterLink
      :to="createAttributeLink(photoResp.user.portfolio_url!)"
      class="italic"
      >{{ photoResp.user.name }}</RouterLink
    >
    <span class="px-1">on</span>
    <RouterLink :to="createAttributeLink('https://unsplash.com/')">Unsplash</RouterLink>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Full } from 'unsplash-js/dist/methods/photos/types';

defineProps<{ photoResp: Full | null }>();

function createAttributeLink(link: string): string {
  const separator = link.match(/\?w=/i) ? '&' : '?';
  return link + separator + ['utm_source=NoodlesHouse', 'utm_medium=referral'].join('&');
}
</script>
