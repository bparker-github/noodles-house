<template>
  <div :class="['noodle-house-layout-mf', 'relative flex flex-col flex-1 h-full overflow-hidden']">
    <!-- The header itself - bind attributes to this element. -->
    <header
      v-bind="$attrs"
      :class="[
        'mf-header',
        'fixed h-12 left-0 top-0 right-0 bg-nh-chalet-green-400 text-nh-chalet-green-50',
        'flex flex-row w-full items-center justify-between',
        'gap-x-2 p-2 shadow-md',
      ]"
    >
      <!-- The home icon or placeholder -->
      <div class="mf-header-left-side w-8">
        <NoodleIconSvg
          class="text-nh-bourbon w-10 h-10"
          @click="clickHomeIcon"
        />
      </div>

      <!-- The title of the page/header -->
      <h1 class="the-title font-medium tracking-wide text-2xl px-4">
        {{ $route.name }}
      </h1>

      <!-- The profile status/spinner -->
      <div class="nh-header-profile w-8 flex justify-end">
        <QuestionMarkCircleIcon
          v-if="!curUser && !isFetching"
          @click="nativeAuth.doFetch(true)"
          class="w-6 h-6"
        />
        <LoadingSpinner
          v-else-if="isFetching"
          class="w-6 h-6"
        />
        <UserIcon
          v-else
          class="w-6 h-6"
        />
      </div>
    </header>

    <!-- The body and content below, with same header-margin above for spacer. -->
    <main class="nhl-mf-body flex flex-col w-full h-full mt-12 p-2 pt-4 bg-nh-bourbon-100">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NoodleIconSvg from '@/assets/NoodleIcon.svg';
import { useNativeAuth } from '@/auth/useNativeAuth';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { RouteName } from '@/router/RouteName';
import { QuestionMarkCircleIcon, UserIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

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
