<template>
  <!-- We must credit the creator of the images with a click section -->
  <NoodleLink
    v-if="photoResp"
    :class="[
      'credit-section absolute bottom-0 left-0 right-0 px-3 py-1',
      'text-right text-whiteish text-sm leading-4 bg-gray-500/25 hover:bg-gray-500/75',
    ]"
    :to="createAttributeLink(photoResp.links.html)"
  >
    <span class="pr-1">Credit:</span>
    <NoodleLink
      :to="createAttributeLink(photoResp.user.portfolio_url!)"
      class="italic hover:font-bold"
      >{{ photoResp.user.name }}</NoodleLink
    >
    <span class="px-1">on</span>
    <NoodleLink
      :to="createAttributeLink('https://unsplash.com/')"
      class="hover:font-bold"
      >Unsplash</NoodleLink
    >
  </NoodleLink>
</template>

<script setup lang="ts">
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import NoodleLink from '@/components/NoodleLink.vue';

defineProps<{ photoResp: Full | null }>();

function createAttributeLink(link: string): string {
  const separator = link.match(/\?w=/i) ? '&' : '?';
  return link + separator + ['utm_source=NoodlesHouse', 'utm_medium=referral'].join('&');
}
</script>
