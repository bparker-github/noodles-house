import { useAuthFetch } from '@/lib/useAuthFetch';
import { useTimedStorage } from '@/lib/useTimedStorage';
import type { ModelResponse } from '@db/models/ModelResponse';
import type { TodoTask } from '@db/models/TodoTask';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

interface TasksData {
  allTasks?: TodoTask[];
  allTasksCount?: number;
  myTasks?: TodoTask[];
  myTasksCount?: number;
}

export const useTaskStore = defineStore('todo-task-store', () => {
  const tasksData = useTimedStorage<TasksData>('tasks-data');
  const setTasksData = (data: Partial<TasksData>) =>
    (tasksData.value = Object.assign({}, tasksData.value, data));

  const myTasks = computed({
    get: () => tasksData.value?.myTasks,
    set: (nv) => setTasksData({ myTasks: nv }),
  });
  const myTasksCount = computed(
    () => tasksData.value?.myTasksCount ?? tasksData.value?.myTasks?.length
  );
  const allTasks = computed({
    get: () => tasksData.value?.allTasks,
    set: (nv) => setTasksData({ allTasks: nv }),
  });
  const allTasksCount = computed(
    () => tasksData.value?.allTasksCount ?? tasksData.value?.allTasks?.length
  );

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

  //#region GetAllCount
  const GET_getTaskCount = useFetch('/api/tasks/count', { immediate: false }).json<number>();
  async function getAllTasksCount(forceRefresh = false) {
    if (!forceRefresh && allTasksCount.value !== undefined) {
      // Return cached data if we have it.
      console.info('Returning known count from cache.');
      return allTasksCount.value;
    } else if (GET_getTaskCount.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate tasks-count fetch.');
      return await GET_getTaskCount;
    }

    // Perform the lookup and update records
    try {
      await GET_getTaskCount.execute();
      setTasksData({
        allTasksCount: GET_getTaskCount.response.value?.ok
          ? GET_getTaskCount.data.value ?? undefined
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
    ModelResponse<TodoTask[]>
  >();
  async function getMyTasks(forceRefresh = false) {
    if (!forceRefresh && !!myTasks.value?.length) {
      // Return cached data if we have it.
      console.info('Returning known tasks from cache.');
      return myTasks.value;
    } else if (GET_getMyTasks.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate my-tasks fetch.');
      return await GET_getMyTasks;
    }

    // Perform the lookup and update records
    try {
      await GET_getMyTasks.execute();
      setTasksData({
        myTasks: GET_getMyTasks.response.value?.ok ? GET_getMyTasks.data.value?.value : [],
      });
    } catch (err) {
      console.error('Failed to get my tasks:', err);
      return [];
    }
  }
  //#endregion

  //#region GetAllTasks
  const GET_allTasks = useAuthFetch<ModelResponse<TodoTask[]>>({
    url: '/data-api/direct/tasks',
    asJson: true,
    authRoleRequired: 'authenticated',
    immediate: false,
  });
  async function getAllTasks(forceRefresh = false) {
    if (!forceRefresh && !!allTasks.value?.length) {
      // Return cached data if we have it.
      console.info('Returning all tasks from cache.');
      return allTasks.value;
    } else if (GET_allTasks.isFetching.value) {
      // Prevent duplicate requests
      console.warn('Preventing duplicate all-tasks fetch.');
      return await GET_allTasks;
    }

    // Perform the lookup and update records
    try {
      await GET_allTasks.execute();
      setTasksData({
        allTasks: GET_allTasks.response.value?.ok ? GET_allTasks.data.value?.value : [],
      });
    } catch (err) {
      console.error('Failed to get all tasks:', err);
      return [];
    }
  }
  //#endregion

  //#region Create Task
  const POST_createTask = useFetch('/data-api/direct/tasks', { immediate: false }).json<
    ModelResponse<TodoTask[]>
  >();
  async function createTask(toSave: TodoTask): Promise<TodoTask | null> {
    try {
      const postFetch = POST_createTask.post(toSave, 'json');
      await postFetch.execute();

      // Retrieve the result, and add to both lists if we succeeded.
      const found = postFetch.data.value?.value?.[0] ?? null;
      if (found) {
        setTasksData({
          allTasks: allTasks.value?.concat(found),
          myTasks: myTasks.value?.concat(found),
        });
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
    myTasks,
    myTasksCount,
    allTasks,
    allTasksCount,
    isFetching,
    errorMsg,

    // Fetch functions
    getAllTasksCount,
    getMyTasks,
    getAllTasks,
    createTask,

    // Others
    clearTasksCache,
  };
});
