<template>
  <transition
    :class="['motion-safe:transform transition-opacity', { 'duration-200': !hasDurationClass }]"
    :appear="true"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const hasDurationClass = computed(() => /duration-/g.test(attrs?.['class'] ?? ''));
</script>
