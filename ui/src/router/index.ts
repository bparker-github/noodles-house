import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

const routes: RouteRecordRaw[] = [
  // #region SWA auth redirects
  {
    path: '/login',
    alias: ['/signin', '/log-in', '/sign-in'],
    name: RouteName.LOGIN,
    redirect: { path: '/.auth/login/aadb2c' },
  },
  {
    path: '/logout',
    alias: ['/signout', '/log-out', '/sign-out'],
    name: RouteName.LOGOUT,
    redirect: { path: '/.auth/logout' },
  },
  // #endregion

  // #region NEW ROUTES
  {
    path: '',
    alias: ['/auth-redirect'],
    name: RouteName.LANDING,
    component: () => import('../components/pages/LandingPage.vue'),
  },
  {
    path: '/home',
    component: () => import('../layouts/custom/MobileFirst.vue'),
    children: [
      {
        path: '',
        name: RouteName.HOME,
        component: () => import('../components/pages/HomePage.vue'),
        children: [],
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
            path: 'auth-dump',
            name: RouteName.AUTH_DUMP,
            component: () => import('../components/pages/AuthDump.vue'),
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
  // #endregion

  // #region Develop Stuffs
  {
    path: '/testing-1',
    name: RouteName.TESTING_1,
    component: () => import('@/layouts/stackedOverlap/StackedOverlapLayout.vue'),
  },
  {
    path: '/testing-2',
    name: RouteName.TESTING_2,
    component: () => import('@/layouts/stackedOverlap/StackedOverlapLayout.vue'),
  },
  {
    path: '/testing-3',
    name: RouteName.TESTING_3,
    component: () => import('@/layouts/stackedOverlap/StackedOverlapLayout.vue'),
  },
  // #endregion

  // #region Rest-routes
  {
    path: '/failed',
    name: RouteName.FAILED,
    component: () => import('../components/pages/FailedPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: RouteName.NOT_FOUND,
    component: () => import('../components/pages/NotFoundPage.vue'),
  },
  // #endregion
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
