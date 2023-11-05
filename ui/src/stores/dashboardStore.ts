import type { ListItem } from '@/components/ItemList';
import { FilmIcon, HomeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { RouteName } from '../router/RouteName';

export const useDashboardStore = defineStore('dashboardSidebar', () => {
  const isOpen = ref(false);
  function setIsOpen(newVal: boolean): void {
    isOpen.value = newVal;
  }

  const sidebarOpen = computed<boolean>({
    get: () => isOpen.value,
    set: (newVal: boolean) => (isOpen.value = newVal),
  });

  const primaryItemList: ListItem[] = [
    { label: 'Home', to: { name: RouteName.HOME }, leftIcon: HomeIcon },
  ];
  const secondaryListTitle = 'Integrations';
  const secondaryItemList: ListItem[] = [
    { id: 1, label: 'Unsplash Images', to: '#', leftIcon: FilmIcon },
    { id: 2, label: 'Token Testing', to: { name: RouteName.PROFILE_TOKENS }, leftInitial: 'T' },
  ];

  const userListTitle = 'You';
  const userItemList: ListItem[] = [
    { label: 'Your profile', to: { name: RouteName.PROFILE }, leftIcon: UserIcon },
    { label: 'Sign out', to: { name: RouteName.LOGOUT }, leftIcon: LockClosedIcon },
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
