<template>
  <div class="hidden sm:ml-6 sm:block">
    <div class="flex items-center">
      <button
        v-if="onNotificationsClick"
        type="button"
        :class="[
          'relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white',
          'nh-focus-chalet-green',
        ]"
        @click="$emit('notifications-click')"
      >
        <span class="absolute -inset-1.5" />
        <span class="sr-only">View notifications</span>
        <BellIcon
          class="h-6 w-6"
          aria-hidden="true"
        />
      </button>

      <!-- Profile dropdown -->
      <ProfileDropMenu :items="dashboardStore.userItemList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore';
import { BellIcon } from '@heroicons/vue/20/solid';
import ProfileDropMenu from '../ProfileDropMenu.vue';

defineProps<{ onNotificationsClick?: Function }>();
defineEmits<{ 'notifications-click': [] }>();

const dashboardStore = useDashboardStore();
</script>
