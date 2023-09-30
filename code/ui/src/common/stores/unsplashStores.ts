import { doGetOrThrow, useUnsplashApi, type UnsplashApi } from '@noodles-house/common';
import { defineStore } from 'pinia';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { ref } from 'vue';

/**
 * The Unsplash remote API will be used as priority.
 *  - This makes the same requests to our internal API with our auth, and no access key.
 * Secondarily, if API is down, and we have the AccessKey provided, we'll make the UI request ourselves.
 *  - This goes against their API guidelines, but should only be present locally or if the API is down
 *  - The Access key won't be provided in the UI build once it's public facing.
 */

export const useUnsplash = defineStore('unsplash', () => {
  const unsplashUrl = doGetOrThrow(
    () => import.meta.env.NOOD_API_URL + '/unsplash',
    'Missing Api URL'
  );
  const unsplashAccessKey = doGetOrThrow(
    () => import.meta?.env?.NOOD_UNSPLASH_ACCESS_KEY ?? '',
    `-- shouldn't error --`
  );

  // If we have the access key, we can make the secondary API.
  const unsplashApi = ref(useUnsplashApi('ui', unsplashUrl));
  const backupApi = ref(useUnsplashApi('api', unsplashAccessKey));

  async function handlePhotoResponse(api: UnsplashApi, photoId: string): Promise<Full | null> {
    try {
      const resp = await api.photos.get({ photoId });

      if (!resp || resp.type === 'error') {
        console.error('Failed fetching data from Unsplash:', resp.errors);
        return null;
      }
      return resp.response;
    } catch (err) {
      console.error('Error fetching data from our UnsplashApi:', err);
      return null;
    }
  }
  async function getPhoto(id: string = 'W7cPLHOa0eQ'): Promise<Full | null> {
    let resp = await handlePhotoResponse(unsplashApi.value, id);
    if (!resp && unsplashAccessKey && backupApi.value) {
      resp = await handlePhotoResponse(backupApi.value, id);
    }
    return resp;
  }

  return {
    getPhoto,
  };
});
