import { type RouteRecordRaw } from 'vue-router';

const NotFound = {
  path: '/:catchAll(.*)*',
  component: () => import('@/views/NotFound.vue'),
};

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LANDING',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/welcome',
    name: 'WELCOME',
    component: () => import('@/views/WelcomePage.vue'),
  },
  {
    path: '/home',
    alias: ['/dashboard'],
    component: () => import('@/components/Dashboard/DashboardMain.vue'),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/BasicWelcomePage.vue'),
      },
    ],
  },

  NotFound,
];
export default routes;
