<template>
  <div :class="['noodles-house-textarea-input', 'flex flex-col flex-1 gap-y-1']">
    <!-- The label above the input, if present -->
    <label
      v-if="hasLabel"
      :for="inputId"
      class="nhtai-label inline-flex flex-1"
    >
      <slot name="label">
        <span class="text-sm font-medium leading-6 text-nh-bali-hai-950/75">
          {{ label }}
        </span>
      </slot>
    </label>

    <!-- The white container box here -->
    <div
      :class="[
        'nhtai-white-box',
        'inline-flex flex-row flex-1 items-center',
        'rounded-md shadow-sm p-1 gap-x-2',
        'bg-white border-nh-chalet-green-600 border',
        'focus-within:ring-1 focus-within:ring-inset',
        !errorMsg ? 'focus-within:ring-nh-chalet-green-500' : 'focus-within:ring-nh-bourbon-800',
      ]"
    >
      <!-- The input itself -->
      <textarea
        v-model="localValue"
        v-bind="textareaProps"
        ref="inputEle"
        :id="inputId"
        :class="[
          'inline-flex flex-row flex-nowrap flex-1',
          'py-1.5 pl-1 pr-3 rounded-md border-0 bg-trans',
          'sm:text-sm sm:leading-6 placeholder:text-sm',
          'focus:ring-0',
          !errorMsg
            ? 'text-nh-chalet-green-950 placeholder:text-nh-chalet-green-950/50'
            : 'text-nh-bourbon-800 placeholder:text-nh-bourbon-800/50',
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
import { computed, ref, type TextareaHTMLAttributes } from 'vue';

interface TextboxInputProps {
  /** The model value to pass to the input. */
  value: string;
  /** The id to associate with this input. Used for DOM referencing. */
  inputId: string;
  /** The optional label to add above this input. Entire line is omitted of not present. */
  label?: string;
  /** An optional string indicating the presence of an error, described by the message. */
  errorMsg?: string;
  /** An optional set of additional attributes to pass directly to the input element. */
  textareaProps?: TextareaHTMLAttributes;
}

const props = defineProps<TextboxInputProps>();
const emits = defineEmits<{ 'update:value': [string] }>();
const slots = defineSlots<{ label: []; 'right-icon': [] }>();

const inputEle = ref<HTMLInputElement | null>(null);

const localValue = computed({
  get: () => props.value,
  set: (nv: string) => emits('update:value', nv),
});

const errorId = computed(() => props.inputId + '-error');
const hasLabel = computed(() => props.label || slots.label);

function focusInput() {
  inputEle.value?.focus();
}
defineExpose({ focusInput, inputEle });
</script>
