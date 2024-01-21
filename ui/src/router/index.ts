import { NativeUserRole } from '@/auth/NativeUser';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteName } from './RouteName';

const routes: RouteRecordRaw[] = [
  // Guard the entire site for mobile-only (for now)
  {
    path: '/',
    component: () => import('../layouts/DisplayGuards/UpToSmall.vue'),
    children: [
      // Handle the Landing/Foyer pages
      {
        path: 'foyer',
        name: RouteName.LANDING,
        component: () => import('../components/pages/LandingPage.vue'),
        children: [
          {
            path: 'welcome',
            name: RouteName.HOME,
            meta: {
              nativeUserRole: NativeUserRole.AUTHENTICATED,
            },
            component: () => import('../components/pages/HomePage.vue'),
          },
        ],
      },
      {
        path: '',
        redirect: { name: RouteName.LANDING },
      },
      {
        path: 'undefined',
        redirect: { name: RouteName.LANDING },
      },

      // Handle the personal-info/SittingRoom pages
      {
        path: 'sitting-room',
        meta: {
          nativeUserRole: NativeUserRole.AUTHENTICATED,
        },
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
        meta: {
          nativeUserRole: NativeUserRole.AUTHENTICATED,
        },
        children: [
          {
            path: 'tasks',
            name: RouteName.TASKS_HOME,
            redirect: { name: RouteName.TASKS_CREATE },
            children: [
              {
                path: 'create',
                name: RouteName.TASKS_CREATE,
                component: () => import('../components/pages/tasks/TaskCreatePage.vue'),
              },
              {
                path: 'list',
                name: RouteName.TASKS_LIST,
                component: () => import('../components/pages/tasks/TaskListPage.vue'),
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
