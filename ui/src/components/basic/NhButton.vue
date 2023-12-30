<template>
  <component
    :is="as ?? 'button'"
    :class="[
      'nh-button',
      'flex flex-row flex-nowrap justify-between',
      'px-3 py-2.5',
      // Apply Styles.
      {
        'border rounded-md': !bStyle || bStyle === BStyle.SOLID,
        'border-2 bg-transparent rounded-md': bStyle === BStyle.OUTLINE,
      },
      // Apply Themes - first apply shared styles, then unique colors.
      'border outline-2 outline-offset-1 focus-visible:outline',
      (!bTheme || bTheme === BTheme.BALI_HAI) && [
        'bg-nh-bali-hai-700 text-nh-bali-hai-100 hover:bg-nh-bali-hai-800',
        'border-nh-bali-hai-950/50 focus-visible:outline-nh-bali-hai-950',
      ],
      bTheme === BTheme.CHALET_GREEN && [
        'bg-nh-chalet-green-700 text-nh-chalet-green-100 hover:bg-nh-chalet-green-800',
        'border-nh-chalet-green-950/50 focus-visible:outline-nh-chalet-green-950',
      ],
      bTheme === BTheme.MALLARD && [
        'bg-nh-mallard-700 text-nh-mallard-100 hover:bg-nh-mallard-800',
        'border-nh-mallard-950/50 focus-visible:outline-nh-mallard-950',
      ],
      bTheme === BTheme.OFF_YELLOW && [
        'bg-nh-off-yellow-700 text-nh-off-yellow-100 hover:bg-nh-off-yellow-800',
        'border-nh-off-yellow-950/50 focus-visible:outline-nh-off-yellow-950',
      ],
      bTheme === BTheme.OFF_YELLOW_LIGHT && [
        'bg-nh-off-yellow-300 text-nh-off-yellow-950 hover:bg-nh-off-yellow-400',
        'border-nh-off-yellow-500/50 focus-visible:outline-nh-off-yellow-500',
        'shadow-inner-sm shadow-nh-off-yellow-800',
      ],
      bTheme === BTheme.DI_SERRIA && [
        'bg-nh-di-serria-700 text-nh-di-serria-100 hover:bg-nh-di-serria-800',
        'border-nh-di-serria-950/50 focus-visible:outline-nh-di-serria-950',
      ],
      bTheme === BTheme.BOURBON && [
        'bg-nh-bourbon-700 text-nh-bourbon-100 hover:bg-nh-bourbon-800',
        'border-nh-bourbon-950/50 focus-visible:outline-nh-bourbon-950',
      ],
      bTheme === BTheme.EMPRESS && [
        'bg-nh-empress-700 text-nh-empress-100 hover:bg-nh-empress-800',
        'border-nh-empress-950/50 focus-visible:outline-nh-empress-950',
      ],
    ]"
  >
    <span class="nh-button-text text-base font-semibold">
      <slot
        ><span class="nh-button-default-text">{{ text }}</span></slot
      >
    </span>

    <slot name="right-icon">
      <BasicSpinner
        v-if="isLoading"
        :omit-default-colors="true"
        :class="[
          'h-6 w-6',
          (!bTheme || bTheme === BTheme.BALI_HAI) && ['text-nh-bali-hai-300 fill-nh-bali-hai-800'],
          bTheme === BTheme.CHALET_GREEN && ['text-nh-chalet-green-50 fill-nh-chalet-green-950'],
          bTheme === BTheme.OFF_YELLOW && ['text-nh-off-yellow-50 fill-nh-off-yellow-950'],
          bTheme === BTheme.OFF_YELLOW_LIGHT && ['text-nh-whiteish fill-nh-off-yellow-800'],
          bTheme === BTheme.DI_SERRIA && ['text-nh-di-serria-50 fill-nh-di-serria-950'],
          bTheme === BTheme.BOURBON && ['text-nh-bourbon-50 fill-nh-bourbon-950'],
          bTheme === BTheme.EMPRESS && ['text-nh-empress-50 fill-nh-empress-950'],
        ]"
      />
    </slot>
  </component>
</template>

<script lang="ts">
export enum BStyle {
  SOLID = 'solid',
  OUTLINE = 'outline',
}
export enum BTheme {
  BALI_HAI = 'bali-hai',
  CHALET_GREEN = 'chalet-green',
  MALLARD = 'mallard',
  OFF_YELLOW = 'off-yellow',
  OFF_YELLOW_LIGHT = 'off-yellow-light',
  DI_SERRIA = 'di-serria',
  BOURBON = 'bourbon',
  EMPRESS = 'empress',
}
</script>

<script setup lang="ts">
import BasicSpinner from '../spinners/BasicSpinner.vue';

export interface NhButtonProps {
  /** An optional value indicating what base-component the button should embody. @default button */
  as?: string;

  /** An optional value indicating the style of the button. @default SOLID */
  bStyle?: BStyle;

  /**
   * An optional value to presume styling upon the button without specific classes.
   * Can be used in conjunction with classes to tweak styles.
   * @default BALI_HAI
   */
  bTheme?: BTheme;

  /** An optional value to present as text of the button. Overridden by default slot. */
  text?: string;

  /** An optional value indicating whether the button should show a spinner on the right. */
  isLoading?: boolean;
}
defineProps<NhButtonProps>();

defineSlots<{
  default: {};
  'right-icon': {};
}>();
</script>
