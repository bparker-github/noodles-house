<template>
  <div class="text-xs font-semibold leading-6 text-gray-400">{{ itemsTitle }}</div>
  <ul
    role="list"
    class="-mx-2 mt-2 space-y-1"
  >
    <li
      v-for="item in items"
      :key="item.name"
    >
      <a
        :href="item.href"
        :class="[
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800',
          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
        ]"
      >
        <span
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
        >
          {{ item.initial }}
        </span>
        <span class="truncate">{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar';

export interface SecondaryListItem {
  name: string;
  href: string;
  initial: string;
  id?: string | number;
  current?: boolean;
}

const { items, itemsTitle } = useDashboardSidebarStore();
</script>
