<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskCreateCard
      :is-submit-loading="isFetching"
      @submit="submitTask"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasksStore';
import type { TodoTask } from '@noodles-house/db';
import { storeToRefs } from 'pinia';
import TaskCreateCard from '../../tasks/TaskCreateCard.vue';

const taskStore = useTaskStore();
const { isFetching } = storeToRefs(taskStore);

async function submitTask(task: TodoTask) {
  try {
    const created = await taskStore.createTask(task);
    console.log('Created a new task:', created);
  } catch (err) {
    console.error('Failed to create a new task:', err);
  }
}
</script>
