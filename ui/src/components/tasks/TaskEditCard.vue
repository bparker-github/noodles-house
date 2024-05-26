<template>
  <div
    :class="[
      'task-edit-card',
      'flex flex-col flex-1 gap-y-4',
      'bg-nh-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <form
      :class="['todo-edit-form', 'flex flex-col gap-y-2']"
      @submit.prevent="onSubmitUpdates"
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
        id="edit-task-title"
        :ele-props="{
          placeholder: 'Enter a summarized title',
        }"
      />

      <NoofSelect
        v-model:value="createTaskType"
        label="Task Type"
        id="edit-task-type"
        :options="taskTypes"
      />

      <NoofTextArea
        v-model:value="createTaskDescription"
        label="Description"
        id="edit-task-description"
        :ele-props="{
          placeholder: 'Enter a description of the task, feature, etc',
          rows: 4,
          onKeypress,
        }"
      />

      <NhButton
        class="self-end px-8 mt-3"
        type="submit"
        :is-loading="isFetching"
        text="Submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import NoofSelect from '@/Noof/inputs/NoofSelect.vue';
import { useNativeAuth } from '@/auth/useNativeAuth';
import { EnumObject } from '@/lib';
import { TaskState, TaskType, type TodoTask } from '@noodles-house/db';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import NoofInput from '../../Noof/inputs/NoofInput.vue';
import NoofTextArea from '../../Noof/inputs/NoofTextarea.vue';
import NhButton from '../basic/NhButton.vue';
import { useTaskStore } from '@/stores/tasksStore';

const props = defineProps<{ task: TodoTask }>();
const emits = defineEmits<{ update: [TodoTask] }>();

const { userId } = storeToRefs(useNativeAuth());

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

const initialTask = ref(props.task);
watch(initialTask, () => {
  console.log('Initial task changed');
});

const createTaskTitle = computed({
  get: () => initialTask.value.title,
  set: (nv) => (initialTask.value.title = nv),
});
const createTaskType = computed({
  get: () => initialTask.value.type,
  set: (nv) => (initialTask.value.type = nv),
});
const createTaskDescription = computed<string>({
  get: () => initialTask.value.description ?? '',
  set: (nv) => (initialTask.value.description = nv ?? ''),
});

const taskTypes: EnumObject<TaskType>[] = [
  { label: TaskType.UNSPECIFIED.toString(), value: TaskType.UNSPECIFIED },
  { label: TaskType.BUG.toString(), value: TaskType.BUG },
  { label: TaskType.IMPROVEMENT.toString(), value: TaskType.IMPROVEMENT },
];

async function onSubmitUpdates() {}

// async function onSubmit() {
//   // Short circuit
//   if (props.isSubmitLoading) {
//     return;
//   }

//   const toSave: TodoTask = {
//     title: createTaskTitle.value,
//     description: createTaskDescription.value,
//     type: TaskType.UNSPECIFIED,
//     state: TaskState.REPORTED,
//     createdAt: new Date(),
//     createdBy: userId.value ?? 'Unknown user',
//     id: '',
//   };

//   emits('submit', toSave);
// }

function onKeypress(ev: KeyboardEvent) {
  if (ev.ctrlKey && ev.code === 'Enter') {
    // Stop the regular typing
    ev.preventDefault();
    ev.stopPropagation();

    // Submit and blur.
    onSubmitUpdates();
    (ev.currentTarget as HTMLTextAreaElement).blur();
  }
}
</script>
