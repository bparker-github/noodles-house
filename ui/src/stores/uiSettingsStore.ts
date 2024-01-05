import { useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export interface UiSettings {
  taskInfoOpen?: boolean;
}

export const useUiSettings = defineStore('ui-settings', () => {
  const settings = useSessionStorage<UiSettings>('[nh]uis', {}, { deep: true });

  const isTaskInfoOpen = computed(() => !!settings.value.taskInfoOpen);
  const setTaskInfoOpen = (newVal?: boolean) =>
    (settings.value.taskInfoOpen = newVal === undefined ? !settings.value.taskInfoOpen : newVal);

  return {
    // Shared
    settings,

    // Tasks
    isTaskInfoOpen,
    setTaskInfoOpen,
  };
});
