<template>
  <div class="-mr-2 flex sm:hidden">
    <!-- Mobile menu button -->
    <MenuButton
      :class="[
        'relative inline-flex items-center justify-center rounded-md p-2',
        'hover:text-nh-chalet-green-200',
        'focus:text-nh-chalet-green-200 focus:ring-2 focus:ring-nh-chalet-green-200',
        isSidebarOpen ? 'text-nh-chalet-green-300' : 'text-nh-chalet-green-700',
      ]"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <span class="absolute -inset-0.5" />
      <span class="sr-only">Open main menu</span>

      <component
        :is="!isSidebarOpen ? Bars3Icon : XMarkIcon"
        class="block h-6 w-6"
        aria-hidden="true"
      />
    </MenuButton>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore';
import { MenuButton } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
const { isSidebarOpen } = storeToRefs(dashboardStore);
</script>
