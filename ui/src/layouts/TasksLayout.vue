<template>
  <div class="tasks-layout">
    <!-- The main title on the top -->
    <h1 class="p-1 mb-1 text-2xl text-nh-bourbon-900">{{ $route.name }}</h1>

    <!-- The navigation tabs -->
    <TasksTabs />

    <!-- The content of this tasks page/component. -->
    <div class="tasks-layout-content px-2 pt-3 pb-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TasksTabs from '@/components/tasks/TasksTabs.vue';
</script>
