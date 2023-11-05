import { PermissionType } from '@/lib';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { AuthenticationRedirectPageProps } from '../components/pages/AuthenticatedRedirectPage.vue';
import { RouteName } from './RouteName';

const routes: RouteRecordRaw[] = [
  //#region Auth Routes
  {
    path: '/',
    alias: ['/auth-response'],
    name: RouteName.LANDING,
    component: () => import('../components/pages/AuthenticatedRedirectPage.vue'),
    props: {
      authRoute: RouteName.HOME,
      unAuthRoute: RouteName.LOGIN,
    } satisfies AuthenticationRedirectPageProps,
  },

  {
    path: '/login',
    alias: ['/signin', '/log-in', '/sign-in'],
    name: RouteName.LOGIN,
    component: () => import('../components/pages/LoginPage.vue'),
  },

  {
    path: '/logout',
    alias: ['/signout', '/log-out', '/sign-out'],
    name: RouteName.LOGOUT,
    component: () => import('../components/pages/LogoutPage.vue'),
  },

  {
    path: '/failed',
    name: RouteName.FAILED,
    component: () => import('../components/pages/FailedPage.vue'),
  },
  //#endregion

  /** Dashboard Routes */
  {
    path: '/home',
    component: () => import('../layouts/dashboard/MainDashboard.vue'),
    meta: {
      requiredPermission: PermissionType.VIEW_DASHBOARD,
    },
    children: [
      {
        path: '',
        name: RouteName.HOME,
        component: () => import('../components/pages/HomePage.vue'),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            name: RouteName.PROFILE,
            component: () => import('../components/pages/ProfilePage.vue'),
          },
          {
            path: 'tokens',
            name: RouteName.PROFILE_TOKENS,
            component: () => import('../components/pages/ProfileTokensPage.vue'),
          },
        ],
      },
    ],
  },
];

const NotFoundRoute = {
  path: '/:catchAll(.*)*',
  name: RouteName.NOT_FOUND,
  component: () => import('../components/pages/NotFoundPage.vue'),
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, NotFoundRoute],
});
export default router;
