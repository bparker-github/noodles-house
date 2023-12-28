<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
    <NhButton
      :b-style="BStyle.SOLID"
      :b-theme="BTheme.CHALET_GREEN"
      :text="buttonText"
      :is-loading="isFetchMySettingsFetching"
      @click="getSettings"
    />

    <form id="user-settings-form">
      <EditableSettingsList
        v-if="myUserSettings"
        v-model:data="myUserSettings"
        :field-configs="fieldConfigs"
        title="User Settings"
        sub-title="These settings are entirely up to your preference, m'dear."
        @submit="onSettingsSave"
      />
    </form>

    <div v-if="myUserSettings">
      My User Settings
      <PreCodeBlock :data="myUserSettings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettings, type UserSettings } from '@/stores/userSettingsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import PreCodeBlock from '../PreCodeBlock.vue';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import EditableInfoList, { type ModelFieldConfigMap } from '../forms/EditableInfoList.vue';

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

const fieldConfigs = computed<ModelFieldConfigMap<UserSettings>>(() => {
  if (!myUserSettings.value) {
    return {
      id: {
        getValue: () => 'No User Settings saved yet!',
        label: 'None',
        isDisabled: true,
      },
    };
  }

  const ret: ModelFieldConfigMap<UserSettings> = {
    id: {
      disabled: true,
      value: myUserSettings.value.id,
      label: 'Id',
    },
    userId: {
      disabled: true,
      value: myUserSettings.value.userId,
      label: 'User Id',
    },
    firstName: {
      value: myUserSettings.value.firstName,
      label: 'First Name',
    },
    lastName: {
      value: myUserSettings.value.lastName,
      label: 'Last Name',
    },
    profileLink: {
      disabled: true,
      value: myUserSettings.value.profileLink,
      label: 'Profile Link',
    },
  };

  return ret;
});

function onSettingsSave() {
  console.log('Settings save:', arguments);
}
</script>
