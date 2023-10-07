<template>
  <!-- We must credit the creator of the images with a click section -->
  <NoodleLink
    v-if="photoResp"
    :class="[
      'credit-section absolute bottom-0 left-0 right-0 px-3 py-1',
      'text-right text-whiteish text-sm leading-4 bg-gray-500/25',
    ]"
    :to="createAttributeLink(photoResp.links.html)"
  >
    <span class="pr-1">Credit:</span>
    <NoodleLink
      :to="createAttributeLink(photoResp.user.portfolio_url!)"
      class="italic"
      >{{ photoResp.user.name }}</NoodleLink
    >
    <span class="px-1">on</span>
    <NoodleLink :to="createAttributeLink('https://unsplash.com/')">Unsplash</NoodleLink>
  </NoodleLink>
</template>

<script setup lang="ts">
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import NoodleLink from './NoodleLink.vue';

const props = defineProps<{ photoResp: Full | null }>();
console.log('Credit Props:', props);

function createAttributeLink(link: string): string {
  const separator = link.match(/\?w=/i) ? '&' : '?';
  return link + separator + ['utm_source=NoodlesHouse', 'utm_medium=referral'].join('&');
}
</script>
