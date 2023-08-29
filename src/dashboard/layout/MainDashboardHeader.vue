<template>
  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-mallard px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button
      type="button"
      class="-m-2.5 rounded-lg bg-mallard-200 p-2.5 text-mallard-900 lg:hidden"
      @click="clickButton"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <div class="flex-1 text-xl font-semibold leading-6 text-white">{{ title }}</div>
    <ProfileDropdown />
  </div>
</template>

<script setup lang="ts">
import { ProfileDropdown } from '@/core';
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const { setIsOpen } = useDashboardSidebarStore();

const route = useRoute();
const title = ref(route.name);
watch(route, (nr) => (title.value = nr.name));

function clickButton() {
  console.log('Button has been clicked.');
  setIsOpen(true);
}
</script>
