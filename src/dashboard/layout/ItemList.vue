<template>
  <div
    v-if="title"
    class="text-gray-blue text-xs font-semibold leading-6"
  >
    {{ title }}
  </div>
  <ul
    role="list"
    class="-mx-2 space-y-1"
  >
    <li
      v-for="item in items"
      :key="item.label"
    >
      <component
        :is="!item.click ? RouterLink : 'button'"
        :to="item.to"
        @click="item.click"
        :class="[
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
          { 'text-white bg-mallard': item.current },
          { 'text-gray-400 hover:bg-gray-800 hover:text-white': !item.current },
        ]"
      >
        <component
          :is="item.leftIcon ?? 'span'"
          :class="[
            !item.leftIcon
              ? 'border-gray-700 bg-gray-800 text-gray-400 group-hover:text-white flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium'
              : 'h-6 w-6',
          ]"
        >
          {{ item.leftInitial }}
        </component>

        <span class="truncate">{{ item.label }}</span>
      </component>
    </li>
  </ul>
</template>

<script lang="ts">
import type { ListItem } from './ListItems';

export interface ItemListProps {
  /** The optional title to display above the items. */
  title?: string;
  items: ListItem[];
}
</script>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<ItemListProps>();
</script>
