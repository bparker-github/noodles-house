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

const getDefaultOpenState = () => ({ menu: false });

export const useDashboardStore = defineStore('dashboardSidebar', () => {
  const openState = useLocalStorage<MenuOpenState>('[nh]menu-state', getDefaultOpenState(), {
    serializer: StorageSerializers.object,
  });

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

  const basicPrimaryItemList: ListItem[] = [
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
        {
          label: 'Home',
          to: { name: RouteName.TASKS_HOME },
          leftInitial: 'H',
          useExactActiveClass: true,
        },
        {
          label: 'List Tasks (All)',
          to: { name: RouteName.TASKS_LIST_ALL },
          leftInitial: 'A',
          useExactActiveClass: true,
        },
        {
          label: 'List Tasks (My)',
          to: { name: RouteName.TASKS_LIST_MY },
          leftInitial: 'M',
          useExactActiveClass: true,
        },
        {
          label: 'Create Task',
          to: { name: RouteName.TASKS_CREATE },
          leftInitial: 'C',
          useExactActiveClass: true,
        },
      ],
    },
  ];

  const basicUserItemList: ListItem[] = [
    { label: 'Your profile', to: { name: RouteName.PROFILE }, leftIcon: UserIcon },
    { label: 'User settings', to: { name: RouteName.USER_SETTINGS }, leftIcon: Cog6ToothIcon },
    { label: 'Sign out', to: { name: RouteName.LOGOUT }, leftIcon: LockClosedIcon },
  ];

  function addClick(item: ListItem, onClick?: (it: ListItem) => void): ListItem {
    return Object.assign({}, item, {
      click: () => {
        item.click?.();
        onClick?.(item);
      },
    });
  }
  const addClickTo = (items: ListItem[], onClick?: (it: ListItem) => void): ListItem[] =>
    items.map((it) => addClick(it, onClick));

  const closeIfLink = (item: ListItem) => {
    if (!item.children?.length) isSidebarOpen.value = false;
  };
  const primaryItemList = addClickTo(basicPrimaryItemList, closeIfLink);
  const userItemList = addClickTo(basicUserItemList, closeIfLink);

  function closeMenu() {
    // Close main menu and all submenus by resetting the open state to initial.
    openState.value = getDefaultOpenState();
  }

  return {
    isSidebarOpen,
    primaryItemList,
    userItemList,

    getIsOpenFor,
    closeMenu,
  };
});
