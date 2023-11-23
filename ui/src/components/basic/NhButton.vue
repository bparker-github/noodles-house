<template>
  <component
    :is="as ?? 'button'"
    :class="[
      'nh-button',
      'flex flex-row flex-nowrap',
      'px-3 py-2.5 shadow-sm',
      // Apply Styles.
      {
        'border rounded-md': !bStyle || bStyle === ButtonStyle.SOLID,
        'border-2 bg-transparent rounded-md': bStyle === ButtonStyle.OUTLINE,
      },
      // Apply Default Themes
      {
        'bg-nh-bali-hai-700 text-nh-bali-hai-100 hover:bg-nh-bali-hai-800':
          !bTheme || bTheme === DefaultTheme.BALI_HAI,
      },
    ]"
  >
    <span class="nh-button-text text-base font-semibold">
      <slot
        ><span class="nh-button-default-text">{{ text }}</span></slot
      >
    </span>
  </component>
</template>

<script lang="ts">
export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINE = 'outline',
}
export enum DefaultTheme {
  BALI_HAI = 'bali-hai',
}
</script>

<script setup lang="ts">
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
}
defineProps<NhButtonProps>();
</script>
