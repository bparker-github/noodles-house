import { createApi } from 'unsplash-js';
import type { UnsplashApi } from './unsplash';

let uiApi: UnsplashApi | null = null;
let serverApi: UnsplashApi | null = null;

export function useUnsplashApi(which: 'ui' | 'api', configVal: string): UnsplashApi {
  switch (which) {
    case 'ui':
      return (uiApi ??= createApi({ apiUrl: configVal }));
    case 'api':
      return (serverApi ??= createApi({ accessKey: configVal }));
  }
}
