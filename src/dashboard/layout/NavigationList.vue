<template>
  <ul
    role="list"
    class="-mx-2 space-y-1"
  >
    <li
      v-for="item in navigation"
      :key="item.name"
    >
      <a
        :href="item.href"
        :class="[
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        ]"
      >
        <component
          :is="item.icon"
          class="h-6 w-6 shrink-0"
          aria-hidden="true"
        />
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';

const { navigation } = useDashboardSidebarStore();
</script>
