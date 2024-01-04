<template>
  <div class="todo-page-container flex flex-col w-full gap-y-4">
    <TaskCreateCard @submit="onSubmit" />
    <TaskListCard @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type { TodoTask } from '@db/models/TodoTask';
import { useFetch } from '@vueuse/core';
import TaskCreateCard from '../todos/TaskCreateCard.vue';
import TaskListCard from '../todos/TaskListCard.vue';

async function onSubmit(toSubmit: TodoTask) {
  const submitFetch = await useFetch('/api/todo/create').post(toSubmit, 'json').json<TodoTask>();

  if (submitFetch.error.value) {
    console.error('Submit new Task failed:', submitFetch.error.value);
    return;
  }

  console.log('Todo Task Created:', submitFetch.data.value);
}
</script>
