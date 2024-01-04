<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskListCard />
  </div>
</template>

<script setup lang="ts">
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskListCard from '../../tasks/TaskListCard.vue';
</script>
