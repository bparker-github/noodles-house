<template>
  <div class="logo-image flex flex-1 items-center justify-center">
    <NoodleIconSvg class="duo-gray-pink duo2-bourbon-100 h-16 w-16" />

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
import { NoodleIconSvg } from '@nh/ui-common';

export interface LogoImageProps {
  titleRow1: string;
  titleRow2?: string;
}

defineProps<LogoImageProps>();
</script>
