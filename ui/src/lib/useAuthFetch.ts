import { useFetch, type UseFetchOptions, type UseFetchReturn } from '@vueuse/core';
import { MaybeRef } from 'vue';

export interface UseAuthFetchOptions<T> extends UseFetchOptions {
  /** The required first param of the fetch. */
  url: MaybeRef<string>;

  /** An optional value indicating what type of request this is. @default GET */
  method?: string;

  /** An optional value indicating the response should be JSON'd. */
  asJson?: boolean;

  /**
   * An optional value indicating the required role configured by the API.
   *  Will be added as 'X-MS-API-ROLE'. The Token itself is managed by SWA.
   */
  authRoleRequired?: string;

  /** An optional value to pass as the base requests. */
  requestInit?: RequestInit;

  /** Specify the type by generics. */
  initialData?: T | null;
}

export function useAuthFetch<T = undefined>(
  options: UseAuthFetchOptions<T>
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  // Get custom props, collect rest as standard options.
  const { url, asJson, authRoleRequired, requestInit = {}, method = 'GET', ...rest } = options;

  // Set up a standard request init and build headers.
  requestInit.headers ??= {};
  Object.assign(requestInit.headers, { method });

  // Add the api-role header if required.
  if (authRoleRequired) {
    Object.assign(requestInit.headers, {
      'X-MS-API-ROLE': authRoleRequired,
    });
  }
  // Add the ContentType if requested as json.
  if (asJson) {
    Object.assign(requestInit.headers, {
      'Content-Type': 'application/json',
    });
  }

  const ret = useFetch<T>(url, requestInit, rest);
  return asJson ? ret.json<T>() : ret;
}
