<template>
  <Menu
    v-slot="{ open }"
    as="div"
    :class="[
      'noodle-house-layout-mf',
      'relative flex flex-col flex-1 h-full overflow-hidden',
      'bg-nh-bourbon-100',
    ]"
  >
    <MF_Header
      :open="open"
      @left-icon-click="$router.push({ name: RouteName.HOME })"
    >
      <template #right-side>
        <MenuButton>
          <Bars3Icon class="md:hidden h-7 w-7" />
        </MenuButton>
      </template>
    </MF_Header>

    <FadeInAppear>
      <div class="" />
    </FadeInAppear>

    <FadeSlideDown>
      <MF_HeaderMenu />
    </FadeSlideDown>

    <!-- The body and content below, with same header-margin above for spacer. -->
    <main
      :class="[
        'nhl-mf-body flex flex-col w-full h-full px-2 pt-4 pb-8',
        open ? 'overflow-y-hidden' : 'overflow-y-auto',
      ]"
    >
      <RouterView />
    </main>
  </Menu>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/RouteName';
import { Menu, MenuButton } from '@headlessui/vue';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import MF_Header from './MF_Header.vue';
import MF_HeaderMenu from './MF_HeaderMenu.vue';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import FadeInAppear from '@/components/transitions/FadeInAppear.vue';
</script>
