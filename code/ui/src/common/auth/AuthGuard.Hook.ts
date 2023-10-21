import { useAuthStore } from '@noodles-house/common';
import type { NavigationGuard } from 'vue-router';
import { storeToRefs } from 'pinia';
import { RouteName } from '../../dashboard/router/RouteName';

export const AuthGuardHook: NavigationGuard = async (to, from, next) => {
  const everyRole = to.meta.mustHaveAllRoles ?? [];
  const someRole = to.meta.mustHaveSomeRoles ?? [];
  const everyPerm = to.meta.mustHaveAllPermissions ?? [];
  const somePerm = to.meta.mustHaveSomePermissions ?? [];
  const failedRedirect = to.meta.failedRedirect ?? { name: RouteName.FAILED };

  // If the route requires no auth, we do nothing more. Short circuit any auth work.
  if (!everyRole.length && !someRole.length && !everyPerm.length && !somePerm.length) {
    return next(true);
  }

  // Now we must consult the Auth Store. Be sure it's initialized.
  const authStore = useAuthStore();
  const { curAccount } = storeToRefs(authStore);
  await authStore.initFunc;

  // They do not have a user, and we are in a condition where they require some kind of permissions or roles.
  if (!curAccount.value) {
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
