import { NativeUserRole } from '@/auth/NativeUser';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

const routes: RouteRecordRaw[] = [
  // #region SWA auth redirects
  {
    // Handle nearly correct login routes.
    path: '/log-in',
    alias: ['/signin', '/sign-in'],
    name: RouteName.LOGIN,
    redirect: { path: '/login' },
  },
  {
    // Handle nearly correct logout routes.
    path: '/log-out',
    alias: ['/signout', '/sign-out'],
    name: RouteName.LOGOUT,
    redirect: { path: '/logout' },
  },
  // #endregion

  // #region NEW ROUTES
  {
    path: '',
    name: RouteName.LANDING,
    component: () => import('../components/pages/LandingPage.vue'),
  },
  {
    path: '/indoors',
    alias: ['/bunker', '/home'],
    component: () => import('../layouts/custom/MobileFirst.vue'),
    meta: {
      nativeUserRole: NativeUserRole.AUTHENTICATED,
    },
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
            path: 'settings',
            name: RouteName.USER_SETTINGS,
            component: () => import('../components/pages/UserSettings.vue')
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
