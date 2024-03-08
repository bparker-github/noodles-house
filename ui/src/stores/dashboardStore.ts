import type { ListItem } from '@/components/ItemList';
import { Cog6ToothIcon, ListBulletIcon } from '@heroicons/vue/20/solid';
import { FilmIcon, HomeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { RouteName } from '../router/RouteName';

export interface MenuItemsRecord {
  primaryItems: ListItem[];
  secondaryItems: ListItem[];
  userItems: ListItem[];
}

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
    {
      id: 0,
      label: 'Home',
      to: { name: RouteName.HOME },
      leftIcon: HomeIcon,
      useExactActiveClass: true,
    },
    { id: 1, label: 'Tasks', to: { name: RouteName.TASKS_HOME }, leftIcon: ListBulletIcon },
  ];
  const secondaryListTitle = 'Integrations';
  const secondaryItemList: ListItem[] = [
    { id: 1, label: 'Unsplash Images', to: '#', leftIcon: FilmIcon },
    { id: 2, label: 'Token Testing', to: { name: RouteName.PROFILE_TOKENS }, leftInitial: 'T' },
  ];

  const userListTitle = 'You';
  const userItemList: ListItem[] = [
    { label: 'Your profile', to: { name: RouteName.PROFILE }, leftIcon: UserIcon },
    { label: 'User settings', to: { name: RouteName.USER_SETTINGS }, leftIcon: Cog6ToothIcon },
    { label: 'Sign out', to: { name: RouteName.LOGOUT }, leftIcon: LockClosedIcon },
  ];

  function getItemsWithClick(supplementaryClick: (it?: ListItem) => void): MenuItemsRecord {
    const supplementItem = (item: ListItem): ListItem => ({
      ...item,
      click: () => {
        item.click?.();
        supplementaryClick?.(item);
      },
    });

    // Return all items.
    return {
      primaryItems: primaryItemList.map(supplementItem),
      secondaryItems: secondaryItemList.map(supplementItem),
      userItems: userItemList.map(supplementItem),
    };
  }

  return {
    isOpen,
    setIsOpen,
    sidebarOpen,

    getItemsWithClick,

    primaryItemList,
    secondaryListTitle,
    secondaryItemList,
    userListTitle,
    userItemList,
  };
});
