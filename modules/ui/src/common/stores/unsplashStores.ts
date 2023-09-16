import { defineStore } from 'pinia';
import { createApi } from 'unsplash-js';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { ref } from 'vue';
import { doGetOrThrow, useUnsplashApi } from '@shared';

export const useUnsplash = defineStore('unsplash', () => {
  const accessKey = doGetOrThrow(
    () => import.meta.env.NOOD_UNSPLASH_ACCESS_KEY,
    'Missing Unsplash Access Key'
  );

  const unsplashApi = ref(useUnsplashApi('ui', accessKey));

  async function getPhoto(id: string = 'W7cPLHOa0eQ'): Promise<Full | null> {
    try {
      const photoResp = await unsplashApi.value.photos.get({ photoId: id });

      if (photoResp.type === 'error') {
        console.error('Failed fetching data from Unsplash:', photoResp.errors);
        return null;
      }

      return photoResp.response;
    } catch (err) {
      console.error('Error fetching data from Unsplash:', err);
      return null;
    }
  }

  return {
    getPhoto,
  };
});
