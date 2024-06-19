<template>
  <component
    :is="as ?? 'button'"
    :class="[
      // Add in button tailwind-css-component.
      'nh-button',
      // Add in the theme, defined as components
      bTheme ?? BTheme.BALI_HAI,
      // Add specific visual styles, referencing the color vars
      (!bStyle || bStyle === BStyle.SOLID) && [
        'border rounded-md',
        'bg-[color:var(--bg-color)] hover:bg-[color:var(--hover-color)]',
        'text-[color:var(--text-color)]',
        'border-[color:var(--border-color)]',
        'focus-visible:outline-[color:var(--focus-color)]',
      ],
      bStyle === BStyle.OUTLINE && [
        'border bg-transparent rounded-md',
        'bg-transparent hover:bg-[color:var(--hover-color)]',
        'text-[color:var(--text-color)]',
        'border-[color:var(--border-color)]',
        'focus-visible:outline-[color:var(--focus-color)]',
      ],
      bStyle === BStyle.INLINE && [
        'border-0 rounded-md underline',
        'bg-transparent hover:bg-[color:var(--hover-color)]',
        'text-[color:var(--text-color)]',
        'focus-visible:outline-[color:var(--focus-color)]',
      ],

      // Add outline style for focusing
      'outline-2 outline-offset-1 focus-visible:outline',
    ]"
  >
    <slot name="left-icon"></slot>

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
          'h-6 w-6 ml-2',
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
  INLINE = 'inline',
}
export enum BTheme {
  BALI_HAI = 'b-theme-bali-hai',
  BOURBON = 'b-theme-bourbon',
  CHALET_GREEN = 'b-theme-chalet-green',
  DI_SERRIA = 'b-theme-di-serria',
  EMPRESS = 'b-theme-empress',
  MALLARD = 'b-theme-mallard',
  OFF_YELLOW = 'b-theme-off-yellow',
  OFF_YELLOW_LIGHT = 'b-theme-off-yellow-light',
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
  'left-icon': {};
}>();
</script>
