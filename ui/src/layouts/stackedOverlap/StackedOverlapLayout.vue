<template>
  <div class="min-h-full flex flex-col h-full w-full min-w-full overflow-hidden bg-gray-200">
    <!-- NavHeader + Background section -->
    <div class="header-and-background flex flex-row">
      <!-- NavHeader row + panel content within -->
      <SO_HeaderRow>
        <SO_MobileNavList :items="primaryItemList" />

        <div class="border-t border-nh-mallard-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="user.imageUrl"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">{{ user.name }}</div>
              <div class="text-sm font-medium text-nh-mallard-300">{{ user.email }}</div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-nh-mallard-600 p-1 text-nh-mallard-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-nh-mallard-600"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-nh-mallard-500 hover:bg-opacity-75"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </SO_HeaderRow>
    </div>

    <!-- Page header -->
    <header class="py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>
    </header>

    <!-- Page content -->
    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <slot><RouterView /></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import SO_HeaderRow from './SO_HeaderRow.vue';
import MainList from '@/components/ItemList/MainList.vue';
import { MainItemList } from '@/components/ItemList';
import { useDashboardStore } from '@/stores/dashboardStore';
import SO_MobileNavList from './SO_MobileNavList.vue';

// These are constants, we do not need to `ref` them.
const { primaryItemList, secondaryItemList, secondaryListTitle, userItemList } =
  useDashboardStore();

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
</script>
