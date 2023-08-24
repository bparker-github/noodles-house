<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <slot name="title">
          {{ title ?? 'Missing title prop' }}
        </slot>
      </h2>
      <div class="mt-10 flex items-center gap-x-6">
        <component
          v-if="primaryLink || primaryClick"
          :is="!!primaryLink ? RouterLink : 'button'"
          :to="primaryLink"
          class="rounded-md pointer-cursor bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="primaryClick"
        >
          {{ primaryText ?? 'Missing primary text.' }}
        </component>
        <component
          v-if="secondaryLink || secondaryClick"
          :is="!!secondaryLink ? RouterLink : 'button'"
          :to="secondaryLink"
          class="text-sm font-semibold leading-6 text-gray-900 pointer-cursor"
          @click="secondaryClick"
        >
          {{ secondaryText ?? 'Missing secondary text.' }}
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface StackedCtaProps {
  title?: string;

  primaryText?: string;
  primaryLink?: string;
  primaryClick?: () => void;

  secondaryText?: string;
  secondaryLink?: string;
  secondaryClick?: () => void;
}
defineProps<StackedCtaProps>();
defineSlots<{ title?: void }>();
</script>
