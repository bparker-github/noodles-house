<template>
  <Menu
    v-slot="{ open }"
    as="div"
    :class="[
      'noodle-house-layout-mf',
      'relative flex flex-col flex-1 h-full overflow-hidden',
      'bg-nh-bourbon-100 z-10',
    ]"
  >
    <MF_Header :open="open">
      <template #right-side>
        <MenuButton>
          <Bars3Icon class="md:hidden h-7 w-7" />
        </MenuButton>
      </template>
    </MF_Header>

    <transition
      enter-active-class="motion-safe:transition duration-200 ease-out"
      enter-from-class="-translate-y-8 opacity-0"
      leave-active-class="motion-safe:transition duration-200 ease-in"
      leave-to-class="-translate-y-8 opacity-0"
    >
      <MF_HeaderMenu />
    </transition>

    <!-- The body and content below, with same header-margin above for spacer. -->
    <main class="nhl-mf-body flex flex-col w-full h-full mt-12 p-2 pt-4">
      <RouterView />
    </main>
  </Menu>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import { RouteName } from '@/router/RouteName';
import { Menu, MenuButton } from '@headlessui/vue';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import MF_Header from './MF_Header.vue';
import MF_HeaderMenu from './MF_HeaderMenu.vue';

const nativeAuth = useNativeAuth();
const { curUser, isFetching, isFinished, fetchError } = storeToRefs(nativeAuth);

const route = useRoute();
const router = useRouter();

function clickHomeIcon() {
  if (route.name === RouteName.HOME) {
    console.log('Already Home');
  }

  console.log('Going Home');
  router.push({ name: RouteName.HOME });
}
</script>
