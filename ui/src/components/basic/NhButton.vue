<template>
  <component
    :is="as ?? 'button'"
    :class="[
      'nh-button',
      'flex flex-row flex-nowrap justify-between',
      'px-3 py-2.5',
      // Apply Styles.
      {
        'border rounded-md': !bStyle || bStyle === ButtonStyle.SOLID,
        'border-2 bg-transparent rounded-md': bStyle === ButtonStyle.OUTLINE,
      },
      // Apply Default Themes
      (!bTheme || bTheme === DefaultTheme.BALI_HAI) && [
        'bg-nh-bali-hai-700 text-nh-bali-hai-100 hover:bg-nh-bali-hai-800',
        'border border-nh-bali-hai-950/50',
        'outline-2 outline-offset-1',
        'focus-visible:outline focus-visible:outline-nh-bali-hai-950',
      ],
      bTheme === DefaultTheme.CHALET_GREEN && [
        'bg-nh-bali-hai-700 text-nh-chalet-green-100 hover:bg-nh-chalet-green-800',
        'border border-nh-chalet-green-950/50',
        'outline-2 outline-offset-1',
        'focus-visible:outline focus-visible:outline-nh-chalet-green-950',
      ],
    ]"
  >
    <span class="nh-button-text text-base font-semibold">
      <slot
        ><span class="nh-button-default-text">{{ text }}</span></slot
      >
    </span>

    <slot name="right-icon">
      <LoadingSpinner
        v-if="isLoading"
        class="h-6 w-6"
      />
    </slot>
  </component>
</template>

<script lang="ts">
export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINE = 'outline',
}
export enum DefaultTheme {
  BALI_HAI = 'bali-hai',
  CHALET_GREEN = 'chalet-green',
}
</script>

<script setup lang="ts">
import LoadingSpinner from '../LoadingSpinner.vue';

export interface NhButtonProps {
  /** An optional value indicating what base-component the button should embody. @default button */
  as?: string;

  /** An optional value indicating the style of the button. @default SOLID */
  bStyle?: ButtonStyle;

  /**
   * An optional value to presume styling upon the button without specific classes.
   * Can be used in conjunction with classes to tweak styles.
   * @default BALI_HAI
   */
  bTheme?: DefaultTheme;

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
