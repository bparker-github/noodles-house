<template>
  <div class="task-list-page flex flex-col gap-y-4">
    <TaskInfoAndNavCard />
    <TaskCreateCard />
  </div>
</template>

<script setup lang="ts">
import TaskInfoAndNavCard from '../../tasks/TaskInfoAndNavCard.vue';
import TaskCreateCard from '../../tasks/TaskCreateCard.vue';
</script>
