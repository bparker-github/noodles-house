<template>
  <nav
    :class="['flex flex-1 items-center divide-x border-nh-bourbon-950 -my-2 mx-2 rounded-b-md']"
    aria-label="Tasks Tabs"
  >
    <NoodleLink
      v-for="tab in tasksTabs"
      :key="tab.label"
      :to="tab.value"
      :class="[
        'flex items-center justify-center self-stretch min-h-full px-2 py-1 flex-1',
        'bg-nh-bourbon-800 hover:bg-nh-bourbon-700 text-nh-bourbon-100',
        'first:rounded-bl-md last:rounded-br-md',
        'text-sm font-medium text-center',
      ]"
      exact-active-class="bg-nh-bourbon-600 text-nh-bourbon-900"
    >
      {{ tab.label }}
    </NoodleLink>
  </nav>
</template>

<script setup lang="ts">
import { EnumObject } from '@/lib';
import { RouteName } from '@/router/RouteName';
import { RouteLocationRaw } from 'vue-router';
import NoodleLink from '../NoodleLink.vue';

const tasksTabs: EnumObject<RouteLocationRaw>[] = [
  { label: 'Home', value: { name: RouteName.TASKS_HOME } },
  { label: 'List (My) Tasks', value: { name: RouteName.TASKS_LIST_MY } },
  { label: 'List (All) Tasks', value: { name: RouteName.TASKS_LIST_ALL } },
  { label: 'Create Task', value: { name: RouteName.TASKS_CREATE } },
];
</script>
