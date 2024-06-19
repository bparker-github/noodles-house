<template>
  <transition
    :class="['motion-safe:transform transition', { 'duration-200': !hasDurationClass }]"
    enter-active-class="ease-out"
    enter-from-class="-translate-y-8 opacity-0"
    leave-active-class="ease-in"
    leave-to-class="-translate-y-8 opacity-0"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { useClassDetect } from '@/lib';

const hasDurationClass = useClassDetect(/duration-/g);
</script>
