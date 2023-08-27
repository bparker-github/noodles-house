<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-mallard px-6">
      <div class="flex h-16 shrink-0 items-center">
        <LogoImage class="h-8 w-auto" />
      </div>

      <SidebarMainNav>
        <template #third-item>
          <!-- <ProfileAccordion /> -->

          <ItemList
            :items="userNavigation"
            title="You"
          />
        </template>
      </SidebarMainNav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserProfileIcon } from '@/core';
import ItemList from './ItemList.vue';
import SidebarMainNav from './Sidebar.MainNav.vue';
import LogoImage from './LogoImage.vue';

const userNavigation = [
  {
    label: 'Your profile',
    leftIcon: UserProfileIcon,
    to: '/profile',
  },
  { label: 'Sign out', to: '/logout' },
];
</script>
