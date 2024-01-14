<template>
  <NoofField
    class="noodles-house-textarea-input"
    :id="id"
    :error-msg="errorMsg"
    :label="label"
  >
    <template #label><slot name="label"></slot></template>

    <template #field>
      <textarea
        v-model="localValue"
        v-bind="eleProps"
        ref="inputEle"
        :id="id"
        :class="[
          'inline-flex flex-row flex-nowrap flex-1',
          'py-1.5 pl-1 pr-3 rounded-md border-0 bg-trans',
          'text-sm leading-6 placeholder:text-sm',
          'focus:ring-0',
          !errorMsg
            ? 'text-nh-chalet-green-950 placeholder:text-nh-chalet-green-950/50'
            : 'text-nh-bourbon-800 placeholder:text-nh-bourbon-800/50',
        ]"
        :aria-describedby="errorMsg ? errorId : undefined"
      />
    </template>

    <template #right-icon><slot name="right-icon"></slot></template>
  </NoofField>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { NoofTextareaProps } from '../index.d';
import NoofField from './NoofField.vue';

export interface TextboxProps extends NoofTextareaProps {
  /** The model value to pass to the input. */
  value: string;
}
const props = defineProps<TextboxProps>();
const emits = defineEmits<{ 'update:value': [string] }>();
defineSlots<{ label: []; 'right-icon': [] }>();

const errorId = computed(() => props.id + '-error');
const inputEle = ref<HTMLTextAreaElement | null>(null);

const localValue = computed({
  get: () => props.value,
  set: (nv: string) => emits('update:value', nv),
});

function focusInput() {
  inputEle.value?.focus();
}
defineExpose({ focusInput, inputEle });
</script>
