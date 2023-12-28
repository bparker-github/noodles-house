<template>
  <form
    class="overflow-hidden bg-nh-whiteish shadow-md sm:rounded-lg"
    @submit.prevent="clickSave"
  >
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base font-semibold leading-7 text-nh-bali-hai-950">{{ title }}</h3>
      <p
        v-if="subTitle"
        class="mt-1 max-w-2xl text-sm leading-6 text-nh-bali-hai-700"
      >
        {{ subTitle }}
      </p>
    </div>
    <div class="border-t border-nh-bali-hai-200">
      <dl class="divide-y divide-nh-bali-hai-200">
        <template
          v-for="(config, key, i) in fieldConfigs"
          :key="i"
        >
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-nh-bali-hai-900">
              {{ config }}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-nh-bali-hai-700 sm:col-span-2 sm:mt-0">
              <!-- Display for non-editing -->
              <div
                v-if="!editingList.has(i)"
                :class="['flex flex-row w-full group justify-between cursor-pointer']"
                @click.prevent="editingList.add(i)"
              >
                <span>{{ getModelLabel(config.value) }}</span>

                <PencilIcon
                  :class="[
                    'h-5 w-5',
                    'motion-safe:transition-opacity motion-safe:opacity-50 duration-300 group-hover:opacity-100',
                  ]"
                />
              </div>

              <!-- Editing visual -->
              <TextboxInput
                v-else
                :value="getValueForModel(eo.value)"
                @update:value="(nv) => updateModelPart(eo.value, nv)"
                :name="eo.value"
                :placeholder="getValueForModel(eo.value)"
                :input-id="eo.label"
              />

              <!-- Copy-button -->
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="submit-button flex flex-col flex-1 px-2 py-3">
      <NhButton
        class="self-start"
        text="Save"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts" generic="T extends {}">
import type { EnumObject } from '@/lib';
import { PencilIcon } from '@heroicons/vue/24/solid';
import type { MaybeRef } from 'vue';
import { ref } from 'vue';
import NhButton from '../basic/NhButton.vue';
import TextboxInput from '../inputs/TextboxInput.vue';
import { toValue } from 'vue';

export interface ModelFieldConfig {
  label: MaybeRef<string>;
  value?: MaybeRef<string>;
  errorMsg?: MaybeRef<string | undefined>;
  disabled?: MaybeRef<boolean>;
}
export type ModelFieldConfigMap<Model extends {}> = {
  [Key in keyof Model]?: ModelFieldConfig;
};

export interface EditableInfoListProps<Model extends {}> {
  /** The main title of this Editable Info List */
  title: string;
  /** The optional sub-title to supplement the main title with, if present. */
  subTitle?: string;
  /**
   * A value indicating whether the editing functionality is only summoned via the edit button.
   * If false or omitted, the entire row is clickable to toggle editing, assuming the input is enabled.
   */
  clickIconToEdit?: boolean;

  /** The model holding the data to display and edit. */
  data: Model;

  /**
   * The configuration for all models that are intended to be shown.
   */
  fieldConfigs: ModelFieldConfigMap<Model>;
}

const props = defineProps<EditableInfoListProps<T>>();
const emits = defineEmits<{
  submit: [T];
  'update:data': [T];
}>();

// Refs
const isDisabled = ref(false);
const editingList = ref<Set<number>>(new Set<number>());

// Functions
function getModelLabel(value: MaybeRef<string>) {
  return toValue(value) ?? 'Missing';
}

function getValueForModel<K extends keyof T>(key: K): string {
  const ret = props.data[key];
  return typeof ret !== 'string' || !`${ret}` ? '' : ret;
}
function updateModelPart<K extends keyof T>(key: K, nv: string) {
  emits('update:data', { ...props.data, [key]: nv as T[K] });
}

function clickSave() {
  // Cannot save when disabled
  if (isDisabled.value) {
    console.warn('Cannot save info at this time.');
    return;
  }

  // "close" all editing lines
  editingList.value.clear();

  // Emit like normal
  emits('submit', props.data);
}
</script>
