import type { NavigationListItem, SecondaryListItem } from '@/components/index.d';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline';
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

  const navigation: NavigationListItem[] = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  ];
  const itemsTitle = 'Your items';
  const items: SecondaryListItem[] = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
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
