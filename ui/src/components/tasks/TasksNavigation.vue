<template>
  <nav
    class="todo-tasks-navigation-list flex flex-1 flex-col"
    aria-label="Tasks Navigation"
  >
    <ul
      role="list"
      class="-mx-2 space-y-1"
    >
      <li
        v-for="item in navigation"
        :key="item.label"
      >
        <RouterLink
          v-slot="{ isActive }"
          :to="item.to"
          as="template"
        >
          <div
            :class="[
              isActive
                ? 'bg-nh-bourbon-100 text-nh-bourbon-800'
                : 'text-nh-bourbon-950 hover:text-nh-bourbon-800',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-nh-bourbon-200',
            ]"
          >
            <component
              :is="item.leftIcon"
              :class="[
                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0',
              ]"
              aria-hidden="true"
            />
            <span>{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-nh-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
              aria-hidden="true"
              >{{ item.badge }}</span
            >
          </div>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/RouteName';
import { useTaskStore } from '@/stores/tasksStore';
import { DocumentPlusIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import type { FunctionalComponent } from 'vue';
import { onBeforeMount } from 'vue';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { type RouteLocationRaw } from 'vue-router';

interface TaskNavItem {
  to: RouteLocationRaw;
  label: string;
  badge?: string;
  leftIcon?: FunctionalComponent;
}

const taskStore = useTaskStore();
const { knownTasks } = storeToRefs(taskStore);

const navigation = computed<TaskNavItem[]>(() => [
  {
    label: 'Create Task',
    to: { name: RouteName.TASKS_CREATE },
    leftIcon: DocumentPlusIcon,
  },
  {
    label: 'Task List',
    to: { name: RouteName.TASKS_LIST },
    leftIcon: ListBulletIcon,
    badge: `${knownTasks.value?.length}` ?? undefined,
  },
]);

// Begin but don't await the TaskList call before mount.
onBeforeMount(() => {
  taskStore.getAllTasks();
});
</script>
