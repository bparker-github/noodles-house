<template>
  <div
    :class="[
      // Shared styles
      'sticky top-0 z-40 flex items-center gap-x-6',
      'from-chalet-green-900 to-bourbon-400 bg-gradient-to-r from-25%',
      // Mobile styles
      'p-4 sm:px-6',
      // Desktop styles
      'lg:ml-4 lg:pl-72 lg:shadow-lg',
    ]"
  >
    <button
      type="button"
      class="bg-mallard-200 text-mallard-900 -m-2.5 rounded-lg p-2.5 lg:hidden"
      @click="doOpen"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <div class="text-whiteish flex-1 text-xl font-semibold leading-6">{{ title }}</div>
    <ProfileDropdown :items="userItemList" />
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { ProfileDropdown } from '@ui-common';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDashboardSidebarStore } from '../stores/dashboardSidebar';

const { userItemList, setIsOpen } = useDashboardSidebarStore();

const route = useRoute();
const title = ref(route.name);
watch(route, (nr) => (title.value = nr.name));

const doOpen = () => setIsOpen(true);
</script>
