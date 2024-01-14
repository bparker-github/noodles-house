<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    :class="[
      'bg-nh-chalet-green-400 text-nh-chalet-green-50',
      'bg-gradient-to-b from-nh-chalet-green-600/50 to-nh-chalet-green-600',
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <DisclosureButton
          v-for="(it, i) in primaryItemList"
          :as="RouterLink"
          :key="`${it.id}-${i}`"
          :to="it.to"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          @click="it.click"
          >{{ it.label }}</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
  </Disclosure>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import ProfileDropMenu from './ProfileDropMenu.vue';
import { ListItem } from '@/components/ItemList';
import { useDashboardStore } from '@/stores/dashboardStore';
import { storeToRefs } from 'pinia';
import SingleItem from '@/components/ItemList/SingleItem.vue';
import { RouteName } from '@/router/RouteName';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import NoodleLink from '@/components/NoodleLink.vue';
import { RouterLink } from 'vue-router';

export interface SimpleDarkProps {
  onNotificationsClick?: Function;
}
defineProps<SimpleDarkProps>();
defineEmits<{ 'notifications-click': [] }>();

const route = useRoute();
const router = useRouter();
const dashboardStore = useDashboardStore();
const { primaryItemList, userItemList } = dashboardStore;

const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}
</script>
