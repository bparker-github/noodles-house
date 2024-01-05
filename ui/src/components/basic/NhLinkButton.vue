<template>
  <NhButton
    v-bind="allProps"
    as="RouterLink"
    :to="to"
  >
    <template #default><slot></slot></template>
  </NhButton>
</template>

<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';
import NhButton, { type NhButtonProps } from './NhButton.vue';

export interface NhLinkButtonProps extends Omit<NhButtonProps, 'as'> {
  to: RouteLocationRaw;
}
const allProps = defineProps<NhLinkButtonProps>();
</script>
