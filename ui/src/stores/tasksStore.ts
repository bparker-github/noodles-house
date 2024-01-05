import type { ModelResponse } from '@db/models/ModelResponse';
import type { TodoTask } from '@db/models/TodoTask';
import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useTaskStore = defineStore('todo-task-store', () => {
  const knownTasks = useSessionStorage<TodoTask[]>('[nh]tasks-list', [], {
    serializer: { read: JSON.parse, write: JSON.stringify },
  });

  //#region GetAll
  const GET_allTasks = useFetch('/data-api/direct/tasks', { immediate: false }).json<
    ModelResponse<TodoTask>
  >();
  const getAll_isFetching = computed(() => GET_allTasks.isFetching.value);
  const getAll_isFinished = computed(() => GET_allTasks.isFinished.value);
  const getAll_error = computed(() => GET_allTasks.error.value);

  async function getAllTasks(forceRefresh = false) {
    // Return cached data if we have it.
    if (!forceRefresh && knownTasks.value.length > 0) {
      console.info('Returning all tasks from cache.');
      return knownTasks.value;
    }

    // Prevent duplicate requests
    if (GET_allTasks.isFetching.value) {
      console.warn('Preventing duplicate all-tasks fetch.');
      return knownTasks.value;
    }

    // Perform the lookup and update records
    try {
      await GET_allTasks.execute();

      knownTasks.value = GET_allTasks.error.value ? [] : GET_allTasks.data.value?.value;
    } catch (err) {
      console.error('Failed to get all tasks:', err);
      return [];
    }
  }
  //#endregion

  //#region GetAll
  const CREATE_task = useFetch('/data-api/direct/tasks', { immediate: false }).json<
    ModelResponse<TodoTask>
  >();
  const create_isFetching = computed(() => CREATE_task.isFetching.value);
  const create_isFinished = computed(() => CREATE_task.isFinished.value);
  const create_error = computed(() => CREATE_task.error.value);

  async function createTask(toSave: TodoTask): Promise<TodoTask | null> {
    try {
      const postFetch = CREATE_task.post(toSave, 'json');
      await postFetch.execute();

      // Retrieve the result, and add to our list if we succeeded.
      const found = postFetch.data.value?.value?.[0] ?? null;
      if (found) {
        knownTasks.value.push(found);
      }
      return found;
    } catch (err) {
      console.error('Failed to create todoTask:', toSave);
      return null;
    }
  }
  //#endregion

  return {
    knownTasks,

    // Get All Tasks info
    getAll_error,
    getAll_isFetching,
    getAll_isFinished,
    getAllTasks,

    // Create
    create_error,
    create_isFetching,
    create_isFinished,
    createTask,
  };
});
