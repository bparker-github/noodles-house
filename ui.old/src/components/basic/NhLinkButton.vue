<template>
  <NhButton
    v-bind="allProps"
    as="RouterLink"
    :to="to"
  >
    <template #left-icon><slot name="left-icon"></slot></template>
    <template #default><slot></slot></template>
    <template #right-icon><slot name="right-icon"></slot></template>
  </NhButton>
</template>

<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';
import NhButton, { type NhButtonProps } from './NhButton.vue';

export interface NhLinkButtonProps extends Omit<NhButtonProps, 'as'> {
  to: RouteLocationRaw;
}
const allProps = defineProps<NhLinkButtonProps>();
defineSlots<{
  default: {};
  'right-icon': {};
  'left-icon': {};
}>();
</script>
