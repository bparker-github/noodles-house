<template>
  <slot>
    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-900">
        <slot name="label">
          {{ label }}
        </slot>
      </dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <slot name="value">
          {{ value }}
        </slot>
      </dd>
    </div>
  </slot>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{ label?: string; value?: string }>();
const slots = defineSlots<{ default: unknown; label: unknown; value: unknown }>();

onMounted(() => {
  if (!props.label && !slots.label) {
    console.error('Missing label for InfoListItem:', props.value);
  }
  if (!props.value && !slots.value) {
    console.error('Missing value for InfoListItem:', props.value);
  }
});
</script>
