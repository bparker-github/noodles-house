<template>
  <MenuItems
    :class="[
      'nh-menu-item-container',
      'absolute origin-top inset-0 top-12',
      'flex flex-1 bg-nh-bali-hai-700/50',
    ]"
  >
    <ul
      :class="[
        'flex flex-col flex-1 h-full gap-y-2 items-stretch',
        'p-2 bg-nh-chalet-green/50 shadow-lg',
        'ring-1 ring-nh-empress-950 ring-opacity-5 focus:outline-none',
      ]"
    >
      <MenuItem
        v-for="(item, i) in items"
        v-slot="{ active }"
        as="template"
        :key="item.value + '-' + i"
      >
        <li
          :class="[
            'flex flex-1 items-center justify-center',
            'cursor-pointer rounded-md px-4 py-2 ',
            'border-2 border-nh-chalet-green-300',
            'motion-safe:transition-colors duration-200 bg-gradient-to-r to-nh-chalet-green-500',
            'shadow-inner shadow-nh-chalet-green-500',
            active ? 'from-nh-chalet-green-500' : 'from-nh-chalet-green-700',
          ]"
          @click="() => item.onClick?.(item.value)"
        >
          <span
            :class="[
              'motion-safe:transition',
              'text-nh-chalet-green-100 text-lg',
              { 'scale-105 font-medium': active },
            ]"
            >{{ item.label }}</span
          >
        </li>
      </MenuItem>
    </ul>
  </MenuItems>
</template>

<script setup lang="ts">
import type { EnumObject } from '@/lib';
import { MenuItem, MenuItems } from '@headlessui/vue';

const items: EnumObject[] = [
  { label: 'Testing Page 1', value: '/home', onClick: () => console.log('Home1') },
  { label: 'Testing Page 2', value: '/home-2', onClick: () => console.log('Home2') },
  { label: 'Testing Page 3', value: '/home-3', onClick: () => console.log('Home3') },
  { label: 'Profile', value: '/profile', onClick: () => console.log('Profile') },
];
</script>
