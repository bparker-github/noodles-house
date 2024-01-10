<template>
  <component
    :is="is ?? 'div'"
    class="flex flex-col flex-1 gap-y-2"
  >
    <!-- The label above the input, if present -->
    <slot name="label">
      <label
        v-if="label"
        :for="id"
        class="inline-flex flex-1"
      >
        <span class="text-sm font-medium leading-6 text-nh-bali-hai-950/75">
          {{ label }}
        </span>
      </label>
    </slot>

    <!-- The white container box here -->
    <div
      :class="[
        'inline-flex flex-row flex-1 items-center',
        'rounded-md shadow-sm px-2 gap-x-2',
        'bg-white border-nh-chalet-green-600 border',
        'focus-within:ring-1 focus-within:ring-inset',
        !errorMsg ? 'focus-within:ring-nh-chalet-green-500' : 'focus-within:ring-nh-bourbon-800',
      ]"
    >
      <!-- The field itself -->
      <slot name="field"></slot>

      <!-- The custom right icon, if present -->
      <slot name="right-icon"></slot>

      <!-- The error icon, if error present -->
      <div
        v-if="errorMsg"
        class="pointer-events-none flex items-center"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-nh-empress-800"
          aria-hidden="true"
        />
      </div>
    </div>
    <p
      v-if="errorMsg"
      class="mt-2 text-sm text-nh-empress-800"
      :id="errorId"
    >
      {{ errorMsg }}
    </p>
  </component>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import { computed, type Component } from 'vue';
import type { NoofShared } from '..';

export interface NoofFieldProps extends NoofShared {
  /** The optional value indicating with which component to render. @default 'div' */
  is?: string | Component;
}

const props = defineProps<NoofFieldProps>();
defineSlots<{ label: []; field: []; 'right-icon': [] }>();

const errorId = computed(() => props.id + '-error');
</script>
