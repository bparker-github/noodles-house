import { useTimedStorage } from '@/lib/useTimedStorage';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export interface UiSettings {
  taskInfoOpen?: boolean;
}

export const useUiSettings = defineStore('ui-settings', () => {
  const settings = useTimedStorage<UiSettings>({
    keyName: 'ui-settings',
    initialValue: { taskInfoOpen: false },
  });

  const isTaskInfoOpen = computed(() => !!settings.value?.taskInfoOpen);
  const setTaskInfoOpen = (newVal?: boolean) =>
    Object.assign({}, settings.value, {
      taskInfoOpen: newVal === undefined ? !settings.value?.taskInfoOpen : newVal,
    });

  return {
    // Shared
    settings,

    // Tasks
    isTaskInfoOpen,
    setTaskInfoOpen,
  };
});
