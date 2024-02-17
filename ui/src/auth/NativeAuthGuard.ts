import { RouteName } from '@/router/RouteName';
import { storeToRefs } from 'pinia';
import type { NavigationGuard } from 'vue-router';
import { NavigationGuardNext } from 'vue-router';
import { NativeUserRole } from './NativeUser';
import { useNativeAuth } from './useNativeAuth';

function doExternalRouting(to: string, next: NavigationGuardNext) {
  next(false);
  window.location.pathname = to;
  return to;
}

export const NativeAuthGuard: NavigationGuard = async (to, _, next) => {
  const nativeAuth = useNativeAuth();
  const { isAuthenticated } = storeToRefs(nativeAuth);

  // Check if the route requires authentication
  const doesRouteRequireAuth = to.meta.nativeUserRole === NativeUserRole.AUTHENTICATED;
  if (doesRouteRequireAuth) {
    // Ensure we complete the /.auth/me call
    await nativeAuth.doFetch();
  }

  if (to.name === RouteName.LOGIN) {
    return isAuthenticated.value ? next({ name: RouteName.HOME }) : next();
  } else if (to.name === RouteName.LOGOUT) {
    return !isAuthenticated.value ? next({ name: RouteName.HOME }) : next();
  }

  // If still not authenticated, redirect to the native SWA login page
  if (doesRouteRequireAuth && !isAuthenticated.value) {
    return doExternalRouting('/login', next);
  }

  // Otherwise, we are done.
  return next();
};
