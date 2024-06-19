<template>
  <component
    :is="canClickHomeIcon ? 'button' : 'div'"
    :class="[
      'flex-shrink-0 p-1 rounded-md',
      canClickHomeIcon ? 'cursor-pointer nh-focus-chalet-green' : 'pointer-events-none',
    ]"
    @click="handleIconClick"
  >
    <NoodleIconSvg
      title="Noodle's House"
      class="text-nh-bourbon w-8 h-8"
      aria-label="Noodle's House Logo. Click to navigate Home."
    />
  </component>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { RouteName } from '@/router/RouteName';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}
</script>
