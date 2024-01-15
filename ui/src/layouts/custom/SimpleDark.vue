<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="text-nh-chalet-green-50"
  >
    <div
      :class="[
        'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        'bg-gradient-to-b from-nh-chalet-green-400 to-nh-chalet-green-600',
        'shadow-xl fixed inset-0 h-16 z-[999]',
      ]"
    >
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div
            :class="['flex-shrink-0', canClickHomeIcon ? 'cursor-pointer' : 'pointer-events-none']"
            @click="handleIconClick"
          >
            <NoodleIconSvg
              title="Noodle's House"
              class="text-nh-bourbon w-9 h-9"
              aria-label="Noodle's House Logo. Click to navigate Home."
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <NoodleLink
                v-for="(it, i) in primaryItemList"
                :key="`${it.id}-${i}`"
                :to="it.to"
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
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
            <ProfileDropMenu :items="userItemList" />
          </div>
        </div>
        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <component
              :is="!open ? Bars3Icon : XMarkIcon"
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <FadeSlideDown>
      <DisclosurePanel :class="['sm:hidden mt-16 bg-nh-chalet-green-400']">
        <div class="space-y-1 p-2">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <DisclosureButton
            v-for="(it, i) in primaryItemList"
            :as="RouterLink"
            :key="`${it.id}-${i}`"
            :to="it.to"
            :class="[
              'block rounded-md px-3 py-2 text-base font-medium',
              'text-nh-whiteish hover:text-nh-chalet-green-200 hover:bg-nh-chalet-green-500 hover:shadow-inner',
            ]"
            @click="it.click"
            >{{ it.label }}</DisclosureButton
          >
        </div>
        <div :class="['pb-2 bg-gradient-to-t from-nh-chalet-green-400 to-nh-chalet-green-600']">
          <div
            :class="[
              'user-profile-card flex items-center p-3',
              'bg-nh-chalet-green-500/70 shadow-inner',
            ]"
          >
            <div
              v-if="myUserSettings?.profileLink"
              class="flex-shrink-0"
            >
              <img
                class="h-10 w-10 rounded-full"
                :src="myUserSettings.profileLink"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-nh-chalet-green-100">
                {{ myFullName ?? curUser?.clientPrincipal.userId }}
              </div>
              <div class="text-sm font-medium text-nh-chalet-green-200">
                {{ curUser?.clientPrincipal.userDetails }}
              </div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-nh-chalet-green-800 p-1 text-nh-whiteish hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-nh-chalet-green-900/70"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="(it, i) in userItemList"
              as="template"
              :key="`${it.id}-${i}`"
            >
              <SingleItem :item="it" />
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </FadeSlideDown>
  </Disclosure>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { useNativeAuth } from '@/auth/useNativeAuth';
import SingleItem from '@/components/ItemList/SingleItem.vue';
import NoodleLink from '@/components/NoodleLink.vue';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { userSettingsRepository } from '@/repos/user-settings';
import { RouteName } from '@/router/RouteName';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import ProfileDropMenu from './ProfileDropMenu.vue';

export interface SimpleDarkProps {
  onNotificationsClick?: Function;
}
defineProps<SimpleDarkProps>();
defineEmits<{ 'notifications-click': [] }>();

const route = useRoute();
const router = useRouter();
const dashboardStore = useDashboardStore();
const { primaryItemList, userItemList } = dashboardStore;
const { curUser } = storeToRefs(useNativeAuth());
const userSettingsRepo = userSettingsRepository();
const { myUserSettings, myFullName } = storeToRefs(userSettingsRepo);

const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}
</script>
