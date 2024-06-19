<template>
  <transition
    :class="[
      'motion-safe:transform transition-opacity ease-in-out',
      { 'duration-200': !hasDurationClass },
    ]"
    :appear="true"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { useClassDetect } from '@/lib';

const hasDurationClass = useClassDetect(/duration-/g);
</script>
