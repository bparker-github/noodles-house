<template>
  <InfoListCard
    v-if="curUser?.clientPrincipal"
    title="Profile"
    subTitle="Personal profile information."
    :list="items"
  />
</template>

<script setup lang="ts">
import type { EnumObject } from '@/lib';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import InfoListCard from '../cards/InfoListCard.vue';
import { useNativeAuth } from '@/auth/useNativeAuth';

const nativeAuth = useNativeAuth();
const { curUser } = storeToRefs(nativeAuth);

const items = computed<EnumObject[]>(() => [
  {
    label: 'Username',
    value: curUser.value?.clientPrincipal.userDetails ?? 'Unknown',
  },
  {
    label: 'Provider',
    value: JSON.stringify(curUser.value?.clientPrincipal.identityProvider ?? []),
  },
  {
    label: 'Claims',
    value: JSON.stringify(curUser.value?.clientPrincipal.claims ?? []),
  },
  {
    label: 'Roles',
    value: JSON.stringify(curUser.value?.clientPrincipal.userRoles ?? []),
  },
]);
</script>
