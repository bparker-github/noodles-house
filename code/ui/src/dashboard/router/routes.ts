import { type AuthenticationRedirectPageProps } from '@common';
import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

export const routes: RouteRecordRaw[] = [
  //#region Auth Routes
  {
    path: '/',
    alias: ['/auth-response'],
    name: RouteName.LANDING,
    component: () =>
      import('@common').then(({ AuthenticatedRedirectPage }) => AuthenticatedRedirectPage),
    props: {
      authRoute: { name: RouteName.HOME },
      unAuthRoute: { name: RouteName.LOGIN },
    } satisfies AuthenticationRedirectPageProps,
  },

  {
    path: '/login',
    alias: ['/signin', '/log-in', '/sign-in'],
    name: RouteName.LOGIN,
    component: () => import('../pages/LoginPage.vue'),
  },

  {
    path: '/logout',
    alias: ['/signout', '/log-out', '/sign-out'],
    name: RouteName.LOGOUT,
    component: () => import('../pages/LogoutPage.vue'),
  },

  {
    path: '/failed',
    name: RouteName.FAILED,
    component: () => import('../pages/FailedPage.vue'),
  },
  //#endregion

  {
    path: '/home',
    component: () => import('../layout/MainDashboard.vue'),
    meta: { authRequired: true },
    children: [
      {
        path: '',
        name: RouteName.HOME,
        component: () => import('../pages/HomePage.vue'),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            name: RouteName.PROFILE,
            component: () => import('../pages/ProfilePage.vue'),
          },
          {
            path: 'tokens',
            name: RouteName.PROFILE_TOKENS,
            component: () => import('../pages/ProfileTokensPage.vue'),
          },
        ],
      },
    ],
  },
];
