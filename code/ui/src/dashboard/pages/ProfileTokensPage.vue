<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="sm:flex sm:items-start sm:justify-between">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900">Known token below:</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>{{ value }}</p>
          </div>
        </div>
        <div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
          <button
            type="button"
            :class="[
              'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm',
              'bg-indigo-600 text-white hover:bg-indigo-500',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
            @click="handleClick"
          >
            Get Token
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseLoginRequest, useAuthStore } from '@noodles-house/common';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const authStore = useAuthStore();
const { user, instance } = storeToRefs(authStore);

const value = ref('');

async function handleClick() {
  try {
    const resp = await instance.value.acquireTokenSilent(BaseLoginRequest);
    console.log('Success:', resp);
    value.value = JSON.stringify(resp, null, 2);
  } catch (err) {
    console.warn('Error:', err);
  }
}

console.log('User:', user.value);
</script>
