import { useAuthStore, type AuthenticationRedirectPageProps } from '@/core';
import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: ['/auth-response'],
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
    component: () => import('@/dashboard/pages/LoginPage.vue'),
  },

  {
    path: '/logout',
    alias: ['/signout', '/log-out', '/sign-out'],
    name: RouteName.LOGOUT,
    component: () => import('@/core/components/LoadingSpinner.vue'),
    beforeEnter: () =>
      useAuthStore()
        .doLogout()
        .then(() => useRouter().push({ name: RouteName.LANDING })),
  },

  {
    path: '/home',
    component: () => import('../layout/MainDashboard.vue'),
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
