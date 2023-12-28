<template>
  <div class="overflow-hidden bg-nh-whiteish shadow-md sm:rounded-lg">
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
          v-for="(eo, i) in modelLabels"
          :key="i"
        >
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-nh-bali-hai-900">
              {{ eo.label }}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-nh-bali-hai-700 sm:col-span-2 sm:mt-0">
              {{ getModelVal(eo.value) }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="submit-button flex flex-col flex-1 px-2 py-3">
      <NhButton
        class="self-start"
        text="Save"
        @click="clickSave"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends {}">
import type { EnumObject } from '@/lib';
import NhButton from '../basic/NhButton.vue';
import { ref } from 'vue';

export interface EditableInfoListProps<Model> {
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
   * The list of items to enumerate for the list.
   *  Keyed by the label of each field to edit, with values representing the exact key within the model.
   */
  modelLabels: EnumObject<keyof Model>[];

  /**
   * A function to use to handle the updating of individual pieces of the model.
   * @param key They key change the value of within the model.
   * @param newVal The new actual value to inject into the model in the given k
   */
  updateModelVal: <K extends keyof Model>(key: K, newVal: Model[K]) => Model | undefined;
}
const props = defineProps<EditableInfoListProps<T>>();
const emits = defineEmits<{ 'on-save': [] }>();

// Refs
const isDisabled = ref(false);

// Functions
function getModelVal(key: keyof T) {
  return key in props.data ? props.data[key] : 'Missing';
}
function clickSave() {
  // Cannot save when disabled
  if (isDisabled.value) {
    console.warn('Cannot save info at this time.');
    return;
  }

  // Emit like normal
  emits('on-save');
}
</script>
