<template>
  <div
    :class="[
      'todo-page-container',
      'flex flex-col w-full gap-y-4',
      'bg-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <div class="heading-section flex flex-col gap-y-2 text-nh-bourbon-900 [&>p]:text-sm">
      <h1 class="text-2xl font-semibold">Ideas List</h1>
      <p>Here we can collect "todos", ideas and feedback from all sources.</p>
      <p>
        Feel free to add anything and everything that will be helpful to consult at some point. We
        can add feedback, comments, progress, status, and anything else you can think of for these
        features!
      </p>
      <p>Even improvements about this List feature itself is heartily welcome!</p>
    </div>

    <hr class="border-nh-bourbon-800/50" />

    <form
      :class="['todo-create-form', 'flex flex-col', '[&>*]:mb-2']"
      @submit.prevent="onSubmit"
    >
      <h2 class="text-xl py-2 self-start px-1 !mb-0">Create New Task</h2>
      <hr class="w-50p border-nh-bourbon-700" />
      <TextboxInput
        v-model:value="createTaskTitle"
        label="Title"
        input-id="create-task-input"
        :input-props="{ placeholder: 'Enter a summarized title' }"
      />
      <TextareaInput
        v-model:value="createTaskDescription"
        label="Description"
        input-id="create-task-description"
        :textarea-props="{
          placeholder: 'Enter a description of the task, feature, etc',
          rows: 4,
          onKeypress,
        }"
      />

      <NhButton
        class="self-end px-8 mt-3"
        type="submit"
        text="Submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';
import type { TodoTask } from '@db/models/TodoTask.d';
import NhButton from '../basic/NhButton.vue';
import TextareaInput from '../inputs/TextareaInput.vue';
import TextboxInput from '../inputs/TextboxInput.vue';

const createTaskTitle = ref('');
const createTaskDescription = ref('');

const SUBMIT_fetch = useFetch('/api/todo/create', { immediate: false });

async function onSubmit() {
  const toSave = {
    title: createTaskTitle.value,
    description: createTaskDescription.value,
  };

  SUBMIT_fetch.post(toSave, 'json').json<TodoTask>();
  await SUBMIT_fetch.execute();

  console.log('Returned ret:', SUBMIT_fetch.data.value);
}

function onKeypress(ev: KeyboardEvent) {
  if (ev.ctrlKey && ev.code === 'Enter') {
    // Stop the regular typing
    ev.preventDefault();
    ev.stopPropagation();

    // Submit and blur.
    onSubmit();
    (ev.currentTarget as HTMLTextAreaElement).blur();
  }
}
</script>
