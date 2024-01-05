import { storeToRefs } from 'pinia';
import type { NavigationGuard } from 'vue-router';
import { NativeUserRole } from './NativeUser';
import { useNativeAuth } from './useNativeAuth';

export const NativeAuthGuard: NavigationGuard = async (to, _, next) => {
  const nativeAuth = useNativeAuth();
  const { isAuthenticated } = storeToRefs(nativeAuth);

  // Ensure we complete the /.auth/me call
  await nativeAuth.doFetch();

  // Skip non-auth routes, or if we are already auth.
  if (to.meta.nativeUserRole !== NativeUserRole.AUTHENTICATED || isAuthenticated.value) {
    return next();
  }

  // Finish the guard-hook dead-end, do the external routing.
  next(false);
  window.location.pathname = '/login';
};
