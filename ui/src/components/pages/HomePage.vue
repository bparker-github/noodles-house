<template>
  <div class="flex flex-col flex-nowrap items-center px-6 lg:px-8">
    <div class="mx-auto max-w-[100%] text-center lg:max-w-4xl">
      <h2
        class="text-left text-bali-hai-900 pb-6 pt-2 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        Authentication Result
      </h2>

      <h4 class="text-bali-hai-800 pb-4 pt-2 text-2xl tracking-light text-left">Current User:</h4>

      <hr class="py-4" />

      <pre
        class="border-bali-hai-300 bg-bali-hai-200 text-bali-hai-900 max-h-[800px] overflow-x-scroll rounded-md p-2 text-left text-lg leading-8 shadow-inner whitespace-pre"
      >
        <code>{{ userToPrint }}</code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const authStore = useAuthStore();
const { currAccount } = storeToRefs(authStore);

const userToPrint = computed(() => JSON.stringify(currAccount.value ?? {}, null, 2).trim());
</script>
