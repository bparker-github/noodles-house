<template>
  <header :class="['stacked-overlap-header-row', 'fixed flex flex-1']">
    <!-- Left side -->
    <div class="left-side">
      <NoodleIconSvg />
    </div>

    <!-- Main, center, growing -->
    <div class="main-center">Main Center</div>

    <!-- Right side -->
    <div class="right-side">Right side.</div>
  </header>
</template>

<script setup lang="ts"></script>
