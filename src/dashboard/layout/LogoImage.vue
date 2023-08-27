<template>
  <div class="logo-image flex flex-1 items-center justify-center">
    <NoodleIcon class="h-16 w-16 duo-gray-pink duo2-bourbon-100" />

    <div class="right-text ml-2 flex w-full flex-col align-middle text-whiteish">
      <span class="ml-10p text-2xl font-semibold leading-5">{{ title1 }}</span>
      <span class="mr-10p text-end text-xl leading-5">{{ title2 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
interface LogoImageProps {
  titleRow1: string;
  titleRow2?: string;
}
</script>

<script setup lang="ts">
import { NoodleIcon } from '@/core';
import { toRef } from 'vue';

const props = defineProps<LogoImageProps>();
const title1 = toRef(props, 'titleRow1');
const title2 = toRef(props, 'titleRow2');
</script>
