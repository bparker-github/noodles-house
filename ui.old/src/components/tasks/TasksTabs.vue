<template>
  <div class="tasks-tabs">
    <nav
      :class="[
        'isolate flex m-2 border border-nh-bourbon-900/30',
        'divide-x divide-nh-bourbon-950/80 rounded-lg shadow-md',
      ]"
      aria-label="Task Tabs"
    >
      <RouterLink
        v-for="(tab, tabI) in tasksTabs"
        v-slot="{ isActive, isExactActive, href, navigate }"
        :key="tab.label"
        :to="tab.value"
        :custom="true"
      >
        <a
          :href="href"
          @click="navigate"
          :class="[
            'group relative min-w-0 flex flex-1 items-center justify-center overflow-hidden',
            'px-2 py-1.5 text-center text-sm font-medium',
            'hover:bg-gray-50 hover:text-gray-700 focus:z-10',
            {
              'rounded-l-lg': tabI === 0,
              'rounded-r-lg': tabI === tasksTabs.length - 1,
            },
            isExactActive
              ? 'text-nh-bourbon-800 bg-nh-bourbon-100'
              : 'text-nh-bourbon-900 bg-nh-bourbon-50',
          ]"
          :aria-current="isActive ? 'page' : undefined"
        >
          <span>{{ tab.label }}</span>
          <span
            :class="[
              isExactActive ? 'bg-indigo-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { EnumObject } from '@/lib';
import { RouteName } from '@/router/RouteName';
import { RouteLocationRaw } from 'vue-router';

const tasksTabs: EnumObject<RouteLocationRaw>[] = [
  { label: 'Home', value: { name: RouteName.TASKS_HOME } },
  { label: 'List (My) Tasks', value: { name: RouteName.TASKS_LIST_MY } },
  { label: 'List (All) Tasks', value: { name: RouteName.TASKS_LIST_ALL } },
  { label: 'Create Task', value: { name: RouteName.TASKS_CREATE } },
];
</script>
