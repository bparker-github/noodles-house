import { useTimedStorage } from '@/lib/useTimedStorage';
import type { ModelResponse } from '@db/models/ModelResponse';
import type { TodoTask } from '@db/models/TodoTask';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

interface TasksData {
  knownTasks?: TodoTask[];
  count?: number;
}

export const useTaskStore = defineStore('todo-task-store', () => {
  const tasksData = useTimedStorage<TasksData>('tasks-data');
  const knownTasks = computed({
    get: () => tasksData.value?.knownTasks,
    set: (nv) => (tasksData.value = Object.assign({}, tasksData.value, { knownTasks: nv })),
  });
  const knownCount = computed({
    get: () => tasksData.value?.count,
    set: (nv) => (tasksData.value = Object.assign({}, tasksData.value, { count: nv })),
  });

  // Shared Vars
  const isFetching = computed(
    () =>
      GET_getTaskCount.isFetching.value ||
      GET_getMyTasks.isFetching.value ||
      GET_allTasks.isFetching.value ||
      POST_createTask.isFetching.value
  );
  const errorMsg = computed(
    () =>
      GET_getTaskCount.error.value ||
      GET_getMyTasks.error.value ||
      GET_allTasks.error.value ||
      POST_createTask.error.value
  );

  //#region GetCount
  const GET_getTaskCount = useFetch('/api/tasks/count', { immediate: false }).json<
    ModelResponse<number>
  >();
  async function getTasksCount(forceRefresh = false) {
    if (!forceRefresh && knownCount.value !== undefined) {
      // Return cached data if we have it.
      console.info('Returning known count from cache.');
      return knownCount.value;
    } else if (GET_getTaskCount.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate tasks-count fetch.');
      return await GET_getTaskCount;
    }

    // Perform the lookup and update records
    try {
      await GET_getTaskCount.execute();
      tasksData.value = Object.assign({}, tasksData.value, {
        knownCount: GET_getTaskCount.response.value?.ok
          ? GET_getTaskCount.data.value?.value
          : undefined,
      });
    } catch (err) {
      console.error('Failed to get tasks count:', err);
      return -1;
    }
  }
  //#endregion

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
      return await GET_getMyTasks;
    }

    // Perform the lookup and update records
    try {
      await GET_getMyTasks.execute();
      tasksData.value = Object.assign({}, tasksData.value, {
        knownTasks: GET_getMyTasks.response.value?.ok ? GET_getMyTasks.data.value?.value : [],
      });
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
      return await GET_allTasks;
    }

    // Perform the lookup and update records
    try {
      await GET_allTasks.execute();
      tasksData.value = Object.assign({}, tasksData.value, {
        knownTasks: GET_allTasks.response.value?.ok ? GET_allTasks.data.value?.value ?? null : [],
      });
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
        knownTasks.value = (knownTasks.value ?? []).concat(found);
      }
      return found;
    } catch (err) {
      console.error('Failed to create todoTask:', toSave);
      return null;
    }
  }
  //#endregion

  function clearTasksCache() {
    tasksData.value = null;
  }

  return {
    // Aggregate variables
    knownTasks,
    knownCount,
    isFetching,
    errorMsg,

    // Fetch functions
    getTasksCount,
    getMyTasks,
    getAllTasks,
    createTask,

    // Others
    clearTasksCache,
  };
});
