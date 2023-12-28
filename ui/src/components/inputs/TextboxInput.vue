<template>
  <div :class="['noodles-house-textbox-input', 'flex flex-col flex-1 gap-y-2']">
    <!-- The label above the input, if present -->
    <label
      v-if="hasLabel"
      :for="inputId"
      class="nhti-label inline-flex flex-1"
    >
      <slot name="label">
        <span class="text-sm font-medium leading-6 text-nh-gray-blue">
          {{ label }}
        </span>
      </slot>
    </label>

    <!-- The white container box here -->
    <div
      :class="[
        'nhti-white-box',
        'inline-flex flex-row flex-1 items-center',
        'rounded-md shadow-sm px-2 gap-x-2',
        'bg-white border-nh-chalet-green-600 border',
        'focus-within:ring-1 focus-within:ring-inset',
        !errorMsg ? 'focus-within:ring-nh-chalet-green-500' : 'focus-within:ring-nh-bourbon-800',
      ]"
    >
      <!-- The input itself -->
      <input
        v-model="localValue"
        :id="inputId"
        :class="[
          'inline-flex flex-row flex-nowrap flex-1',
          'py-1.5 pl-1 pr-3 rounded-md border-0 bg-trans',
          'sm:text-sm sm:leading-6',
          'focus:ring-0',
          !errorMsg
            ? 'text-nh-chalet-green-950 placeholder:text-nh-chalet-green-950/30'
            : 'text-nh-bourbon-800 placeholder:text-nh-bourbon-800/30',
        ]"
        :aria-describedby="errorMsg ? errorId : undefined"
      />

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
const slots = defineSlots<{ label: []; 'right-icon': [] }>();

const localValue = computed({
  get: () => props.value,
  set: (nv: string) => emits('update:value', nv),
});

const errorId = computed(() => props.inputId + '-error');
const hasLabel = computed(() => props.label || slots.label);
</script>
