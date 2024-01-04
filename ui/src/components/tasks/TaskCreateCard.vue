<template>
  <div
    :class="[
      'task-create-card',
      'flex flex-col w-full gap-y-4',
      'bg-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <form
      :class="['todo-create-form', 'flex flex-col gap-y-2']"
      @submit.prevent="onSubmit"
    >
      <h2
        :class="[
          'text-xl py-2 self-start px-1 text-nh-bourbon-900',
          'border-b border-nh-bourbon-700 min-w-[50p]',
        ]"
      >
        Create New Task
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

      <NhButton
        class="self-end px-8 mt-3"
        type="submit"
        :is-loading="isSubmitLoading"
        text="Submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import type { TodoTask } from '@db/models/TodoTask.d';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import NhButton from '../basic/NhButton.vue';
import TextareaInput from '../inputs/TextareaInput.vue';
import TextboxInput from '../inputs/TextboxInput.vue';

const props = defineProps<{ isSubmitLoading?: boolean }>();
const emits = defineEmits<{ submit: [TodoTask] }>();

const { userId } = storeToRefs(useNativeAuth());

const createTaskTitle = ref('');
const createTaskDescription = ref('');

async function onSubmit() {
  // Short circuit
  if (props.isSubmitLoading) {
    return;
  }

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
