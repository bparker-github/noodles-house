import { RouteName } from '@/router/RouteName';
import { storeToRefs } from 'pinia';
import type { NavigationGuard } from 'vue-router';
import { NavigationGuardNext } from 'vue-router';
import { NativeUserRole } from './NativeUser';
import { useNativeAuth } from './useNativeAuth';

function doExternalRouting(to: string, next: NavigationGuardNext) {
  next(false);
  window.location.pathname = to;
}

export const NativeAuthGuard: NavigationGuard = async (to, _, next) => {
  const nativeAuth = useNativeAuth();
  const { isAuthenticated } = storeToRefs(nativeAuth);

  // Ensure we complete the /.auth/me call
  await nativeAuth.doFetch();

  // Check if we are attempting to log out or in.
  if (to.name === RouteName.LOGOUT) {
    return isAuthenticated.value
      ? doExternalRouting('/logout', next)
      : next({ name: RouteName.LANDING });
  } else if (to.name === RouteName.LOGIN) {
    return isAuthenticated.value
      ? next({ name: RouteName.HOME })
      : doExternalRouting('/login', next);
  }

  // If we require auth, and don't have it - redirect to login.
  return to.meta.nativeUserRole !== NativeUserRole.AUTHENTICATED || isAuthenticated.value
    ? next()
    : doExternalRouting('/login', next);
};
