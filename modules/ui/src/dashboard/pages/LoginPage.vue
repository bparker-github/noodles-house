<template>
  <div class="flex h-full flex-col items-center justify-evenly">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <div class="relative overflow-hidden rounded-lg">
        <div class="absolute inset-0">
          <UnsplashImage :photo-id="photoId" />
        </div>
        <div
          class="bg-gray-pink relative bg-opacity-50 px-4 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
        >
          <div class="relative flex max-w-3xl flex-col items-center text-center">
            <h2 class="text-whiteish text-3xl font-bold tracking-tight sm:text-4xl">
              <span class="block pr-2 sm:inline">Welcome</span>
              <span class="block sm:inline">Home!</span>
            </h2>
            <p class="text-whiteish my-2 text-xl">
              {{ loremIpsum({ count: 5, units: 'sentence' }) }}
            </p>
            <button
              @click.prevent="beginLogin"
              :class="[
                'sm:w-50p mt-8 block w-full rounded-md px-8 py-3 md:w-auto',
                'text-bourbon-800 hover:bg-bourbon-100 border border-transparent bg-white text-base font-medium',
              ]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@nh/shared';
import { UnsplashImage } from '@ui-common';
import { loremIpsum } from 'lorem-ipsum';
import { useRouter } from 'vue-router';
import { RouteName } from '../router/RouteName';

const photoId = 'W7cPLHOa0eQ';
const authStore = useAuthStore();
const router = useRouter();

async function beginLogin() {
  try {
    await authStore.doLogin();
    router.push({ name: RouteName.HOME });
  } catch (err) {
    console.warn('Somehow error?:', err);
  }
}
</script>
