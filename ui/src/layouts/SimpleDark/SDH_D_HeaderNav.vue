<template>
  <!-- Show the top-level navigation if we are non-mobile. So ignore for now. -->
  <div class="hidden sm:ml-6 sm:block">
    <div class="flex space-x-4">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <NoodleLink
        v-for="(it, i) in dashboardStore.primaryItemList"
        :key="`${it.id}-${i}`"
        :to="it.to"
        :exact-active-class="
          it.useExactActiveClass ? 'exact-active:bg-nh-chalet-green-600' : undefined
        "
        :active-class="it.useActiveClass ? 'just-active:bg-nh-chalet-green-600' : undefined"
        @click="it.click"
        >{{ it.label }}</NoodleLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore';

const dashboardStore = useDashboardStore();
</script>
