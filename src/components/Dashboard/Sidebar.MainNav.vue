<template>
  <nav class="flex flex-1 flex-col">
    <ul
      role="list"
      class="flex flex-1 flex-col gap-y-7"
    >
      <li>
        <NavigationList />
      </li>
      <li>
        <SecondaryList />
      </li>
      <li>
        <slot name="third-item"></slot>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import NavigationList from './NavigationList.vue';
import SecondaryList from './SecondaryList.vue';
</script>
