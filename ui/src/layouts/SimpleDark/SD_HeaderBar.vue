<template>
  <div
    :class="[
      'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      'bg-gradient-to-b from-nh-chalet-green-400 to-nh-chalet-green-600',
      'shadow-xl h-14 relative z-[200]',
    ]"
  >
    <div class="flex h-14 items-center justify-between">
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
              v-for="(it, i) in primaryItems"
              :key="`${it.id}-${i}`"
              :to="it.to"
              :exact-active-class="
                'exact-active:' + it.useExactActiveClass ? 'bg-nh-chalet-green-600' : undefined
              "
              :active-class="
                'just-active:' + it.useExactActiveClass ? undefined : 'bg-nh-chalet-green-600'
              "
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
          <ProfileDropMenu :items="userItems" />
        </div>
      </div>
      <div class="-mr-2 flex sm:hidden">
        <!-- Mobile menu button -->
        <DisclosureButton
          :class="[
            'relative inline-flex items-center justify-center rounded-md p-2 hover:text-white',
            'nh-focus-chalet-green',
          ]"
          @click="isOpen = !isOpen"
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <component
            :is="!isOpen ? Bars3Icon : XMarkIcon"
            class="block h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { ListItem } from '@/components/ItemList';
import NoodleLink from '@/components/NoodleLink.vue';
import { RouteName } from '@/router/RouteName';
import { useDashboardStore } from '@/stores/dashboardStore';
import { DisclosureButton } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import { BellIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProfileDropMenu from '../ProfileDropMenu.vue';

export interface SD_HeaderBarProps {
  primaryItems: ListItem[];
  secondaryItems: ListItem[];
  userItems: ListItem[];
  onNotificationsClick?: Function;
}
defineProps<SD_HeaderBarProps>();
defineEmits<{ 'notifications-click': [] }>();

const route = useRoute();
const router = useRouter();
const dashboardStore = useDashboardStore();
const { isOpen } = storeToRefs(dashboardStore);

const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}
</script>
