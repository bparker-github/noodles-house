<template>
  <div class="space-y-1 p-2">
    <DisclosureButton
      v-for="(it, i) in items"
      :as="RouterLink"
      :key="`${it.id ?? it.label}-${i}`"
      :to="it.to"
      :exact-active-class="
        normalizeClass(['exact-active', { 'bg-nh-chalet-green-600': it.useExactActiveClass }])
      "
      :active-class="
        normalizeClass(['just-active', { 'bg-nh-chalet-green-600': !it.useExactActiveClass }])
      "
      :class="[
        'block rounded-md px-3 py-2 text-base font-medium',
        'text-nh-whiteish hover:text-nh-chalet-green-200 hover:bg-nh-chalet-green-700 hover:shadow-inner',
        'nh-focus-chalet-green-inv',
      ]"
      @click="it.click"
      >{{ it.label }}</DisclosureButton
    >
  </div>
</template>

<script setup lang="ts">
import { ListItem } from '@/components/ItemList';
import { normalizeClass } from 'vue';
import { RouterLink } from 'vue-router';

export interface ExpandableMenuSectionProps {
  items: ListItem[];
}
defineProps<ExpandableMenuSectionProps>();
</script>
