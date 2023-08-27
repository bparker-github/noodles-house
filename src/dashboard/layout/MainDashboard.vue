<template>
  <div class="h-full overflow-x-hidden overflow-y-scroll">
    <SidebarMobile />

    <SidebarDesktop />

    <MainDashboardHeader />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot>
          <RouterView />
        </slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainDashboardHeader from './MainDashboardHeader.vue';
import SidebarDesktop from './Sidebar.Desktop.vue';
import SidebarMobile from './Sidebar.Mobile.vue';
</script>
