<template>
  <NoofField
    v-model="localValue"
    class="noodles-house-select-field"
    :id="id"
    :error-msg="errorMsg"
    :label="label"
    :is="Listbox"
    as="div"
  >
    <template #label>
      <ListboxLabel class="inline-flex flex-1">
        <span class="text-sm font-medium leading-6 text-nh-bali-hai-950/75">{{ label }}</span>
      </ListboxLabel>
    </template>

    <template #field>
      <ListboxButton
        :class="[
          'relative w-full cursor-default rounded-md shadow-sm',
          'bg-white py-1.5 pl-3 pr-10 text-left text-gray-900',
          'ring-1 ring-inset ring-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-indigo-600',
          'sm:text-sm sm:leading-6',
        ]"
      >
        <span class="flex items-center">
          <slot name="left-icon"></slot>
          <span class="ml-3 block truncate">{{ localOption?.label ?? 'None' }}</span>
        </span>

        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="(opt, i) in options.filter((o) => !!o.value)"
            v-slot="{ active, selected }"
            as="template"
            :key="opt.value + '-' + i"
            :value="opt.value!"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-center">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ opt.label }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </template>

    <template #right-icon><slot name="right-icon"></slot></template>
  </NoofField>
</template>

<script setup lang="ts" generic="T">
import type { EnumObject } from '@/lib';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref } from 'vue';
import type { NoofSelectProps } from '..';
import NoofField from './NoofField.vue';

export interface LocalNoofSelectProps<P> extends NoofSelectProps {
  /** The model value of this select. */
  value: P | undefined;
  /** The list of visual options for this dropdown. */
  options: EnumObject<P>[];
}

const props = defineProps<LocalNoofSelectProps<T>>();
const { label, errorMsg, id, value, options, ...selectProps } = props;

const emits = defineEmits<{ 'update:value': [T | undefined] }>();
defineSlots<{ 'left-icon': []; 'right-icon': [] }>();

const listboxEle = ref<InstanceType<typeof Listbox> | null>(null);
const errorId = computed(() => id + '-error');

const localValue = computed({
  get: () => value,
  set: (nv) => emits('update:value', nv),
});
const localOption = computed(() => props.options.find((opt) => opt.value === props.value));

function focusListbox() {
  listboxEle.value?.$el?.focus?.();
}
defineExpose({ focusListbox, listboxEle });
</script>
