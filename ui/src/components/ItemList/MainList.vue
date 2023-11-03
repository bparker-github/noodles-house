<template>
  <div
    v-if="title"
    class="text-whiteish text-xs font-semibold leading-6"
  >
    {{ title }}
  </div>
  <ul
    role="list"
    class="-mx-2 space-y-1"
  >
    <li
      v-for="item in items"
      :key="item.label"
    >
      <component
        :is="!item.click ? RouterLink : 'button'"
        :to="item.to"
        @click="item.click"
        :class="[
          'text-whiteish group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
          { 'bg-mallard-800 hover:bg-mallard-600': item.current },
          { 'hover:bg-mallard-700 hover:text-white': !item.current },
        ]"
      >
        <component
          v-if="item.leftIcon"
          :is="item.leftIcon"
          class="text-bali-hai-200 h-6 w-6"
        />
        <span
          v-else
          :class="[
            'border-bali-hai-300 bg-bali-hai-100/20 text-bali-hai-200 h-6 w-6 border-2',
            'group-hover:text-bali-hai-100/50 group-hover:text-bali-hai-50 flex shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium',
          ]"
        >
          {{ item.leftInitial }}
        </span>

        <span class="truncate">{{ item.label }}</span>
      </component>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { ListItem } from '.';

interface MainListProps {
  /** The optional title to display above the items. */
  title?: string;
  /** The items themselves to display. */
  items: ListItem[];
}

defineProps<MainListProps>();
</script>
