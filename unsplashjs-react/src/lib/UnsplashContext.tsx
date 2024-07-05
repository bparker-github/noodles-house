import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import type { UnsplashApi } from '../../unsplash';

export interface UnsplashContextState {
  getPhoto: (id?: string) => Promise<Full | null>;
}
export const UnsplashContext = createContext<UnsplashContextState>({
  getPhoto: () => Promise.reject(null),
});
export const useUnsplashContext = () => useContext(UnsplashContext);

export interface UnsplashProviderProps {
  uiEndpoint: string;
  apiKey?: string;
}
export const UnsplashProvider = ({
  children,
  uiEndpoint,
  apiKey = '',
}: PropsWithChildren<UnsplashProviderProps>) => {
  const unsplashApi = useRef(createApi({ apiUrl: uiEndpoint }));
  const backupApi = useRef(createApi({ accessKey: apiKey }));
  const didLocalApiFail = useRef(false);

  // Keep cache of fetched images.
  const cache = useRef<Record<string, Full>>({});

  const getDataFromCache = (id: string): Full | null =>
    id in cache.current ? cache.current[id] : null;
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
      if (!didLocalApiFail.current && unsplashApi.current) {
        const primaryResp = await getDataFromApi(unsplashApi.current, id);
        if (primaryResp.type !== 'error') {
          cache.current[id] ??= primaryResp.response;
          return primaryResp.response;
        }
        console.error(`Unsplash API Error: ${primaryResp.errors}`);
      }

      // Make a request to the backup API, iff we are allowed and able to.
      if (apiKey && backupApi.current) {
        const backupResp = await getDataFromApi(backupApi.current, id);
        if (backupResp.type !== 'error') {
          cache.current[id] ??= backupResp.response;
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

  return (
    <UnsplashContext.Provider
      value={{
        getPhoto,
      }}
    >
      {children}
    </UnsplashContext.Provider>
  );
};
