<template>
  <div class="body-temp flex flex-col w-full overflow-hidden">
    <pre
      class="p-2 bg-nh-off-yellow-50 rounded-md shadow-inner-lg overflow-x-auto border border-nh-bourbon-950/25"
      style="clip-path: view-box"
    ><code class="font-mono text-nh-bourbon-950">{{ JSON.stringify(curUser, null, 2) }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import { storeToRefs } from 'pinia';

const nativeAuth = useNativeAuth();
const { curUser } = storeToRefs(nativeAuth);
</script>
