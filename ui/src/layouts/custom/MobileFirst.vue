<template>
  <div :class="['noodle-house-layout-mf', 'relative flex flex-col flex-1 h-full overflow-hidden']">
    <MF_Header />

    <!-- The body and content below, with same header-margin above for spacer. -->
    <main class="nhl-mf-body flex flex-col w-full h-full mt-12 p-2 pt-4 bg-nh-bourbon-100">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { useNativeAuth } from '@/auth/useNativeAuth';
import { RouteName } from '@/router/RouteName';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import MF_Header from './MF_Header.vue';

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
