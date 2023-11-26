<template>
  <Menu
    v-slot="{ open }"
    as="template"
  >
    <header
      :class="[
        'mf-header',
        'fixed top-0 left-0 right-0 gap-x-2 shadow-md bottom-0',
        // { 'bottom-0': open },
      ]"
    >
      <!-- The header row itself, with buttons -->
      <div
        :class="[
          'mf-header-content relative p-2',
          'h-12',
          'flex flex-row w-full items-center justify-between',
          'bg-nh-chalet-green-400 text-nh-chalet-green-50 z-10',
        ]"
      >
        <!-- The home icon or placeholder -->
        <div
          class="mf-header-left-side w-8"
          @click="handleLeftClick"
        >
          <slot name="left-icon">
            <NoodleIconSvg class="text-nh-bourbon w-9 h-9" />
          </slot>
        </div>

        <!-- The title of the page/header -->
        <h1 class="the-title font-medium tracking-wide text-2xl px-4">
          {{ $route.name }}
          {{ open ? ' | Menu' : undefined }}
        </h1>

        <!-- The profile status/spinner -->
        <div class="nh-header-profile w-8 flex justify-end">
          <MenuButton>
            <Bars3Icon class="md:hidden h-6 w-6" />
          </MenuButton>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-50p opacity-0"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="-translate-y-50p opacity-0"
      >
        <MenuItems
          :class="[
            'nh-menu-item-container',
            'absolute origin-top inset-0 top-12',
            'flex flex-1 bg-nh-bali-hai-700/50',
          ]"
        >
          <ul
            :class="[
              'bg-nh-chalet-green',
              'flex flex-col flex-1 h-full gap-y-2 items-stretch',
              'rounded-md p-2 bg-white shadow-lg',
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
                  'border-2 border-nh-chalet-green-500',
                  'motion-safe:transition-colors duration-200 bg-gradient-to-r to-nh-chalet-green-500',
                  'shadow-inner shadow-nh-chalet-green-500',
                  active ? 'from-nh-chalet-green-500' : 'from-nh-chalet-green-700',
                ]"
                @click="() => item.onClick?.(item.value)"
              >
                <span
                  :class="[
                    'transition',
                    'text-nh-chalet-green-100 text-lg',
                    { 'scale-105 font-medium': active },
                  ]"
                  >{{ item.label }}</span
                >
              </li>
            </MenuItem>
          </ul>
        </MenuItems>
      </transition>
    </header>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import type { EnumObject } from '@/lib';

const items: EnumObject[] = [
  { label: 'Testing Page 1', value: '/home', onClick: () => console.log('Home1') },
  { label: 'Testing Page 2', value: '/home-2', onClick: () => console.log('Home2') },
  { label: 'Testing Page 3', value: '/home-3', onClick: () => console.log('Home3') },
  { label: 'Profile', value: '/profile', onClick: () => console.log('Profile') },
];

const emits = defineEmits<{ 'left-icon-click': [] }>();

function handleLeftClick() {
  emits('left-icon-click');
}
</script>
