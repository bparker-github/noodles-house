<template>
  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
      @click="clickButton"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
    <ProfileDropdown />
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar';
import ProfileDropdown from './ProfileDropdown.vue';

const { setIsOpen } = useDashboardSidebarStore();

function clickButton() {
  console.log('Button has been clicked.');
  setIsOpen(true);
}
</script>
