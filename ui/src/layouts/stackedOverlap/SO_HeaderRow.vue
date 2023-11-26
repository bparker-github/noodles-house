<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    :class="[
      'stacked-overlap-header-row fixed flex flex-col w-full',
      'bg-nh-mallard-800 border-b text-whiteish',
      'px-4 py-2',
    ]"
  >
    <div
      :class="[
        'header-row-content flex flex-row w-full items-center justify-stretch',
        'border-b-2',
        !open ? 'border-transparent' : 'border-nh-mallard-400 mb-2 pb-2',
      ]"
    >
      <!-- Left side -->
      <div class="left-side flex">
        <NoodleIconSvg class="duo-nh-bourbon-200/75 duo2-nh-bourbon-400 w-12 h-12 -my-1 mr-2" />
      </div>

      <!-- Main, center, growing -->
      <div class="main-center flex flex-1">
        <span class="text-2xl font-semibold tracking-wide text-gray-200">
          {{ $route.name ?? 'No Route Name' }}
        </span>
      </div>

      <!-- Right side -->
      <div class="right-side flex">
        <DisclosureButton
          class="w-8 h-8"
          aria-label="Open Navigation Menu"
        >
          <span class="sr-only">Open Navigation Menu</span>
          <Bars3Icon v-if="!open" />
          <XMarkIcon v-else />
        </DisclosureButton>
      </div>
    </div>

    <transition
      enter-active-class="motion-safe:transition ease-out duration-500"
      enter-from-class="opacity-0 translate-y-8"
      leave-active-class="motion-safe:transition ease-in duration-500"
      leave-to-class="opacity-0 -translate-y-8"
    >
      <DisclosurePanel>
        <slot></slot>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
</script>
