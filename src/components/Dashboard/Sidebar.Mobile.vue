<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <MobileSidebar v-model:isOpen="sidebarOpen">
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
    >
      <div class="flex h-16 shrink-0 items-center">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>

      <SidebarMainNav />
    </div>
  </MobileSidebar>
</template>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/stores/dashboardSidebar';
import SidebarMainNav from './Sidebar.MainNav.vue';
import MobileSidebar from '@/components/MobileSidebar/MobileSidebar.vue';
import { storeToRefs } from 'pinia';

const sidebarStore = useDashboardSidebarStore();
const { sidebarOpen } = storeToRefs(sidebarStore);
console.log('Created SidebarMobile:', sidebarOpen.value);
</script>
