import type { NavigationGuard } from 'vue-router';
import { useNativeAuth } from './useNativeAuth';
import { storeToRefs } from 'pinia';
import { RouteName } from '@/router/RouteName';
import { NativeUserRole } from './NativeUser';

export const NativeAuthGuard: NavigationGuard = async (to, _, next) => {
  const nativeAuth = useNativeAuth();
  const { isAuthenticated } = storeToRefs(nativeAuth);

  // Ensure we complete the /.auth/me call
  await nativeAuth.doFetch();

  // Skip non-auth routes, or if we are already auth.
  if (to.meta.nativeUserRole !== NativeUserRole.AUTHENTICATED || isAuthenticated.value) {
    return next();
  }

  // Skip if already auth
  return next({ name: RouteName.LOGIN, force: true, replace: true });
};
