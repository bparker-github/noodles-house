import { NativeUserRole } from '@/auth/NativeUser';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

const routes: RouteRecordRaw[] = [
  // Log-in and Log-out routes should be "refresh" the page to route via SWA.
  {
    // Handle nearly correct login routes.
    path: '/log-in',
    alias: ['/signin', '/sign-in'],
    name: RouteName.LOGIN,
    component: () => import('../components/pages/auth/LoginPage.vue'),
  },
  {
    // Handle nearly correct logout routes.
    path: '/log-out',
    alias: ['/signout', '/sign-out'],
    name: RouteName.LOGOUT,
    component: () => import('../components/pages/auth/LogoutPage.vue'),
  },
  // Guard the entire site for mobile-only (for now)

  {
    path: '/',
    component: () => import('../layouts/DisplayGuards/UpToSmall.vue'),
    children: [
      // Handle no-path yet
      {
        path: '',
        redirect: { name: RouteName.LANDING },
      },
      // Handle the Landing/Foyer pages
      {
        path: 'foyer',
        children: [
          {
            path: '',
            name: RouteName.LANDING,
            component: () => import('../components/pages/LandingPage.vue'),
          },
          {
            path: 'welcome',
            meta: {
              nativeUserRole: NativeUserRole.AUTHENTICATED,
            },
            component: () => import('../layouts/SimpleDark/SimpleDark.vue'),
            children: [
              {
                path: '',
                name: RouteName.HOME,
                component: () => import('../components/pages/HomePage.vue'),
              },
            ],
          },
          {
            path: 'undefined',
            redirect: { name: RouteName.LANDING },
          },
        ],
      },

      // Handle the personal-info/SittingRoom pages
      {
        path: 'sitting-room',
        meta: {
          nativeUserRole: NativeUserRole.AUTHENTICATED,
        },
        component: () => import('../layouts/SimpleDark/SimpleDark.vue'),
        children: [
          {
            path: 'profile',
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
            component: () => import('../components/pages/UserSettings.vue'),
          },
          {
            path: 'tokens',
            name: RouteName.PROFILE_TOKENS,
            component: () => import('../components/pages/ProfileTokensPage.vue'),
          },
        ],
      },

      // Handle the general-work/Office pages
      {
        path: 'office',
        component: () => import('../layouts/SimpleDark/SimpleDark.vue'),
        meta: {
          nativeUserRole: NativeUserRole.AUTHENTICATED,
        },
        children: [
          {
            path: 'tasks',
            component: () => import('@/layouts/TasksLayout.vue'),
            redirect: { name: RouteName.TASKS_HOME },
            children: [
              {
                path: 'home',
                name: RouteName.TASKS_HOME,
                component: () => import('@/components/tasks/TasksGeneralInfo.vue'),
              },
              {
                path: 'create',
                name: RouteName.TASKS_CREATE,
                component: () => import('../components/pages/tasks/TaskCreatePage.vue'),
              },
              {
                path: 'list',
                children: [
                  {
                    path: 'my',
                    name: RouteName.TASKS_LIST_MY,
                    component: () => import('../components/pages/tasks/TaskListMyPage.vue'),
                  },
                  {
                    path: 'all',
                    name: RouteName.TASKS_LIST_ALL,
                    component: () => import('../components/pages/tasks/TaskListAllPage.vue'),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

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
