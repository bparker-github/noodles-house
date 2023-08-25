<template>
  <div class="text-xs font-semibold leading-6 text-gray-400">{{ title }}</div>
  <ul
    role="list"
    class="-mx-2 mt-2 space-y-1"
  >
    <li
      v-for="item in itemsToUse"
      :key="item.name"
    >
      <a
        :href="item.href"
        :class="[
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        ]"
      >
        <component
          v-if="item.icon"
          :is="item.icon"
          class="h-6 w-6"
        />
        <span
          v-else
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
        >
          {{ item.initial ?? '?' }}
        </span>
        <span class="truncate">{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useDashboardSidebarStore } from '@/dashboard/stores/dashboardSidebar';
import type { FunctionalComponent } from 'vue';

interface ListItemBase {
  /** The visible name of the item */
  name: string;
  /** An optional id to use as the element key - otherwise name. */
  id?: string | number;
  /** An optional value to trace the active state, used to change visual */
  current?: boolean;
}
interface ListItem_Icon extends ListItemBase {
  icon: FunctionalComponent;
}
interface ListItem_Initial extends ListItemBase {
  initial: string;
}

interface ListItem_Href {
  href: string;
}
interface ListItem_Click {
  click: () => void | Promise<void>;
}

type LinkListItem =
  | (ListItem_Href & ListItemBase)
  | (ListItem_Href & ListItem_Initial)
  | (ListItem_Href & ListItem_Icon);
type ClickListItem =
  | (ListItem_Click & ListItemBase)
  | (ListItem_Click & ListItem_Initial)
  | (ListItem_Click & ListItem_Icon);

export type ListItem = LinkListItem | ClickListItem;

export interface SecondaryListProps {
  title?: string;
  items?: ListItemBase[];
}

const props = defineProps<SecondaryListProps>();
const sidebarStore = useDashboardSidebarStore();

const title = props.title ?? sidebarStore.itemsTitle;
const itemsToUse = props.items ?? sidebarStore.items;
</script>
