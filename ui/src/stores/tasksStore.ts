import { useTimedStorage } from '@/lib/useTimedStorage';
import type { ModelResponse } from '@db/models/ModelResponse';
import type { TodoTask } from '@db/models/TodoTask';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useTaskStore = defineStore('todo-task-store', () => {
  const knownTasks = useTimedStorage<TodoTask[]>('[nh]tasks-list');

  // Shared Vars
  const isFetching = computed(
    () =>
      GET_getMyTasks.isFetching.value ||
      GET_allTasks.isFetching.value ||
      POST_createTask.isFetching.value
  );
  const errorMsg = computed(
    () => GET_getMyTasks.error.value || GET_allTasks.error.value || POST_createTask.error.value
  );

  //#region GetMine
  const GET_getMyTasks = useFetch('/api/tasks', { immediate: false }).json<
    ModelResponse<TodoTask>
  >();
  async function getMyTasks(forceRefresh = false) {
    if (!forceRefresh && !!knownTasks.value?.length) {
      // Return cached data if we have it.
      console.info('Returning known tasks from cache.');
      return knownTasks.value;
    } else if (GET_getMyTasks.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate my-tasks fetch.');
      return knownTasks.value;
    }

    // Perform the lookup and update records
    try {
      await GET_getMyTasks.execute();
      knownTasks.value = GET_getMyTasks.response.value?.ok
        ? GET_getMyTasks.data.value?.value ?? null
        : [];
    } catch (err) {
      console.error('Failed to get my tasks:', err);
      return [];
    }
  }
  //#endregion

  //#region GetAll
  const GET_allTasks = useFetch('/data-api/direct/tasks', { immediate: false }).json<
    ModelResponse<TodoTask>
  >();
  async function getAllTasks(forceRefresh = false) {
    if (!forceRefresh && !!knownTasks.value?.length) {
      // Return cached data if we have it.
      console.info('Returning all tasks from cache.');
      return knownTasks.value;
    } else if (GET_allTasks.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate all-tasks fetch.');
      return knownTasks.value;
    }

    // Perform the lookup and update records
    try {
      await GET_allTasks.execute();

      knownTasks.value = GET_allTasks.response.value?.ok
        ? GET_allTasks.data.value?.value ?? null
        : [];
    } catch (err) {
      console.error('Failed to get all tasks:', err);
      return [];
    }
  }
  //#endregion

  //#region Create Task
  const POST_createTask = useFetch('/data-api/direct/tasks', { immediate: false }).json<
    ModelResponse<TodoTask>
  >();
  async function createTask(toSave: TodoTask): Promise<TodoTask | null> {
    try {
      const postFetch = POST_createTask.post(toSave, 'json');
      await postFetch.execute();

      // Retrieve the result, and add to our list if we succeeded.
      const found = postFetch.data.value?.value?.[0] ?? null;
      if (found) {
        knownTasks.value ??= [];
        knownTasks.value.push(found);
      }
      return found;
    } catch (err) {
      console.error('Failed to create todoTask:', toSave);
      return null;
    }
  }
  //#endregion

  function clearTasksCache() {
    knownTasks.value = null;
  }

  return {
    // Aggregate variables
    knownTasks,
    isFetching,
    errorMsg,

    // Fetch functions
    getMyTasks,
    getAllTasks,
    createTask,

    // Others
    clearTasksCache,
  };
});
