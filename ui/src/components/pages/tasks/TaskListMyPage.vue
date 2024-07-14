<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskListCard
      title="My Tasks"
      :tasks="myTasks"
      :is-fetching="isFetching"
      @refresh="() => tasksStore.getMyTasks(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import TaskListCard from '../../tasks/TaskListCard.vue';
import { onMounted } from 'vue';

const tasksStore = useTaskStore();
const { myTasks, isFetching } = storeToRefs(tasksStore);

// Ensure we have MyTasks data fetched.
onMounted(() => tasksStore.getMyTasks(false));
</script>
