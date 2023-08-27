<template>
  <div class="logo-image flex items-center justify-center">
    <NoodleIcon />

    <span class="right-text font-bold">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { NoodleIcon } from '@/core';
import { toRef } from 'vue';

const props = defineProps({ title: { type: String, default: `Noodle's House` } });
const title = toRef(props, 'title');
</script>
