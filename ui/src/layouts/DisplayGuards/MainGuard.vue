<template>
  <slot><RouterView /></slot>
  <div
    v-bind="$attrs"
    class="fixed inset-0 bg-nh-off-yellow-600/70"
  >
    <div
      :class="[
        'prose flex flex-col flex-1 items-center self-center justify-center',
        'mx-20p bg-nh-off-yellow-300/80  rounded-md px-4 py-5',
      ]"
    >
      <h2 class="inline-flex items-center text-nh-bourbon-950">
        <ExclamationCircleIcon class="h-7 w-7 mr-3 text-danger" />{{ title }}
      </h2>
      <h4>{{ subTitle }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid';

export interface MainGuardProps {
  title?: string;
  subTitle?: string;
}
defineProps<MainGuardProps>();
defineOptions({ inheritAttrs: false });
</script>
