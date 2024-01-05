<template>
  <div
    :class="[
      'task-list-card relative',
      'flex flex-col w-full gap-y-4',
      'bg-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <!-- Display loading spinner if fetch hasn't completed -->
    <BackgroundSpinner
      v-if="isFetching"
      class="-mx-3 -my-5 rounded-md"
      title="Fetching Tasks"
      details="Fetching all todo tasks..."
    />

    <h2
      :class="[
        'text-xl py-2 self-start text-nh-bourbon-900 px-1',
        'border-b min-w-[50%] border-nh-bourbon-700',
      ]"
    >
      All Tasks
    </h2>

    <ul :class="['task-list', 'flex flex-col w-full']">
      <!-- The empty state entry -->
      <li
        v-if="!allTasks.length"
        :class="[
          'flex flex-col flex-1 items-center m-5 p-5',
          'rounded-lg border-2 border-dashed border-nh-bourbon-800',
        ]"
      >
        <QuestionMarkCircleIcon class="w-8 h-8 nh-bourbon-900" />
        <h3 class="text-base text-nh-bourbon-950">No Tasks</h3>
      </li>

      <!-- Otherwise show the list and button -->
      <template v-else>
        <li
          v-for="(task, i) in allTasks"
          :key="`task-${task.id}-${i}`"
          :class="['todo-item', 'py-2 px-4 text-nh-bourbon-950 border-y border-nh-bourbon-950/50']"
        >
          <h1 class="task-title text-lg leading-6">{{ task.title }}</h1>
          <h3 :class="['task-subtitle text-base leading-5', { 'text-opacity-50': !task.subTitle }]">
            {{ task.subTitle ?? '-' }}
          </h3>
          <p
            :class="[
              'task-description text-sm leading-4',
              { 'text-opacity-50': !task.description },
            ]"
          >
            {{ task.description ?? '-' }}
          </p>
        </li>

        <NhButton
          class="self-end px-8 py-2 mt-3"
          :is-loading="isFetching"
          text="Refresh"
          @click="$emit('refresh')"
        />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TodoTask } from '@db/models/TodoTask.d';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';
import NhButton from '../basic/NhButton.vue';
import BackgroundSpinner from '../spinners/BackgroundSpinner.vue';

export interface TaskListCardProps {
  allTasks: TodoTask[];
  isFetching?: boolean;
}
defineProps<TaskListCardProps>();
defineEmits<{ refresh: [] }>();
</script>

<style lang="css">
li.todo-item {
  @apply flex flex-1 flex-col items-start gap-y-1;

  background-image: linear-gradient(
    to right,
    theme('colors.nh-bourbon.50/50') 5%,
    theme('colors.nh-bourbon.100/50') 25%,
    theme('colors.nh-bourbon.100/50') 75%,
    theme('colors.nh-bourbon.50/50') 95%
  );
}
</style>
