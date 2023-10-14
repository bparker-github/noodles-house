import { useAuthStore } from '@noodles-house/common';
import { storeToRefs } from 'pinia';
import type { NavigationGuard, RouteLocationNormalized } from 'vue-router';

export const AuthGuardRedirect: NavigationGuard = async (to: RouteLocationNormalized) => {
  // If no auth, continue successfully.
  if (!to.meta.authRequired) {
    return true;
  }

  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  // Ensure we are initialized
  await authStore.initFunc;

  // If they are successfully authenticated already, continue successfully.
  if (isAuthenticated.value) {
    return true;
  }

  // Otherwise redirect them to the desired route.
  return typeof to.meta.authRequired === 'boolean' ? '/' : to.meta.authRequired;
};
