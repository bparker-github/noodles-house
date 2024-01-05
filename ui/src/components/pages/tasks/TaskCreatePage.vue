<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskCreateCard
      :is-submit-loading="create_isFetching"
      @submit="submitTask"
    />
  </div>
</template>

<script setup lang="ts">
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskCreateCard from '../../tasks/TaskCreateCard.vue';
import type { TodoTask } from '@db/models/TodoTask';
import { useTaskStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();
const { create_isFetching } = storeToRefs(taskStore);

async function submitTask(task: TodoTask) {
  try {
    const created = await taskStore.createTask(task);
    console.log('Created a new task:', created);
  } catch (err) {
    console.error('Failed to create a new task:', err);
  }
}
</script>
