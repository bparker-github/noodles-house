<template>
  <img
    :src="imageUrl"
    alt="Gay"
    class="h-full w-full object-cover object-center"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import { useUnsplash } from '../stores/unsplashStores';

interface UnsplashImageProps {
  photoId: string;
}

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
