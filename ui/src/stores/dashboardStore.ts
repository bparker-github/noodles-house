import type { ListItem } from '@/components/ItemList';
import { Cog6ToothIcon, ListBulletIcon } from '@heroicons/vue/20/solid';
import { HomeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import { StorageSerializers, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { RouteName } from '../router/RouteName';

export interface MenuItemsRecord {
  primaryItems: ListItem[];
  userItems: ListItem[];
}

export interface MenuOpenState extends Partial<Record<RouteName, boolean>> {
  menu: boolean;
}

export const useDashboardStore = defineStore('dashboardSidebar', () => {
  const openState = useLocalStorage<MenuOpenState>(
    '[nh]menu-state',
    { menu: false },
    { serializer: StorageSerializers.object }
  );

  const isSidebarOpen = computed({
    get: () => openState.value.menu,
    set: (nv) => (openState.value.menu = nv),
  });

  const getIsOpenFor = (key: RouteName, supplementaryClose?: () => void) =>
    computed({
      get: () => openState.value[key] ?? false,
      set: (nv) => {
        if (!nv) supplementaryClose?.();
        return Object.assign(openState.value, { [key]: nv });
      },
    });

  const primaryItemList: ListItem[] = [
    {
      label: 'Home',
      to: { name: RouteName.HOME },
      leftIcon: HomeIcon,
      useExactActiveClass: true,
    },
    {
      label: 'Tasks',
      to: { name: RouteName.TASKS_HOME },
      leftIcon: ListBulletIcon,
      children: [
        { label: 'Home', to: { name: RouteName.TASKS_HOME }, leftInitial: 'H' },
        { label: 'List Tasks (All)', to: { name: RouteName.TASKS_HOME }, leftInitial: 'A' },
        {
          label: 'List Tasks (My)',
          to: { name: RouteName.TASKS_LIST_MY },
          leftInitial: 'M',
        },
        { label: 'Create Task', to: { name: RouteName.TASKS_CREATE }, leftInitial: 'C' },
      ],
    },
  ];

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
      userItems: userItemList.map(supplementItem),
    };
  }

  function closeMenu() {
    openState.value.menu = false;
  }

  return {
    isSidebarOpen,
    primaryItemList,
    userItemList,

    getIsOpenFor,
    closeMenu,

    getItemsWithClick,
  };
});
