<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
      <div class="flex h-16 shrink-0 items-center">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>

      <SidebarMainNav />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMainNav from './Sidebar.MainNav.vue';
</script>
