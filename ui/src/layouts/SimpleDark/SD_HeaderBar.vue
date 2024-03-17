<template>
  <div
    :class="[
      'flex flex-1 items-center justify-between fixed inset-0',
      'px-4 sm:px-6 lg:px-8 h-14 z-[200] shadow-xl',
      'bg-gradient-to-b from-nh-chalet-green-400 to-nh-chalet-green-600',
    ]"
  >
    <div class="flex items-center">
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
      <div class="hidden sm:ml-6 sm:block">
        <div class="flex space-x-4">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <NoodleLink
            v-for="(it, i) in dashboardStore.primaryItemList"
            :key="`${it.id}-${i}`"
            :to="it.to"
            :exact-active-class="
              it.useExactActiveClass ? 'exact-active:bg-nh-chalet-green-600' : undefined
            "
            :active-class="it.useActiveClass ? 'just-active:bg-nh-chalet-green-600' : undefined"
            @click="it.click"
            >{{ it.label }}</NoodleLink
          >
        </div>
      </div>
    </div>
    <div
      v-if="onNotificationsClick"
      class="hidden sm:ml-6 sm:block"
    >
      <div class="flex items-center">
        <button
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
    <div class="-mr-2 flex sm:hidden">
      <!-- Mobile menu button -->
      <MenuButton
        :class="[
          'relative inline-flex items-center justify-center rounded-md p-2',
          'hover:text-nh-chalet-green-200',
          'focus:text-nh-chalet-green-200 focus:ring-2 focus:ring-nh-chalet-green-200',
          isSidebarOpen ? 'text-nh-chalet-green-300' : 'text-nh-chalet-green-700',
        ]"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        <span class="absolute -inset-0.5" />
        <span class="sr-only">Open main menu</span>

        <component
          :is="!isSidebarOpen ? Bars3Icon : XMarkIcon"
          class="block h-6 w-6"
          aria-hidden="true"
        />
      </MenuButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import NoodleLink from '@/components/NoodleLink.vue';
import { RouteName } from '@/router/RouteName';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import { BellIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProfileDropMenu from '../ProfileDropMenu.vue';
import { MenuButton } from '@headlessui/vue';

export interface SD_HeaderBarProps {
  onClose?: Function;
  onNotificationsClick?: Function;
}
defineProps<SD_HeaderBarProps>();
defineEmits<{
  close: [];
  'notifications-click': [];
}>();

const route = useRoute();
const router = useRouter();
const dashboardStore = useDashboardStore();
const { isSidebarOpen } = storeToRefs(dashboardStore);

const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}
</script>
