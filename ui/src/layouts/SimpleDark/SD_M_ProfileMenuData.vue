<template>
  <div
    :class="[
      'pb-2 bg-gradient-to-t from-nh-chalet-green-400 to-nh-chalet-green-600',
      'border-b-2 border-nh-chalet-green-300',
    ]"
  >
    <!-- User Profile section bar w/ profile pic and notifications -->
    <div
      :class="['user-profile-card flex items-center p-3', 'bg-nh-chalet-green-600 shadow-inner']"
    >
      <!-- Possible profile image -->
      <div
        v-if="myUserSettings?.profileImageUrl"
        class="flex-shrink-0"
      >
        <img
          class="h-10 w-10 rounded-full"
          :src="myUserSettings.profileImageUrl"
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
        @click="authStore.doFetch(true)"
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
      <MenuItem
        v-for="(it, i) in userItemList"
        as="template"
        :key="`${it.id}-${i}`"
      >
        <SingleItem
          class="nh-focus-chalet-green-inv"
          :item="it"
          :exact-active-class="
            normalizeClass(['exact-active', { 'bg-nh-chalet-green-700': it.useExactActiveClass }])
          "
          :active-class="
            normalizeClass(['just-active', { 'bg-nh-chalet-green-700': !it.useExactActiveClass }])
          "
        />
      </MenuItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import SingleItem from '@/components/ItemList/SingleItem.vue';
import { userSettingsRepository } from '@/repos/user-settings';
import { useDashboardStore } from '@/stores/dashboardStore';
import { MenuItem } from '@headlessui/vue';
import { BellIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { normalizeClass } from 'vue';

const authStore = useNativeAuth();
const { curUser } = storeToRefs(authStore);

const { userItemList } = useDashboardStore();

const userSettingsRepo = userSettingsRepository();
const { myUserSettings, myFullName } = storeToRefs(userSettingsRepo);
</script>
