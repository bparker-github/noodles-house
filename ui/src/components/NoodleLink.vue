<template>
  <a
    v-if="isExternalLink"
    :href="href"
    target="_blank"
    ><slot></slot
  ></a>
  <RouterLink
    v-else
    :to="to"
    ><slot></slot
  ></RouterLink>
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

const isExternalLink = computed(
  () => props.isExternal || (typeof props.to === 'string' && !!props.to.match(/^http/i))
);

const href = computed(() => (isExternalLink.value ? (props.to as string) : ''));
</script>
