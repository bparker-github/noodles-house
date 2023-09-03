<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-mallard px-6">
      <div class="flex shrink-0 items-center pt-2">
        <LogoImage
          title-row1="Noodle's"
          title-row2="House"
        />
      </div>

      <SidebarMainNav :include-user-items="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoImage from './LogoImage.vue';
import SidebarMainNav from './Sidebar.MainNav.vue';
</script>
