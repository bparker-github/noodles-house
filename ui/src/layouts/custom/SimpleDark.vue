<template>
  <div class="simple-dark-layout flex flex-col flex-1 min-h-0">
    <Disclosure
      v-slot="{ open, close }"
      as="template"
      :default-open="isOpen"
    >
      <nav
        :class="[
          'text-nh-chalet-green-50 fixed inset-0 z-[100] bg-nh-gray-blue/50',
          { 'h-14': !open },
        ]"
      >
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
                    v-for="(it, i) in getItemsWithClose(close).primaryItemList"
                    :key="`${it.id}-${i}`"
                    :to="it.to"
                    :exact-active-class="
                      'exact-active:' + it.useExactActiveClass
                        ? 'bg-nh-chalet-green-600'
                        : undefined
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
                <ProfileDropMenu :items="getItemsWithClose(close).userItemList" />
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
                  :is="!open ? Bars3Icon : XMarkIcon"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <!-- The Mobile Dropdown Section - MAIN USE -->
        <FadeSlideDown>
          <DisclosurePanel
            v-if="isOpen"
            :static="true"
            :class="['sm:hidden z-[100] shadow-xl', 'bg-nh-chalet-green-500']"
          >
            <!-- Main Heading Items -->
            <div class="space-y-1 p-2">
              <DisclosureButton
                v-for="(it, i) in getItemsWithClose(close).primaryItemList"
                :as="RouterLink"
                :key="`${it.id ?? it.label}-${i}`"
                :to="it.to"
                :exact-active-class="
                  normalizeClass([
                    'exact-active',
                    { 'bg-nh-chalet-green-600': it.useExactActiveClass },
                  ])
                "
                :active-class="
                  normalizeClass([
                    'just-active',
                    { 'bg-nh-chalet-green-600': !it.useExactActiveClass },
                  ])
                "
                :class="[
                  'block rounded-md px-3 py-2 text-base font-medium',
                  'text-nh-whiteish hover:text-nh-chalet-green-200 hover:bg-nh-chalet-green-700 hover:shadow-inner',
                  'nh-focus-chalet-green-inv',
                ]"
                @click="it.click"
                >{{ it.label }}</DisclosureButton
              >
            </div>

            <div
              :class="[
                'pb-2 bg-gradient-to-t from-nh-chalet-green-400 to-nh-chalet-green-600',
                'border-b-2 border-nh-chalet-green-300',
              ]"
            >
              <!-- User Profile section bar w/ profile pic and notifications -->
              <div
                :class="[
                  'user-profile-card flex items-center p-3',
                  'bg-nh-chalet-green-600 shadow-inner',
                ]"
              >
                <!-- Possible profile image -->
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
                <!-- Profile name and id -->
                <div class="ml-3">
                  <div class="text-base font-medium text-nh-chalet-green-100">
                    {{ myFullName ?? curUser?.clientPrincipal.userId }}
                  </div>
                  <div class="text-sm font-medium text-nh-chalet-green-200">
                    {{ curUser?.clientPrincipal.userDetails }}
                  </div>
                </div>
                <!-- Notifications button -->
                <button
                  type="button"
                  :class="[
                    'relative ml-auto flex-shrink-0 rounded-full bg-nh-chalet-green-800 p-1 text-nh-whiteish hover:text-white',
                    'nh-focus-chalet-green',
                  ]"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <!-- Bottom User items -->
              <div
                :class="[
                  'flex flex-col flex-1 space-y-1 px-2',
                  'bg-gradient-to-t from-nh-chalet-green-400 to-nh-chalet-green-600',
                ]"
              >
                <DisclosureButton
                  v-for="(it, i) in getItemsWithClose(close).userItemList"
                  as="template"
                  :key="`${it.id}-${i}`"
                >
                  <SingleItem
                    class="nh-focus-chalet-green-inv"
                    :item="it"
                    :exact-active-class="
                      normalizeClass([
                        'exact-active',
                        { 'bg-nh-chalet-green-700': it.useExactActiveClass },
                      ])
                    "
                    :active-class="
                      normalizeClass([
                        'just-active',
                        { 'bg-nh-chalet-green-700': !it.useExactActiveClass },
                      ])
                    "
                  />
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </FadeSlideDown>
      </nav>
    </Disclosure>

    <main
      :class="[
        'simple-dark-main mt-14 pt-2 bg-nh-whiteish relative',
        'overflow-y-auto h-full max-h-full',
      ]"
    >
      <PageSpinner
        v-if="isRouting"
        title="Loading Page..."
      />
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { useNativeAuth } from '@/auth/useNativeAuth';
import SingleItem from '@/components/ItemList/SingleItem.vue';
import NoodleLink from '@/components/NoodleLink.vue';
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { userSettingsRepository } from '@/repos/user-settings';
import { RouteName } from '@/router/RouteName';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import ProfileDropMenu from './ProfileDropMenu.vue';
import { normalizeClass } from 'vue';

export interface SimpleDarkProps {
  onNotificationsClick?: Function;
}
defineProps<SimpleDarkProps>();
defineEmits<{ 'notifications-click': [] }>();

const route = useRoute();
const router = useRouter();

const dashboardStore = useDashboardStore();
const { isOpen } = storeToRefs(dashboardStore);
const getItemsWithClose = (close: () => void) =>
  dashboardStore.getItemsWithClick(() => {
    isOpen.value = false;
    close?.();
  });

const authStore = useNativeAuth();
const { curUser } = storeToRefs(authStore);

const userSettingsRepo = userSettingsRepository();
const { myUserSettings, myFullName } = storeToRefs(userSettingsRepo);

const isRouting = ref(false);

const canClickHomeIcon = computed(() => route.name !== RouteName.HOME);

function handleIconClick() {
  // Don't duplicate navigate.
  if (!canClickHomeIcon.value) {
    return;
  }

  router.push({ name: RouteName.HOME });
}

// Set up page loading on page navigation
onMounted(() => {
  router.beforeEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
      isRouting.value = true;
    }
  });
  router.afterEach(() => (isRouting.value = false));
});
</script>
