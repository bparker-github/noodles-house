import type { ListItem } from '@/core';
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

  const primaryItemList: ListItem[] = [
    { label: 'Dashboard', to: '#', leftIcon: HomeIcon, current: true },
    { label: 'Team', to: '#', leftIcon: UsersIcon, current: false },
    { label: 'Projects', to: '#', leftIcon: FolderIcon, current: false },
    { label: 'Calendar', to: '#', leftIcon: CalendarIcon, current: false },
    { label: 'Documents', to: '#', leftIcon: DocumentDuplicateIcon, current: false },
    { label: 'Reports', to: '#', leftIcon: ChartPieIcon, current: false },
  ];
  const secondaryListTitle = 'Your items';
  const secondaryItemList: ListItem[] = [
    { id: 1, label: 'Heroicons', to: '#', leftInitial: 'H', current: false },
    { id: 2, label: 'Tailwind Labs', to: '#', leftInitial: 'T', current: false },
    { id: 3, label: 'Something Else', to: '#', leftInitial: 'W', current: false },
  ];

  const userListTitle = 'You';
  const userItemList: ListItem[] = [
    { label: 'Your profile', to: '/home/profile' },
    { label: 'Sign out', to: '/logout' },
  ];

  return {
    isOpen,
    setIsOpen,
    sidebarOpen,

    primaryItemList,
    secondaryListTitle,
    secondaryItemList,
    userListTitle,
    userItemList,
  };
});
