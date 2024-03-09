<template>
  <Menu
    as="div"
    class="simple-dark-layout flex flex-col flex-1 min-h-0"
  >
    <HeaderBar @notifications-click="$emit('notifications-click')" />

    <!-- Mobile Menu first, at root level -->
    <div
      show="isSidebarOpen"
      class="mobile-menu fixed inset-0 top-14 z-10"
    >
      <!-- The background -->
      <FadeInAppear>
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 bg-black/25"
        />
      </FadeInAppear>

      <FadeSlideDown>
        <div
          v-show="isSidebarOpen"
          class="absolute left-0 right-0 flex flex-col flex-1 bg-nh-chalet-green-500 duration-1000"
        >
          <MenuItems :static="true">
            <!-- Main Heading Items -->
            <ExpandableMenuSection />

            <!-- The user's profile badge with pic and notifications, and profile menu items below -->
            <ProfileMenuData />
          </MenuItems>
        </div>
      </FadeSlideDown>
    </div>

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
  </Menu>
</template>

<script setup lang="ts">
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import FadeInAppear from '@/components/transitions/FadeInAppear.vue';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Dialog, DialogPanel, Menu, MenuItems } from '@headlessui/vue';
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

const isRouting = ref(false);
const { isSidebarOpen } = storeToRefs(useDashboardStore());

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
