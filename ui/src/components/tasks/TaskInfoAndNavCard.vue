<template>
  <div
    :class="[
      'task-info-and-navigation',
      'flex flex-col w-full',
      'bg-nh-white rounded-md shadow-lg p-3',
    ]"
  >
    <div
      :class="[
        'heading-section flex flex-col gap-y-2 text-nh-bourbon-900',
        'prose-sm prose-p:my-0.5 prose-p:leading-5',
        'prose-h1:mb-1 prose-h1:text-2xl prose-h1:font-semibold',
        // Collapsible things now
        'motion-safe:transform transition-[max-height] duration-200 ease-linear',
        isTaskInfoOpen ? 'max-h-96 overflow-y-auto' : 'max-h-10 overflow-y-hidden',
      ]"
    >
      <h1>Ideas List</h1>
      <p>Here we can collect "todos" or "tasks", ideas and feedback from all sources.</p>
      <p>
        Feel free to add anything and everything that will be helpful to consult at some point. We
        can add feedback, comments, progress, status, and anything else you can think of for these
        features!
      </p>
      <p>Even improvements about this List feature itself is heartily welcome!</p>
    </div>

    <div
      :class="[
        'flex justify-center items-center py-1.5 -mx-2 mb-3 cursor-pointer',
        'border-y border-nh-bourbon-300 shadow-nh-bourbon-100',
        'hover:bg-nh-bourbon-200 shadow-nh-bourbon-200/75',
        !isTaskInfoOpen ? 'shadow-t-blur' : 'shadow-md',
      ]"
      @click="() => setTaskInfoOpen()"
    >
      <ChevronDoubleDownIcon
        :class="[
          'text-nh-bourbon-900/75 h-4 w-4',
          'motion-safe:transition-transform duration-200 ease-linear',
          { 'rotate-180': isTaskInfoOpen },
        ]"
      />
    </div>

    <TasksNavigation />
  </div>
</template>

<script setup lang="ts">
import { useUiSettings } from '@/stores/uiSettingsStore';
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import TasksNavigation from './TasksNavigation.vue';

const uiSettingsStore = useUiSettings();
const { isTaskInfoOpen } = storeToRefs(uiSettingsStore);
const { setTaskInfoOpen } = uiSettingsStore;
</script>
