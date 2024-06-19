<template>
  <div class="body-temp flex flex-col w-full overflow-hidden">
    <PreCodeBlock :data="curUser" />
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import { storeToRefs } from 'pinia';

const { curUser } = storeToRefs(useNativeAuth());
</script>
