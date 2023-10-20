import { useAuthStore } from '@noodles-house/common';
import type { NavigationGuard, Router } from 'vue-router';
import { CustomNavigationClient } from '.';

export function getAuthStoreSyncHook(router: Router): NavigationGuard {
  const navClient = new CustomNavigationClient(router);

  // We do NOT want to return the 'isInitialized' response value - this will change navigation.
  return async (): Promise<void> => {
    useAuthStore().initializeStore(navClient);
  };
}
