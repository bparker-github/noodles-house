<template>
  <NoofField
    v-model="localValue"
    class="noodles-house-select-field relative"
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
          'inline-flex flex-row flex-nowrap items-center flex-1',
          'py-1.5 pl-1 rounded-md border-0 bg-trans',
          'text-sm leading-6 placeholder:text-sm',
          'focus-visible:ring-0 focus-visible:outline-none',
          !errorMsg
            ? 'text-nh-chalet-green-950 placeholder:text-nh-chalet-green-950/50'
            : 'text-nh-bourbon-800 placeholder:text-nh-bourbon-800/50',
        ]"
      >
        <span class="flex items-center flex-1">
          <slot name="left-icon"></slot>
          <span class="block truncate">{{ localOption?.label ?? 'None' }}</span>
        </span>

        <span class="pointer-events-none inline-flex items-center pl-2">
          <ChevronUpDownIcon
            class="h-5 w-5 text-nh-bourbon-900/75"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <FadeInAppear class="duration-150">
        <ListboxOptions
          :class="[
            'absolute z-10 right-0 top-0',
            'max-h-60 min-w-[16rem] max-w-full',
            'overflow-auto rounded-md shadow-lg bg-white',
            'md:text-base text-sm mt-1 py-1',
            'ring-1 ring-black ring-opacity-5 focus:outline-none',
          ]"
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
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active
                  ? 'bg-nh-bourbon-100 text-nh-bourbon-800'
                  : 'text-nh-bourbon-950 hover:text-nh-bourbon-800',
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
                  active ? 'text-nh-bourbon-600' : 'text-nh-bourbon-800',
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
      </FadeInAppear>
    </template>

    <template #right-icon><slot name="right-icon"></slot></template>
  </NoofField>
</template>

<script setup lang="ts" generic="T">
import FadeInAppear from '@/components/transitions/FadeInAppear.vue';
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

const emits = defineEmits<{ 'update:value': [T | undefined] }>();
defineSlots<{ 'left-icon': []; 'right-icon': [] }>();

const listboxEle = ref<InstanceType<typeof Listbox> | null>(null);

const localValue = computed({
  get: () => props.value,
  set: (nv) => emits('update:value', nv),
});
const localOption = computed(() => props.options.find((opt) => opt.value === props.value));

function focusListbox() {
  listboxEle.value?.$el?.focus?.();
}
defineExpose({ focusListbox, listboxEle });
</script>
