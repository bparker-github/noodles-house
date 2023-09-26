import 'vue-router';

export {};

declare module 'vue-router' {
  /** Extend the 'meta' property within this type. */
  interface RouteMeta {
    /**
     * A value indicating whether auth is required for this route.
     * If boolean, indicates if required, redirects to '/login' for auth.
     * If path, indicates as required and redirects to given path for auth.
     */
    authRequired?: RouteLocationRaw | boolean;
  }
}
