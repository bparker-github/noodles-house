import { defineStore } from 'pinia';
import { createApi } from 'unsplash-js';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { ref } from 'vue';
import { throwError } from '../throwChain';

export const useUnsplash = defineStore('unsplash', () => {
  // TODO: This is temporary - we must hook this up to an API to hide the keys from misuse.
  const accessKey =
    import.meta.env.NOOD_UNSPLASH_ACCESS_KEY ?? throwError('Missing Unsplash Access key.');

  const unsplashApi = ref(createApi({ accessKey }));

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
