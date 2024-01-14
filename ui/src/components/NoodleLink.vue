<template>
  <component
    :is="isExternalLink ? 'a' : RouterLink"
    :to="to"
    :href="to"
    :target="isExternalLink ? '_blank' : ''"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw, type RouterLinkProps } from 'vue-router';

export interface NoodleLinkProps extends /** @vue-ignore */ RouterLinkProps {
  /** Route Location the link should navigate to when clicked on. */
  to: RouteLocationRaw;
  /** An optional value indicating that we should use native navigation instead of vue router. */
  isExternal?: boolean;
}
const props = defineProps<NoodleLinkProps>();
defineOptions({ inheritAttrs: false });

const isExternalLink = computed(
  () => props.isExternal || (typeof props.to === 'string' && !!props.to.match(/^http/i))
);
</script>
