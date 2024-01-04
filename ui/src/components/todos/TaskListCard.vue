<template>
  <div
    :class="[
      'task-list-card',
      'flex flex-col w-full gap-y-4',
      'bg-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <h2
      :class="[
        'text-xl py-2 self-start text-nh-bourbon-900 px-1',
        'border-b min-w-[50%] border-nh-bourbon-700',
      ]"
    >
      All Tasks
    </h2>
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
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import type { TodoTask } from '@db/models/TodoTask.d';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import TextareaInput from '../inputs/TextareaInput.vue';
import TextboxInput from '../inputs/TextboxInput.vue';

const { userId } = storeToRefs(useNativeAuth());

const emits = defineEmits<{ submit: [TodoTask] }>();

const createTaskTitle = ref('');
const createTaskDescription = ref('');

async function onSubmit() {
  const toSave: TodoTask = {
    title: createTaskTitle.value,
    description: createTaskDescription.value,
    createdAt: new Date(),
    createdBy: userId.value ?? 'Unknown user',
    id: '',
  };

  emits('submit', toSave);
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
