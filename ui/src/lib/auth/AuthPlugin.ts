import type { App } from 'vue';
import { hasInjectionContext, inject, ref } from 'vue';
import { AuthManager } from './AuthManager';
import type { AuthPluginOptions } from './AuthPluginOptions';
import type { Ref } from 'vue';

export class AuthPlugin {
  // The provide/inject key of this plugin.
  static PLUGIN_NAME = 'noodle-auth';

  install(app: App, options: AuthPluginOptions) {
    app.provide(AuthPlugin.PLUGIN_NAME, ref(new AuthManager(options)));
  }
}

export function useAuthPlugin(): Ref<AuthManager> {
  if (!hasInjectionContext()) {
    console.log('Bad Inject', inject);
  }
  const found = inject<Ref<AuthManager>>(AuthPlugin.PLUGIN_NAME);
  if (!found) {
    throw new Error('Cannot find msal from inject');
  }
  return found;
}
