<template>
  <nav class="flex flex-1 flex-col">
    <ul
      role="list"
      class="flex flex-1 flex-col gap-y-7"
    >
      <li>
        <MainItemList :items="primaryItemList" />
      </li>
      <li>
        <MainItemList
          :title="secondaryListTitle"
          :items="secondaryItemList"
        />
      </li>
      <li v-if="includeUserItems">
        <MainItemList :items="userItemList" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { MainItemList } from '@nh/ui-common';
import { useDashboardSidebarStore } from '../stores/dashboardSidebar';

interface SidebarMainNavProps {
  includeUserItems: boolean;
}
defineProps<SidebarMainNavProps>();

// These are constants, we do not need to `ref` them.
const { primaryItemList, secondaryItemList, secondaryListTitle, userItemList } =
  useDashboardSidebarStore();
</script>
