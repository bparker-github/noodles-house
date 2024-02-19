<template>
  <form
    v-if="data"
    class="overflow-hidden bg-nh-white border-nh-whiteish border rounded-md shadow-md sm:rounded-lg"
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
      <dl class="divide-y divide-nh-bali-hai-200 shadow-sm">
        <template
          v-for="(config, i) in fieldConfigs"
          :key="i"
        >
          <div class="px-4 pt-4 pb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-nh-bali-hai-900">
              {{ toValue(config.label) }}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-nh-bali-hai-700 sm:col-span-2 sm:mt-0">
              <!-- Display for non-editing -->
              <div
                v-if="!editingList.has(i)"
                :class="['flex flex-row w-full group justify-between cursor-pointer']"
                @click.prevent="toggleEditable(config, i)"
              >
                <span>{{ getValueForModel(config.key).value ?? 'Missing' }}</span>

                <PencilIcon
                  :class="[
                    'h-5 w-5',
                    'motion-safe:transition-opacity motion-safe:opacity-50 duration-300 group-hover:opacity-100',
                  ]"
                />
              </div>

              <!-- Editing visual -->
              <NoofInput
                v-else
                :ref="(el) => assignRef(config, el)"
                :value="getValueForModel(config.key).value"
                @update:value="(nv) => updateModelPart(config.key, nv)"
                :ele-props="{
                  name: String(config.key),
                  placeholder: toValue(config.placeholder),
                }"
                :id="String(config.key)"
              />

              <!-- Copy-button -->
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div :class="['submit-button flex flex-col flex-1', 'px-2 py-3']">
      <NhButton
        :class="['flex-1 self-end w-32', '[&>span]:w-full']"
        text="Save"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts" generic="T extends {}">
import { PencilIcon } from '@heroicons/vue/24/solid';
import type { ComponentPublicInstance, ComputedRef, MaybeRef } from 'vue';
import { computed, ref, toValue } from 'vue';
import NhButton from '../basic/NhButton.vue';
import NoofInput from '../../Noof/inputs/NoofInput.vue';

export interface ModelFieldConfig<Model extends {}> {
  key: keyof Model;
  label: MaybeRef<string>;
  placeholder?: MaybeRef<string>;
  errorMsg?: MaybeRef<string | undefined>;
  disabled?: MaybeRef<boolean>;
}

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
  fieldConfigs: ModelFieldConfig<Model>[];
}

const props = defineProps<EditableInfoListProps<T>>();
const emits = defineEmits<{
  submit: [T];
  'update:data': [T];
}>();

// Refs
const isDisabled = ref(false);
const editingList = ref<Set<number>>(new Set<number>());

// Element Refs
type NoofInputInstance = InstanceType<typeof NoofInput>;
const inputRefs = ref<Record<string, NoofInputInstance | null>>({});
function assignRef(config: ModelFieldConfig<T>, el: Element | ComponentPublicInstance | null) {
  const refName = getRefName(config.key);
  inputRefs.value[refName] = el as NoofInputInstance;
}

// Functions
function getValueForModel<K extends keyof T>(key: K): ComputedRef<string> {
  return computed(() => {
    const ret = props.data[key];
    return typeof ret !== 'string' || !`${ret}` ? '' : ret;
  });
}
function updateModelPart<K extends keyof T>(key: K, nv: string) {
  emits('update:data', { ...props.data, [key]: nv as T[K] });
}
function getRefName<K extends keyof T>(key: K): string {
  return 'inputRef' + String(key);
}

function toggleEditable(config: ModelFieldConfig<T>, i: number) {
  editingList.value.add(i);

  // Jump to the end of the callstack so the input can render and properly mount.
  setTimeout(() => {
    const refName = getRefName(config.key);
    const foundRef = inputRefs.value[refName];
    foundRef?.focusInput();
  }, 0);
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
