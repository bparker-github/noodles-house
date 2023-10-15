<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base font-semibold leading-7 text-gray-900">{{ title }}</h3>
      <p
        v-if="subTitle"
        class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"
      >
        {{ subTitle }}
      </p>
    </div>
    <div class="border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <slot>
          <InfoListItem
            v-for="eo in list"
            v-bind="eo"
            :key="eo.value"
          />
        </slot>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EnumObject } from '@noodles-house/common';
import InfoListItem from './InfoListItem.vue';
import { onMounted } from 'vue';

export interface InfoListCardProps {
  title: string;
  subTitle?: string;
  list?: EnumObject[];
}
const props = defineProps<InfoListCardProps>();
const slots = defineSlots<{ default: unknown }>();

onMounted(() => {
  if (!props.list?.length && !slots.default) {
    console.log(
      'InfoListCard requires either a list of items, or a list of child InfoListItem elements.'
    );
  }
});
</script>
