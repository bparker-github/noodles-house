<template>
  <div class="todo-page-container flex flex-col w-full gap-y-4">
    <TaskCreateCard
      :is-submit-loading="SUBMIT_fetch.isFetching.value"
      @submit="onSubmit"
    />
    <TaskListCard @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type { TodoTask } from '@db/models/TodoTask';
import type { ModelResponse } from '@db/models/ModelResponse';
import { useFetch } from '@vueuse/core';
import TaskCreateCard from '../todos/TaskCreateCard.vue';
import TaskListCard from '../todos/TaskListCard.vue';

const SUBMIT_fetch = useFetch('/api/todo/create', { immediate: false }).json<
  ModelResponse<TodoTask>
>();

async function onSubmit(toSubmit: TodoTask) {
  // Add the post body, and execute.
  await SUBMIT_fetch.post(toSubmit, 'json').execute();

  if (SUBMIT_fetch.error.value) {
    console.error('Submit new Task failed:', SUBMIT_fetch.error.value);
    return;
  }

  console.log('Todo Task Created:', SUBMIT_fetch.data.value);
}
</script>
