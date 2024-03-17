<template>
  <div class="tasks-layout">
    <!-- The navigation tabs -->
    <TasksTabs v-if="!subtle" />
    <TasksTabsSubtle v-else />

    <!-- The content of this tasks page/component. -->
    <div class="tasks-layout-content px-2 pt-3 pb-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TasksTabs from '@/components/tasks/TasksTabs.vue';
import TasksTabsSubtle from '@/components/tasks/TasksTabsSubtle.vue';

const subtle = true;
</script>
