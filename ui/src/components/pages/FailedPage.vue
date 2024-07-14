<template>
  <p>This is the Failed page. Be sure that you are doing something else sometime.</p>
  <RouterLink :to="{ name: RouteName.LOGIN }">Login</RouterLink>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/RouteName';
</script>
