<template>
  <div class="landing-page flex flex-col flex-1 w-full h-full">
    <UnsplashImage
      id="W7cPLHOa0eQ"
      class="shadow-lg flex flex-col flex-1 m-3"
      shared-class="flex flex-col flex-1 items-center justify-center rounded-md"
      credit-class="text-nh-whiteish rounded-b-md"
    >
      <div
        :class="[
          'landing-page-image-content',
          'flex flex-col',
          'prose p-10 text-nh-whiteish bg-nh-bali-hai-500/70',
        ]"
      >
        <h1>Welcome</h1>
        <h2>Noodle's House</h2>

        <p>This is a landing page for the future Noodle's House page.</p>
        <p>Pardon the construction</p>

        <!-- Show the native Apple Login button -->
        <NhLinkButton
          v-if="!isAuthenticated"
          :class="[
            'inline-flex items-center justify-center',
            'h-14 bg-black rounded-md no-underline tracking-wide',
          ]"
          text="Sign in with Apple"
          :to="{ name: RouteName.LOGIN }"
        >
          <template #left-icon>
            <AppleLogoIcon class="text-white" />
          </template>
        </NhLinkButton>

        <NhLinkButton
          v-else
          class="justify-center not-prose"
          text="Go Home"
          :to="{ name: RouteName.HOME }"
        />
      </div>
    </UnsplashImage>
  </div>
</template>

<script setup lang="ts">
import AppleLogoIcon from '@/assets/AppleLogoIcon.svg';
import { UnsplashImage } from '@/lib';
import NhLinkButton from '../basic/NhLinkButton.vue';
import { RouteName } from '@/router/RouteName';
import { storeToRefs } from 'pinia';
import { useNativeAuth } from '@/auth/useNativeAuth';

const { isAuthenticated } = storeToRefs(useNativeAuth());
</script>

<style>
#app {
  @apply bg-nh-bourbon-100;
}
</style>
