<template>
  <header
    as="header"
    :class="[
      'mf-header',
      'flex flex-row flex-1 w-full items-center justify-between',
      'p-2 h-12 gap-x-2 shadow-md',
      'bg-nh-chalet-green-400 text-nh-chalet-green-50',
      'bg-gradient-to-b from-nh-chalet-green-600/50 to-nh-chalet-green-600',
    ]"
  >
    <!-- The home icon or placeholder -->
    <div
      :class="['mf-header-left-side w-9', { 'cursor-pointer': !!onLeftIconClick }]"
      @click="handleLeftClick"
    >
      <slot name="left-side">
        <NoodleIconSvg
          title="Noodle's House"
          class="text-nh-bourbon w-9 h-9"
          aria-label="Noodle's House Logo. Click to navigate Home."
        />
      </slot>
    </div>

    <!-- The title of the page/header -->
    <h1 class="mf-header-middle font-medium tracking-wide text-2xl px-4 drop-shadow-lg">
      {{ $route.name }}
      {{ isOpen ? ' | Menu' : undefined }}
    </h1>

    <!-- The profile status/spinner -->
    <div class="nh-header-right-side w-9 flex justify-end">
      <slot name="right-side">
        <Bars3Icon
          class="md:hidden h-7 w-7"
          @click="console.log('This does nothing')"
        />
      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import { useVModel } from '@vueuse/core';

export interface MF_HeaderProps {
  /** A value indicating whether the menu is currently open. */
  open: boolean;

  /** Shadow-prop to check for a 'left-icon-click' listener. */
  onLeftIconClick?: Function;
}
const props = defineProps<MF_HeaderProps>();
const emits = defineEmits<{
  close: [];
  'left-icon-click': [];
}>();

// Expose the left and right icon slots.
defineSlots<{ 'left-side': []; 'right-side': [] }>();

const isOpen = useVModel(props, 'open', emits);

function handleLeftClick() {
  emits('left-icon-click');
}
</script>
