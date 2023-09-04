<template>
  <div
    :class="[
      // Shared styles
      'sticky top-0 z-40 flex items-center gap-x-6',
      'bg-gradient-to-r from-chalet-green-900 from-25% to-bourbon-400',
      // Mobile styles
      'p-4 sm:px-6',
      // Desktop styles
      'lg:ml-4 lg:pl-72 lg:shadow-lg',
    ]"
  >
    <button
      type="button"
      class="-m-2.5 rounded-lg bg-mallard-200 p-2.5 text-mallard-900 lg:hidden"
      @click="doOpen"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <div class="flex-1 text-xl font-semibold leading-6 text-whiteish">{{ title }}</div>
    <ProfileDropdown :items="userItemList" />
  </div>
</template>

<script setup lang="ts">
import { ProfileDropdown } from '@/components';
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const { userItemList, setIsOpen } = useDashboardSidebarStore();

const route = useRoute();
const title = ref(route.name);
watch(route, (nr) => (title.value = nr.name));

const doOpen = () => setIsOpen(true);
</script>
