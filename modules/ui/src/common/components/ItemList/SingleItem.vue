<template>
  <component
    :is="!item.click ? RouterLink : 'button'"
    :to="item.to"
    @click="item.click"
    :class="[
      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-whiteish',
      { 'bg-mallard-800 hover:bg-mallard-600': item.current },
      { 'hover:bg-mallard-700 hover:text-white': !item.current },
    ]"
  >
    <component
      v-if="item.leftIcon"
      :is="item.leftIcon"
      class="h-6 w-6 text-bali-hai-200"
    />
    <span
      v-else
      :class="[
        'h-6 w-6 border-2 border-bali-hai-300 bg-bali-hai-100/20 text-bali-hai-200',
        'flex shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium group-hover:text-bali-hai-100/50 group-hover:text-bali-hai-50',
      ]"
    >
      {{ item.leftInitial }}
    </span>

    <span class="truncate">{{ item.label }}</span>
  </component>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { ListItem } from './index.d';

interface SingleItemProps {
  item: ListItem;
}

defineProps<SingleItemProps>();
</script>
