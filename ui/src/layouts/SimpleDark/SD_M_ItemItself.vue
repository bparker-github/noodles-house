<template>
  <component
    :is="!item.children?.length ? RouterLink : 'div'"
    :to="!item.children?.length ? item.to : undefined"
    :class="[
      'flex flex-1 items-center rounded-md px-3 py-2 text-base font-medium',
      'text-nh-whiteish hover:text-nh-chalet-green-200 hover:bg-nh-chalet-green-700 hover:shadow-inner',
      'nh-focus-chalet-green-inv',
    ]"
    :exact-active-class="
      normalizeClass(['exact-active', { 'bg-nh-chalet-green-600': item.useExactActiveClass }])
    "
    :active-class="
      normalizeClass(['just-active', { 'bg-nh-chalet-green-600': !item.useExactActiveClass }])
    "
    @click="item.click"
  >
    <span class="flex flex-1">
      {{ item.label }}
    </span>

    <!-- Add the dropdown button if there are children -->
    <ChevronDownIcon
      v-if="!!item.children?.length"
      class="h-5 w-5"
    />
  </component>
</template>

<script setup lang="ts">
import { ListItem } from '@/components/ItemList';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { normalizeClass } from 'vue';
import { RouterLink } from 'vue-router';

export interface SD_M_ItemItselfProps {
  item: ListItem;
}
defineProps<SD_M_ItemItselfProps>();
</script>
