<template>
  <div
    :class="[
      'task-create-card',
      'flex flex-col flex-1 gap-y-4',
      'bg-nh-white rounded-md shadow-lg px-3 py-5',
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
      <NoofInput
        v-model:value="createTaskTitle"
        label="Title"
        id="create-task-title"
        :ele-props="{
          placeholder: 'Enter a summarized title',
        }"
      />

      <NoofSelect
        v-model:value="createTaskType"
        label="Task Type"
        id="create-task-type"
        :options="taskTypes"
      />

      <NoofTextArea
        v-model:value="createTaskDescription"
        label="Description"
        id="create-task-description"
        :ele-props="{
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
import NoofSelect from '@/Noof/inputs/NoofSelect.vue';
import { useNativeAuth } from '@/auth/useNativeAuth';
import { EnumObject } from '@/lib';
import { TaskState, TaskType, type TodoTask } from '@nh/shared';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import NoofInput from '../../Noof/inputs/NoofInput.vue';
import NoofTextArea from '../../Noof/inputs/NoofTextarea.vue';
import NhButton from '../basic/NhButton.vue';

const props = defineProps<{ isSubmitLoading?: boolean }>();
const emits = defineEmits<{ submit: [TodoTask] }>();

const { userId } = storeToRefs(useNativeAuth());

const taskModel = ref<TodoTask>({
  createdAt: new Date(),
  createdBy: userId.value ?? 'Unknown user',
  id: '',
  title: '',
  type: TaskType.UNSPECIFIED,
  state: TaskState.REPORTED,
  description: '',
  subTitle: '',
});
const createTaskTitle = computed({
  get: () => taskModel.value.title,
  set: (nv) => (taskModel.value.title = nv),
});
const createTaskType = computed({
  get: () => taskModel.value.type,
  set: (nv) => (taskModel.value.type = nv),
});
const createTaskDescription = computed<string>({
  get: () => taskModel.value.description ?? '',
  set: (nv) => (taskModel.value.description = nv ?? ''),
});

const taskTypes: EnumObject<TaskType>[] = [
  { label: TaskType.UNSPECIFIED.toString(), value: TaskType.UNSPECIFIED },
  { label: TaskType.BUG.toString(), value: TaskType.BUG },
  { label: TaskType.IMPROVEMENT.toString(), value: TaskType.IMPROVEMENT },
];

async function onSubmit() {
  // Short circuit
  if (props.isSubmitLoading) {
    return;
  }

  const toSave: TodoTask = {
    title: createTaskTitle.value,
    description: createTaskDescription.value,
    type: TaskType.UNSPECIFIED,
    state: TaskState.REPORTED,
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
