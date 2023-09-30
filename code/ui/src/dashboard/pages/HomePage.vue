<template>
  <div class="flex flex-col flex-nowrap items-center px-6 lg:px-8">
    <div class="mx-auto max-w-[100%] text-center lg:max-w-4xl">
      <h2 class="text-bali-hai-900 pb-6 pt-2 text-4xl font-bold tracking-tight sm:text-6xl">
        Authentication Result
      </h2>

      <hr class="py-4" />

      <pre
        class="border-bali-hai-300 bg-bali-hai-200 text-bali-hai-900 max-h-[500px] overflow-x-scroll rounded-md p-2 text-left text-lg leading-8 shadow-inner"
      ><code>{{ userToPrint }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@noodles-house/common';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userToPrint = JSON.stringify(user.value, null, 2).trim();
</script>
