<template>
  <div :class="['noodle-house-layout-mf', 'relative flex flex-col flex-1 h-full overflow-hidden']">
    <!-- The header itself - bind attributes to this element. -->
    <header
      v-bind="$attrs"
      :class="[
        'mf-header',
        'fixed h-12 left-0 top-0 right-0 bg-nh-chalet-green-400 text-nh-chalet-green-50',
        'flex flex-row w-full items-center justify-between',
      ]"
    >
      <!-- The title of the page/header -->
      <h1 class="the-title font-medium tracking-wide text-xl px-4">
        {{ $route.name }}
      </h1>

      <!-- The profile status/spinner -->
      <div class="nh-header-profile p-2">
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
    <main class="nhl-mf-body flex flex-col w-full h-full mt-12 p-2">
      <RouterView />
      <div class="body-temp flex flex-col w-full">
        <code>{{ JSON.stringify(curUser, null, 2) }}</code>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { QuestionMarkCircleIcon, UserIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';

const nativeAuth = useNativeAuth();
const { curUser, isFetching, isFinished, fetchError } = storeToRefs(nativeAuth);
</script>
