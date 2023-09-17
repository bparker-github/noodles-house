import type { ListItem } from '@ui-common';
import { HomeIcon, UsersIcon } from '@heroicons/vue/24/solid';
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
    { label: 'Dashboard', to: '#', leftIcon: HomeIcon },
    { label: 'Team', to: '#', leftIcon: UsersIcon },
  ];
  const secondaryListTitle = 'Your items';
  const secondaryItemList: ListItem[] = [
    { id: 1, label: 'Heroicons', to: '#', leftInitial: 'H' },
    { id: 2, label: 'Token Testing', to: '/home/profile/tokens', leftInitial: 'T' },
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
