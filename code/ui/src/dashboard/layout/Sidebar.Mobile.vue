<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <MobileSidebar v-model:isOpen="sidebarOpen">
    <div
      class="bg-mallard flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 ring-1 ring-white/10"
    >
      <div class="flex h-16 shrink-0 items-center">
        <LogoImage
          class="duo-whiteish duo2-dark-orange h-8 w-auto"
          titleRow1="Noodle's"
          titleRow2="House"
        />
      </div>

      <SidebarMainNav :include-user-items="false" />
    </div>
  </MobileSidebar>
</template>

<script setup lang="ts">
import { MobileSidebar } from '@common';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDashboardSidebarStore } from '../stores/dashboardSidebar';
import LogoImage from './LogoImage.vue';
import SidebarMainNav from './Sidebar.MainNav.vue';

const sidebarStore = useDashboardSidebarStore();
const { sidebarOpen } = storeToRefs(sidebarStore);

const router = useRouter();

// Ensure we are closing the sidebar when navigating.
onMounted(() => router.beforeEach(() => sidebarStore.setIsOpen(false)));
</script>
