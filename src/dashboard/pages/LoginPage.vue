<template>
  <div class="flex flex-col items-center justify-evenly">
    <NoodleIconFlat class="duo-empress-950 duo2-bourbon-300 mt-10 h-10 w-20" />
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="relative overflow-hidden rounded-lg">
        <div class="absolute inset-0">
          <img
            :src="imgUrl"
            alt="Gay"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="bg-gray-900 relative bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 class="text-white text-3xl font-bold tracking-tight sm:text-4xl">
              <span class="mr-2 block sm:inline">Level up</span>
              <span class="block sm:inline">your desk</span>
            </h2>
            <p class="text-white mt-3 text-xl">
              Make your desk beautiful and organized. Post a picture to social media and watch it
              get more likes than life-changing announcements. Reflect on the shallow nature of
              existence. At least you have a really nice desk setup.
            </p>
            <a
              href="#"
              class="border-transparent bg-white text-gray-900 hover:bg-gray-100 mt-8 block w-full rounded-md border px-8 py-3 text-base font-medium sm:w-auto"
            >
              Shop Workspace
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NoodleIconFlat } from '@/core';
import { createApi } from 'unsplash-js';
import { ref } from 'vue';

const imgUrl = ref('');

const unsplashApi = createApi({
  accessKey: import.meta.env.NOOD_UNSPLASH_ACCESS_KEY,
});

async function initPhoto() {
  const resp = await unsplashApi.photos.get({ photoId: 'W7cPLHOa0eQ' });

  if (resp.errors) {
    console.error('Unsplash error:', resp.errors);
    return;
  }

  imgUrl.value = resp.response.urls.full;
}

initPhoto();
</script>
