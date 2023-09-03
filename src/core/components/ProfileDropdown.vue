<template>
  <Menu
    as="div"
    class="relative"
  >
    <MenuButton class="-m-1.5 flex items-center p-1.5">
      <span class="sr-only">Open user menu</span>

      <UserProfileIcon class="h-6 w-6" />
      <span class="hidden lg:flex lg:items-center">
        <span
          class="ml-4 text-gray-900 text-sm font-semibold leading-6"
          aria-hidden="true"
        >
          Tom Cook
        </span>
        <ChevronDownIcon
          class="ml-2 text-gray-400 h-5 w-5"
          aria-hidden="true"
        />
      </span>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="mt-2.5 absolute right-0 z-10 w-32 origin-top-right rounded-md bg-chalet-green-100 py-2 shadow-lg ring-1 ring-chalet-green-900/50 focus:outline-none dark:bg-chalet-green-800"
      >
        <MenuItem
          v-for="item in items"
          :key="item.label"
          v-slot="{ active, close }"
        >
          <button
            v-if="!item.to"
            :class="[
              'block cursor-pointer px-3 py-1 text-sm leading-6 text-chalet-green-900',
              { 'bg-chalet-green-700': active },
            ]"
            @click="
              () => {
                item.click?.();
                close();
              }
            "
          >
            {{ item.label }}
          </button>
          <RouterLink
            v-else
            :to="item.to ?? '#'"
            :class="[
              'block cursor-pointer px-3 py-1 text-sm leading-6 text-chalet-green-900',
              { 'bg-chalet-green-700 text-chalet-green-200': active },
            ]"
            @click="close"
          >
            {{ item.label }}
          </RouterLink>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import type { ListItem } from './ItemList';

export interface ProfileDropdownProps {
  items: ListItem[];
}
</script>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';
import UserProfileIcon from './UserProfileIcon.vue';

defineProps<ProfileDropdownProps>();
</script>
