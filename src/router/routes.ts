import { type RouteRecordRaw } from 'vue-router';

const NotFound = {
  path: '/:catchAll(.*)*',
  component: () => import('@/views/NotFound.vue')
};

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/RootView.vue')
  },
  {
    path: '/home',
    component: () => import('@/components/Dashboard/DashboardMain.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/HomeView.vue')
      }
    ]
  },

  NotFound
];
export default routes;
