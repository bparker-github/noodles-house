import { RouteName } from '@/router/RouteName';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import type { NavigationGuard } from 'vue-router';
import { useRouter } from 'vue-router';

export const AuthPluginHook: NavigationGuard = async (to, from, next) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  await authStore.initialize(router);

  // Lookup config from route.
  const asArr = <T>(obj: T | T[] | undefined): T[] =>
    !obj ? [] : Array.isArray(obj) ? obj : [obj];
  const everyRole = asArr(to.meta.requiredRoles);
  const someRole = asArr(to.meta.atLeastOneRole);
  const everyPerm = asArr(to.meta.requiredPermissions);
  const somePerm = asArr(to.meta.atLeastOnePermission);
  const failedRedirect = to.meta.failedRedirect ?? { name: RouteName.FAILED };

  // If the route requires no auth, we do nothing more. Short circuit any auth work.
  if (!everyRole.length && !someRole.length && !everyPerm.length && !somePerm.length) {
    return next(true);
  }

  // They do not have a user, and we are in a condition where they require some kind of permissions or roles.
  if (!isAuthenticated.value) {
    return next(failedRedirect);
  }

  // Validate "all"/"some" roles/perms required.
  if (
    (everyRole.length > 0 && !everyRole.every((r) => authStore.userHasRole(r))) ||
    (someRole.length > 0 && !someRole.some((r) => authStore.userHasRole(r))) ||
    (everyPerm.length > 0 && !everyPerm.every((p) => authStore.userHasPerm(p))) ||
    (somePerm.length > 0 && !somePerm.some((p) => authStore.userHasPerm(p)))
  ) {
    return next(failedRedirect);
  }

  // Fallthrough case...
  return next(true);
};
