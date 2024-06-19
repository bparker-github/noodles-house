<template>
  <nav
    :class="['flex flex-1 items-center divide-x border-nh-bourbon-950 -my-2 mx-2 rounded-b-md']"
    aria-label="Tasks Tabs"
  >
    <RouterLink
      v-for="tab in tasksTabs"
      v-slot="{ isExactActive, href, navigate }"
      :key="tab.label"
      :to="tab.value"
      :custom="true"
    >
      <a
        :href="href"
        @click="navigate"
        :class="[
          'flex items-center justify-center self-stretch min-h-full px-2 py-1 flex-1',
          'hover:bg-nh-bourbon-700 text-nh-bourbon-100',
          'first:rounded-bl-md last:rounded-br-md',
          'text-sm font-medium text-center',
          isExactActive ? 'bg-nh-bourbon-600' : 'bg-nh-bourbon-800',
        ]"
      >
        <span>{{ tab.label }}</span>
      </a>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { EnumObject } from '@/lib';
import { RouteName } from '@/router/RouteName';
import { RouteLocationRaw, RouterLink } from 'vue-router';

const tasksTabs: EnumObject<RouteLocationRaw>[] = [
  { label: 'Home', value: { name: RouteName.TASKS_HOME } },
  { label: 'List (My) Tasks', value: { name: RouteName.TASKS_LIST_MY } },
  { label: 'List (All) Tasks', value: { name: RouteName.TASKS_LIST_ALL } },
  { label: 'Create Task', value: { name: RouteName.TASKS_CREATE } },
];
</script>
