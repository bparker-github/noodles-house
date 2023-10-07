import { useAuthStore } from '@noodles-house/common';
import { toRef } from 'vue';
import type { NavigationGuard } from 'vue-router';

export const AuthGuardRedirect: NavigationGuard = async function (to) {
  // If no auth, continue successfully.
  if (!to.meta.authRequired) {
    return true;
  }

  const authStore = useAuthStore();
  const isAuthenticated = toRef(authStore, 'isAuthenticated');

  // If they are successfully authenticated already, continue successfully.
  if (isAuthenticated.value) {
    return true;
  }

  // Otherwise redirect them to the desired route.
  return typeof to.meta.authRequired === 'boolean' ? '/' : to.meta.authRequired;
};