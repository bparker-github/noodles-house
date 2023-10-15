<template>
  <InfoListCard
    v-if="curAccount?.idTokenClaims"
    title="Profile"
    subTitle="Personal profile information."
    :items="!curAccount.idTokenClaims ? [] : items"
  />
</template>

<script setup lang="ts">
import { InfoListCard } from '@common';
import { EnumObject, useAuthStore } from '@noodles-house/common';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const authStore = useAuthStore();
const { curAccount } = storeToRefs(authStore);

const items = computed<EnumObject[]>(() => {
  if (!curAccount.value?.idTokenClaims) {
    return [];
  }

  return [
    {
      label: 'Preferred Username',
      value:
        curAccount.value.idTokenClaims.preferred_username ?? curAccount.value.username ?? 'Unknown',
    },
    { label: 'Full Name', value: curAccount.value.name ?? 'Unknown' },
    { label: 'Given Name', value: curAccount.value.idTokenClaims.given_name ?? 'Unknown' },
    { label: 'Family Name', value: curAccount.value.idTokenClaims.family_name ?? 'Unknown' },
  ];
});

console.log('CurrentUser:', curAccount.value);
</script>
