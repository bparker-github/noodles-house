<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskListCard
      title="All Tasks"
      :tasks="allTasks"
      :is-fetching="isFetching"
      @refresh="() => tasksStore.getAllTasks(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskListCard from '../../tasks/TaskListCard.vue';
import { onMounted } from 'vue';

const tasksStore = useTaskStore();
const { allTasks, isFetching } = storeToRefs(tasksStore);

// Ensure we have AllTasks data fetched.
onMounted(() => tasksStore.getAllTasks(false));
</script>
