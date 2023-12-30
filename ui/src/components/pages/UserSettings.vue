<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
    <NhButton
      :b-style="BStyle.SOLID"
      :b-theme="BTheme.CHALET_GREEN"
      :text="buttonText"
      :is-loading="isFetchMySettingsFetching"
      @click="getSettings"
    />

    <EditableSettingsList
      v-if="myUserSettings"
      v-model:data="myUserSettings"
      id="user-settings-form"
      :field-configs="fieldConfigs"
      title="User Settings"
      sub-title="These settings are entirely up to your preference, m'dear."
      @submit="onSettingsSave"
    />

    <div
      v-if="myUserSettings"
      class="flex flex-col gap-y-2"
    >
      My User Settings
      <PreCodeBlock :data="myUserSettings" />

      <NhButton
        :class="['flex-1 self-end w-64', '[&>span]:w-full']"
        text="Manual Fetch"
        @click.prevent="performGet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettings, type UserSettings } from '@/stores/userSettingsStore';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import PreCodeBlock from '../PreCodeBlock.vue';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import EditableInfoList, { type ModelFieldConfig } from '../forms/EditableInfoList.vue';

const EditableSettingsList = EditableInfoList<UserSettings>;

const userSettingsStore = useUserSettings();
const { myUserSettings, isFetchMySettingsFetching } = storeToRefs(userSettingsStore);

async function getSettings() {
  try {
    // Stuff
    await userSettingsStore.fetchMySettings(!!myUserSettings.value);
  } catch (ex) {
    // Error
    console.error('Cannot do:', ex);
  }
}

// Computed
const buttonText = computed(() => (myUserSettings.value ? 'Refresh Settings' : 'Get Settings'));

const fieldConfigs = computed<ModelFieldConfig<UserSettings>[]>(() => {
  if (!myUserSettings.value) {
    return [
      {
        key: 'id',
        label: 'No Settings',
        disabled: true,
        placeholder: 'No settings yet exist',
      },
    ];
  }

  const ret: ModelFieldConfig<UserSettings>[] = [
    {
      key: 'id',
      disabled: true,
      label: 'Id',
    },
    {
      key: 'userId',
      disabled: true,
      label: 'User Id',
    },
    {
      key: 'firstName',
      label: 'First Name',
      placeholder: 'John',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Smith',
    },
    {
      key: 'profileLink',
      disabled: true,
      label: 'Profile Link',
    },
  ];

  return ret;
});

async function onSettingsSave(toSave: UserSettings) {
  // Check if we are PUT or POST (create/update);
  console.log('Settings save:', toSave);

  // We are in a create/PUT situation
  if (!toSave.id) {
    await createNewSettings(toSave);
  }
}
async function createNewSettings(newSettings: UserSettings) {
  const putFetch = useFetch('/data-api/da-data/user-settings', {
    beforeFetch(ctx) {
      ctx.options.method = 'POST';
      ctx.options.headers = {
        ...(ctx.options.headers ?? {}),
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': 'anonymous',
      };

      // // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const { id, ...withoutId } = newSettings;
      newSettings.id = '5bd81e1a-8c9e-4000-be33-cbb2c46cf1c4';
      ctx.options.body = JSON.stringify(newSettings);

      return ctx;
    },
    immediate: false,
  });

  try {
    await putFetch.execute();

    console.log('PutFetch completed:', putFetch.response.value);
  } catch (err) {
    console.error('PutFetch error:', putFetch.error.value);
  }
}

async function performGet() {
  const resp = await useFetch('/data-api/da-data/user-settings', {
    beforeFetch(ctx) {
      ctx.options.method = 'GET';
      ctx.options.headers = {
        ...(ctx.options.headers ?? {}),
        'X-MS-API-ROLE': 'anonymous',
      };
      return ctx;
    },
  });

  console.log('Returned val:', resp.response.value);
}
</script>
