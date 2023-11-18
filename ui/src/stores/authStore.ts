import { useAuthPlugin } from '@/auth/MsalVuePlugin';
import { PermissionType, RoleType, getRolesFromGroup, type NoodleAccountInfo } from '@/lib';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useAuthApiStore } from './authApiStore';

export const useAuthStore = defineStore('auth-store', () => {
  // Retrieve the base msal info from the plugin.
  const authPlugin = useAuthPlugin();
  const { $msal, selectedAccount, isAuthenticated, options, acquireToken, signIn, signOut } =
    authPlugin;

  const authApiStore = useAuthApiStore();
  const { isFinished: schemeFinished, roles } = storeToRefs(authApiStore);

  // Add roles to the computed user value.
  const curAccount = computed<NoodleAccountInfo | undefined>(() => {
    if (!schemeFinished.value || !selectedAccount.value) {
      return undefined;
    }

    const foundGroups = (selectedAccount.value as NoodleAccountInfo).idTokenClaims?.group ?? [];

    return {
      ...selectedAccount.value,
      roles: getRolesFromGroup(roles.value ?? [], ...foundGroups),
    };
  });

  /** A utility function to check if the current user has this role. */
  function userHasRole(role: RoleType): boolean {
    return !!curAccount.value?.roles?.some((r) => r.type === role);
  }
  /** A utility function to check if the current user has roles that include this permission. */
  function userHasPerm(perm: PermissionType): boolean {
    return !!curAccount.value?.roles?.some((r) => r.permissions?.includes(perm));
  }

  async function initialize(): Promise<void> {
    await Promise.all([$msal.initialize(), authApiStore.initialize()]);
  }

  return {
    msalInstance: $msal,
    msalOptions: options,
    isAuthenticated,
    curAccount,

    initPromise: initialize(),
    acquireToken: acquireToken,
    doLogin: signIn,
    doLogout: signOut,
    userHasRole,
    userHasPerm,
  };
});
