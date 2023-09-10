<template>
  <img
    :src="imageUrl"
    alt="Gay"
    class="h-full w-full object-cover object-center"
  />
</template>

<script lang="ts">
export interface UnsplashImageProps {
  photoId: string;
}
</script>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useUnsplash } from '@/core';
import { onMounted } from 'vue';

const unsplashApi = useUnsplash();
const props = defineProps<UnsplashImageProps>();
const propPhotoId = toRef(props, 'photoId');

const imageUrl = ref('');

onMounted(() => {
  unsplashApi
    .getPhoto(propPhotoId.value)
    .then((resp) => (imageUrl.value = resp?.urls.full ?? imageUrl.value));
});
</script>
