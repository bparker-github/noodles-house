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
        <HeaderBar
          v-bind="getItemsWithClose(close)"
          @notifications-click="$emit('notifications-click')"
        />

        <!-- The Mobile Dropdown Section - MAIN USE -->
        <FadeSlideDown>
          <DisclosurePanel
            v-if="isOpen"
            :static="true"
            :class="['sm:hidden z-[100] shadow-xl', 'bg-nh-chalet-green-500']"
          >
            <!-- Main Heading Items -->
            <ExpandableMenuSection :items="getItemsWithClose(close).primaryItems" />

            <!-- The user's profile badge with pic and notifications, and profile menu items below -->
            <ProfileMenuData :items="getItemsWithClose(close).userItems" />
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
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Disclosure, DisclosurePanel } from '@headlessui/vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderBar from './SD_HeaderBar.vue';
import ExpandableMenuSection from './SD_M_ExpandableMenuSection.vue';
import ProfileMenuData from './SD_M_ProfileMenuData.vue';

export interface SimpleDarkProps {
  onNotificationsClick?: Function;
}
defineProps<SimpleDarkProps>();
defineEmits<{ 'notifications-click': [] }>();

const router = useRouter();

const dashboardStore = useDashboardStore();
const { isOpen } = storeToRefs(dashboardStore);
const getItemsWithClose = (close: () => void) =>
  dashboardStore.getItemsWithClick(() => {
    isOpen.value = false;
    close?.();
  });

const isRouting = ref(false);

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
