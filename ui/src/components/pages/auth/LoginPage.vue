<template>
  <PageSpinner title="Logging out..." />
</template>

<script setup lang="ts">
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  window.location.pathname = '/login';
});
</script>
