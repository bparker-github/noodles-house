<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskListCard
      :all-tasks="knownTasks"
      :is-fetching="getAll_isFetching"
      @refresh="() => doRefresh(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/tasksStore';
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskListCard from '../../tasks/TaskListCard.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const taskStore = useTaskStore();
const { knownTasks, getAll_isFetching } = storeToRefs(taskStore);

function doRefresh(force = false): Promise<unknown> {
  // Don't double-fetch.
  if (getAll_isFetching.value) {
    return Promise.resolve();
  }

  return taskStore.getAllTasks(force);
}

onMounted(async () => {
  // If we have no items, presume we haven't fetched yet.
  // Otherwise non-forced lookup - we have a refresh button for emergencies ;D
  await doRefresh(!knownTasks.value.length);
});
</script>
