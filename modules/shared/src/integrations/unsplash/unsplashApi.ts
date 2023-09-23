import { createApi } from 'unsplash-js';
import type { UnsplashApi } from './unsplash';

let serverApi: UnsplashApi | null = null;

export function useUnsplashApi(which: 'ui' | 'api', configVal: string): UnsplashApi {
  return (serverApi ??= createApi(
    which === 'ui' ? { apiUrl: configVal } : { accessKey: configVal }
  ));
}