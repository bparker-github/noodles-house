import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from './RouteName';
import { routes } from './routes';

const NotFoundRoute = {
  path: '/:catchAll(.*)*',
  name: RouteName.NOT_FOUND,
  component: () => import('@/core/pages/NotFoundPage.vue'),
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, NotFoundRoute],
});
export default router;
