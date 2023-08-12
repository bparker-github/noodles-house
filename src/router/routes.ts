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
    component: () => import('@/views/HomeView.vue'),
    meta: {}
  },

  NotFound
];
export default routes;
