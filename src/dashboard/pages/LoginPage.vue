<template>
  <div class="flex flex-col items-center justify-evenly">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="relative overflow-hidden rounded-lg">
        <div class="absolute inset-0">
          <UnsplashImage :photo-id="photoId" />
        </div>
        <div class="bg-gray-pink relative bg-opacity-50 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 class="text-whiteish text-3xl font-bold tracking-tight sm:text-4xl">
              <span class="mr-2 block sm:inline">Welcome</span>
              <span class="block sm:inline">Home!</span>
            </h2>
            <p class="text-whiteish mt-3 text-xl">
              {{ loremIpsum({ count: 2, units: 'sentence' }) }}
            </p>
            <button
              @click.prevent="beginLogin"
              class="border-transparent bg-white text-gray-900 hover:bg-gray-100 mt-8 block w-full rounded-md border px-8 py-3 text-base font-medium sm:w-auto"
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
import { UnsplashImage, useAuthStore } from '@/core';
import { loremIpsum } from 'lorem-ipsum';
import { useRouter } from 'vue-router';
import { RouteName } from '../router/RouteName';

const photoId = 'W7cPLHOa0eQ';
const authStore = useAuthStore();
const router = useRouter();

async function beginLogin() {
  try {
    await authStore.doLogin();
    router.push(RouteName.HOME);
  } catch (err) {
    console.warn('Somehow error?:', err);
  }
}
</script>
