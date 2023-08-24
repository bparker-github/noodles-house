import { NavigationClient, type NavigationOptions } from '@azure/msal-browser';
import type { Router } from 'vue-router';

export class CustomNavigationClient extends NavigationClient {
  constructor(private router: Router) {
    super();
  }

  async navigateInternal(url: string, options: NavigationOptions): Promise<boolean> {
    const relativePath = url.replace(window.location.origin, '');
    if (options.noHistory) {
      this.router.replace(relativePath);
    } else {
      this.router.push(relativePath);
    }

    return false;
  }
}
