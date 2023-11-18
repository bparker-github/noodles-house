<template>
  <div class="space-y-1 px-2 pb-3 pt-2">
    <span
      v-if="title"
      class="text-whiteish text-xs font-semibold leading-6"
    >
      {{ title }}
    </span>

    <ul
      role="list"
      class="space-y-1"
    >
      <li
        v-for="item in items"
        :key="item.label"
      >
        <DisclosureButton
          :as="RouterLink"
          :to="item.to"
          :class="[
            // item.current
            //   ? 'bg-indigo-700 text-white'
            //   : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
            // 'block rounded-md py-2 px-3 text-base font-medium',

            'text-whiteish group flex gap-x-3 rounded-md py-2 px-3 text-base font-medium',
            !item.current
              ? 'hover:bg-mallard-700 hover:text-white'
              : 'bg-mallard-800 hover:bg-mallard-600',
          ]"
          :aria-current="item.current ? 'page' : undefined"
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
        </DisclosureButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { DisclosureButton } from '@headlessui/vue';
import type { ListItem } from '../../components/ItemList';
import { RouterLink } from 'vue-router';

interface MainListProps {
  /** The optional title to display above the items. */
  title?: string;
  /** The items themselves to display. */
  items: ListItem[];
}

defineProps<MainListProps>();
</script>
