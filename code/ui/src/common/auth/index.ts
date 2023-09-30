import type { AuthStoreShape } from '@noodles-house/common';
import { toValue } from 'vue';
import { type Router } from 'vue-router';
import { CustomNavigationClient } from './NavigationGuard';

export { AuthGuardRedirect } from './AuthGuardRedirect';
export { CustomNavigationClient } from './NavigationGuard';

export function applyNavigationRouter(router: Router, app: AuthStoreShape) {
  // This is how you tell MSAL how to route using our vue router.
  const navClient = new CustomNavigationClient(router);
  toValue(app.instance).setNavigationClient(navClient);
}
