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
      <!-- The back button or placeholder -->
      <div class="mf-header-left-side w-8">
        <ArrowLeftIcon
          v-if="canGoBack"
          class="text-nh-bourbon w-8 h-8"
          @click="goBack"
        />
      </div>

      <!-- The title of the page/header -->
      <h1 class="the-title font-medium tracking-wide text-xl px-4">
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
      <div class="body-temp flex flex-col w-full overflow-hidden">
        <pre
          class="p-2 bg-nh-off-yellow-50 rounded-md shadow-inner-lg overflow-x-auto border border-nh-bourbon-950/25"
          style="clip-path: view-box"
        ><code class="font-mono text-nh-bourbon-950">{{ JSON.stringify(curUser, null, 2) }}</code></pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { QuestionMarkCircleIcon, UserIcon } from '@heroicons/vue/24/outline';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount } from 'vue';
import { ref } from 'vue';

const nativeAuth = useNativeAuth();
const { curUser, isFetching, isFinished, fetchError } = storeToRefs(nativeAuth);

const canGoBack = ref(true);
const goBackRef = ref<NodeJS.Timeout | undefined>();
function goBack() {
  canGoBack.value = false;
  setTimeout(() => (canGoBack.value = true), 2000);
}

onBeforeUnmount(() => {
  if (goBackRef.value) {
    clearTimeout(goBackRef.value);
  }
});
</script>
