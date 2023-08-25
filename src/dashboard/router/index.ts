import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const NotFoundRoute = {
  path: '/:catchAll(.*)*',
  component: () => import('@/core/pages/NotFoundPage.vue'),
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, NotFoundRoute],
});
export default router;
