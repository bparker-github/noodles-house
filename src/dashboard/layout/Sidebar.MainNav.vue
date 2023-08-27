<template>
  <nav class="flex flex-1 flex-col">
    <ul
      role="list"
      class="flex flex-1 flex-col gap-y-7"
    >
      <li>
        <ItemList :items="navigation" />
      </li>
      <li>
        <ItemList
          title="Your items"
          :items="secondItems"
        />
      </li>
      <li>
        <slot name="third-item"></slot>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useDashboardSidebarStore } from '../stores/dashboardSidebar';
import ItemList from './ItemList.vue';

const dashboardStore = useDashboardSidebarStore();
const navigation = toRef(dashboardStore, 'navigation');
const secondItems = toRef(dashboardStore, 'items');
</script>
