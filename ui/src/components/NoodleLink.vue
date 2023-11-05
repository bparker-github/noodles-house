<template>
  <a
    v-if="isExternalLink(to)"
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <slot></slot>
  </a>
  <RouterLink
    v-else
    v-bind="$attrs"
    :to="to"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw, type RouterLinkProps } from 'vue-router';

export interface NoodleLinkProps extends /** @vue-ignore */ RouterLinkProps {
  /** Class to apply when the link is active. */
  activeClass?: string;
  /** Class to apply when the link is exact active. */
  exactActiveClass?: string;
  /** Route Location the link should navigate to when clicked on. */
  to: RouteLocationRaw;
  /** An optional value indicating that we should use native navigation instead of vue router. */
  isExternal?: boolean;
}
const props = defineProps<NoodleLinkProps>();
defineOptions({ inheritAttrs: false });

function isExternalLink(to: RouteLocationRaw): to is string {
  return props.isExternal || (typeof props.to === 'string' && !!props.to.match(/^http/i));
}
</script>
