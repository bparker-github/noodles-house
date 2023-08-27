import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/vue/24/solid';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ListItem } from '../layout/ListItems';

export const useDashboardSidebarStore = defineStore('dashboardSidebar', () => {
  const isOpen = ref(false);
  function setIsOpen(newVal: boolean): void {
    isOpen.value = newVal;
  }

  const sidebarOpen = computed({
    get(): boolean {
      return isOpen.value;
    },
    set(newVal: boolean): void {
      isOpen.value = newVal;
    },
  });

  const navigation: ListItem[] = [
    { label: 'Dashboard', to: '#', leftIcon: HomeIcon, current: true },
    { label: 'Team', to: '#', leftIcon: UsersIcon, current: false },
    { label: 'Projects', to: '#', leftIcon: FolderIcon, current: false },
    { label: 'Calendar', to: '#', leftIcon: CalendarIcon, current: false },
    { label: 'Documents', to: '#', leftIcon: DocumentDuplicateIcon, current: false },
    { label: 'Reports', to: '#', leftIcon: ChartPieIcon, current: false },
  ];
  const itemsTitle = 'Your items';
  const items: ListItem[] = [
    { id: 1, label: 'Heroicons', to: '#', leftInitial: 'H', current: false },
    { id: 2, label: 'Tailwind Labs', to: '#', leftInitial: 'T', current: false },
    { id: 3, label: 'Something Else', to: '#', leftInitial: 'W', current: false },
  ];

  return {
    isOpen,
    setIsOpen,
    sidebarOpen,

    navigation,
    items,
    itemsTitle,
  };
});
