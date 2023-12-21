<template>
  <div :class="['noodles-house-textbox-input', 'flex flex-col flex-1']">
    <label
      :for="inputId"
      class="inline-flex flex-1"
    >
      <slot name="label">
        <span class="text-sm font-medium leading-6 text-nh-gray-blue">
          {{ label }}
        </span>
      </slot>
    </label>

    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        v-model="localValue"
        :id="inputId"
        :class="[
          'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6',
        ]"
        :aria-describedby="errorMsg ? errorId : undefined"
      />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import { type InputHTMLAttributes, computed } from 'vue';

interface TextboxInputProps {
  value: string;
  inputId: string;
  label?: string;
  errorMsg?: string;

  inputProps?: InputHTMLAttributes;
}

const props = defineProps<TextboxInputProps>();
const emits = defineEmits<{ 'update:value': [string] }>();
defineSlots<{ label: [] }>();

const localValue = computed({
  get: () => props.value,
  set: (nv: string) => emits('update:value', nv),
});

const errorId = computed(() => props.inputId + '-error');
</script>
