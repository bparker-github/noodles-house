import { doGetOrThrow, useUnsplashApi, type UnsplashApi } from '@/lib';
import { defineStore } from 'pinia';
import type { ApiResponse } from 'unsplash-js/dist/helpers/response';
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
  const unsplashAccessKey = import.meta?.env?.NOOD_UNSPLASH_ACCESS_KEY ?? '';

  // If we have the access key, we can make the secondary API.
  const unsplashApi = ref(useUnsplashApi('ui', unsplashUrl));
  const backupApi = ref(useUnsplashApi('api', unsplashAccessKey));

  // Keep a cache of these images.
  const cache = ref<Record<string, Full>>({});
  const didLocalApiFail = ref(false);

  const getDataFromCache = (id: string): Full | null =>
    id in cache.value ? cache.value[id] : null;
  const getDataFromApi = (api: UnsplashApi, id: string): Promise<ApiResponse<Full>> =>
    api.photos
      .get({ photoId: id })
      // @ts-expect-error - it doesn't fulfill all properties, but we only utilize these two.
      .catch((e) => ({ type: 'error', errors: [e] }) as ApiResponse<Full>);

  async function getPhoto(id: string = 'W7cPLHOa0eQ'): Promise<Full | null> {
    try {
      // Step one, return if data is in cache already.
      const cached = getDataFromCache(id);
      if (cached) {
        return cached;
      }

      // Make a request to the primary API, iff we haven't deemed it useless.
      if (!didLocalApiFail.value && unsplashApi.value) {
        const primaryResp = await getDataFromApi(unsplashApi.value, id);
        if (primaryResp.type !== 'error') {
          cache.value[id] ??= primaryResp.response;
          return primaryResp.response;
        }
        console.error(`Unsplash API Error: ${primaryResp.errors}`);
      }

      // Make a request to the backup API, iff we are allowed and able to.
      if (import.meta.env.DEV && unsplashAccessKey && backupApi.value) {
        const backupResp = await getDataFromApi(backupApi.value, id);
        if (backupResp.type !== 'error') {
          cache.value[id] ??= backupResp.response;
          return backupResp.response;
        }
        console.error(`Unsplash Backup API Error: ${backupResp.errors}`);
      }

      return null;
    } catch (err) {
      console.error('Unsplash image fetching error:');
      throw err;
    }
  }

  return {
    getPhoto,
  };
});
