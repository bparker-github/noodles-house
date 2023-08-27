<template>
  <div class="text-gray-400 text-xs font-semibold leading-6">{{ title }}</div>
  <ul
    role="list"
    class="-mx-2 mt-2 space-y-1"
  >
    <li
      v-for="item in itemsToUse"
      :key="item.name"
    >
      <a
        :href="item.href"
        :class="[
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        ]"
      >
        <component
          v-if="item.icon"
          :is="item.icon"
          class="h-6 w-6"
        />
        <span
          v-else
          class="border-gray-700 bg-gray-800 text-gray-400 group-hover:text-white flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium"
        >
          {{ item.initial ?? '?' }}
        </span>
        <span class="truncate">{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import type { ListItemBase } from './ListItems';

export interface SecondaryListProps {
  title?: string;
  items?: ListItemBase[];
}
</script>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';

const props = defineProps<SecondaryListProps>();
const sidebarStore = useDashboardSidebarStore();

const title = props.title ?? sidebarStore.itemsTitle;
const itemsToUse = props.items ?? sidebarStore.items;
</script>
