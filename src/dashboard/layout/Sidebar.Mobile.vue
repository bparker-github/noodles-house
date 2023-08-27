<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <MobileSidebar v-model:isOpen="sidebarOpen">
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto bg-mallard px-6 pb-2 ring-1 ring-white/10"
    >
      <div class="flex h-16 shrink-0 items-center">
        <LogoImage
          class="h-8 w-auto duo-whiteish duo2-dark-orange"
          titleRow1="Noodle's"
          titleRow2="House"
        />
      </div>

      <SidebarMainNav />
    </div>
  </MobileSidebar>
</template>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';
import SidebarMainNav from './Sidebar.MainNav.vue';
import { MobileSidebar } from '@/core';
import { storeToRefs } from 'pinia';
import LogoImage from './LogoImage.vue';

const sidebarStore = useDashboardSidebarStore();
const { sidebarOpen } = storeToRefs(sidebarStore);
</script>
