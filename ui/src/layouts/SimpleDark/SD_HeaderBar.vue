<template>
  <div
    :class="[
      'flex flex-1 items-center justify-between fixed inset-0',
      'px-4 sm:px-6 lg:px-8 h-14 z-[200] shadow-xl',
      'bg-gradient-to-b from-nh-chalet-green-400 to-nh-chalet-green-600',
    ]"
  >
    <div class="flex items-center justify-left flex-1">
      <!-- Left side Home-Icon -->
      <SDH_HomeIcon />

      <!-- Top-level nav buttons on Desktop -->
      <SDH_D_HeaderNav />
    </div>

    <!-- Middle Main title on Mobile -->
    <div
      v-if="USE_TITLE && $route.name"
      class="flex sm:hidden justify-center flex-[5,5,0]"
    >
      <h3
        :class="[
          'text-2xl font-semibold text-nh-chalet-green-800 leading-6',
          'drop-shadow-custom shadow-nh-chalet-green-400',
        ]"
      >
        {{ $route.name }}
      </h3>
    </div>

    <div class="flex items-center justify-end flex-1">
      <!-- Top-level right-side buttons (notifications, user profile) on Desktop -->
      <SDH_D_RightButtons @notifications-click="$emit('notifications-click')" />

      <!-- Right-side hamburger menu on Mobile -->
      <SDH_M_Hamburger />
    </div>
  </div>
</template>

<script setup lang="ts">
import SDH_D_HeaderNav from './SDH_D_HeaderNav.vue';
import SDH_D_RightButtons from './SDH_D_RightButtons.vue';
import SDH_HomeIcon from './SDH_HomeIcon.vue';
import SDH_M_Hamburger from './SDH_M_Hamburger.vue';

const USE_TITLE = true;

defineProps<{ onNotificationsClick?: Function }>();
defineEmits<{ 'notifications-click': [] }>();
</script>
