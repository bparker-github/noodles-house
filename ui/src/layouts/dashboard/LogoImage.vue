<template>
  <div class="logo-image flex flex-1 items-center justify-center">
    <NoodleIconSvg class="duo-nh-di-serria-600 duo2-nh-bourbon-200 h-16 w-16" />

    <div class="right-text text-whiteish ml-2 flex w-full flex-col align-middle">
      <span class="ml-10p text-2xl font-semibold leading-5">{{ titleRow1 }}</span>
      <span
        v-if="titleRow2"
        class="mr-10p text-end text-xl leading-5"
        >{{ titleRow2 }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';

export interface LogoImageProps {
  titleRow1: string;
  titleRow2?: string;
}

defineProps<LogoImageProps>();
</script>
