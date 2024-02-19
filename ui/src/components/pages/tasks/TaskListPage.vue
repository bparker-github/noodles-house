<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskListCard
      :all-tasks="knownTasks"
      :is-fetching="isFetching"
      @refresh="() => taskStore.getMyTasks(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskListCard from '../../tasks/TaskListCard.vue';

const taskStore = useTaskStore();
const { knownTasks, isFetching } = storeToRefs(taskStore);
