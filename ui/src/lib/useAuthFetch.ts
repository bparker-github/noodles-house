import { createFetch, type UseFetchOptions, type UseFetchReturn } from '@vueuse/core';
import { computed, MaybeRef, toValue } from 'vue';

export interface UseAuthFetchOptions<T> extends UseFetchOptions {
  /** An optional value indicating the response should be JSON'd. @default true */
  asJson?: boolean;
  /**
   * An optional value indicating the required role configured by the API.
   *  Will be added as 'X-MS-API-ROLE'. The Token itself is managed by SWA.
   */
  authRoleRequired?: string;
  /** An optional value indicating whether the request will be executed immediately. */
  immediate?: boolean;
  /** Specify the type by generics. */
  initialData?: T | null;
  /** An optional value indicating what type of request this is. @default GET */
  method?: string;
  /** An optional value to pass as the base requests. */
  requestInit?: RequestInit;
  /** An optional config value to pass to the base requests. */
  fetchOptions?: UseFetchOptions;
}

export function useAuthFetch<T = undefined>(
  url: MaybeRef<string>,
  options: UseAuthFetchOptions<T>
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  // Pre-fill defaults
  const { asJson = true, method = 'GET' } = options;

  const ourHeaders: HeadersInit = {};
  // Add the api-role header if required.
  if (options.authRoleRequired) {
    ourHeaders['X-MS-API-ROLE'] = options.authRoleRequired;
  }
  // Add the ContentType if requested as json.
  if (asJson) {
    ourHeaders['Content-Type'] = 'application/json';
  }

  const baseUrl = computed(() => {
    const baseUrl = window?.location?.origin;
    return baseUrl ? `${baseUrl}/` : '';
  });
  const localFetch = createFetch({
    baseUrl: baseUrl,
    fetchOptions: {
      headers: ourHeaders,
      method,
    },
    options: {
      immediate: !!options.immediate,
      initialData: options.initialData,
    },
  });

  const trimmedUrl = computed(() => toValue(url).replace(/^\//, ''));
  const createdFetch = localFetch<T>(trimmedUrl, options.requestInit ?? {}, options.fetchOptions);

  return asJson ? createdFetch.json<T>() : createdFetch;
}
