<template>
  <component
    :is="!item.to ? 'button' : RouterLink"
    :to="item.to"
    @click="item.click"
    :class="[
      'text-nh-whiteish group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
      'hover:bg-nh-chalet-green-700 hover:text-white',
    ]"
  >
    <component
      v-if="item.leftIcon"
      :is="item.leftIcon"
      class="text-nh-bali-hai-200 h-6 w-6"
    />
    <span
      v-else
      :class="[
        'border-nh-bali-hai-300 bg-nh-bali-hai-100/20 text-nh-bali-hai-200 h-6 w-6 border-2',
        'group-hover:text-nh-bali-hai-100/50 group-hover:text-nh-bali-hai-50 flex shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium',
      ]"
    >
      {{ item.leftInitial }}
    </span>

    <span class="truncate">{{ item.label }}</span>
  </component>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { ListItem } from '.';

interface SingleItemProps {
  item: ListItem;
}

defineProps<SingleItemProps>();
</script>
