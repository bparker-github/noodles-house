import { type AuthenticationRedirectPageProps } from '@/core';
import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: ['/auth-response'],
    name: RouteName.LANDING,
    component: () =>
      import('@/core').then(({ AuthenticatedRedirectPage }) => AuthenticatedRedirectPage),
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
        name: RouteName.PROFILE,
        component: () => import('../pages/ProfilePage.vue'),
      },
    ],
  },
];
