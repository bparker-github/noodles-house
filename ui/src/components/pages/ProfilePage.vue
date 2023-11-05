<template>
  <InfoListCard
    v-if="currAccount?.idTokenClaims"
    title="Profile"
    subTitle="Personal profile information."
    :items="!currAccount.idTokenClaims ? [] : items"
  />
</template>

<script setup lang="ts">
import type { EnumObject } from '@/lib';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const authStore = useAuthStore();
const { currAccount } = storeToRefs(authStore);

const items = computed<EnumObject[]>(() => {
  if (!currAccount.value?.idTokenClaims) {
    return [];
  }

  return [
    {
      label: 'Preferred Username',
      value:
        currAccount.value.idTokenClaims.preferred_username ??
        currAccount.value.username ??
        'Unknown',
    },
    { label: 'Full Name', value: currAccount.value.name ?? 'Unknown' },
    { label: 'Given Name', value: currAccount.value.idTokenClaims.given_name ?? 'Unknown' },
    { label: 'Family Name', value: currAccount.value.idTokenClaims.family_name ?? 'Unknown' },
  ];
});
</script>
