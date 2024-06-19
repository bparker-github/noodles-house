import { ComputedRef, computed, normalizeClass, useAttrs } from 'vue';

/**
 * A utility function to provide the ability to set default classes for general TailwindCss
 *  features like "duration".
 * For example, we want to provide 'duration-200' as a default, but want to allow users to configure
 *  using the Tailwind-css-pattern instead of a prop - computing `duration-${dur}` is an anti-pattern for
 *  tailwind to tree-shake out the existing classes. Must avoid.
 */
export function useClassDetect(toMatch: RegExp): ComputedRef<boolean> {
  const attrs = useAttrs();
  const passedClass = computed(() => normalizeClass(attrs?.['class']));
  const hasMatchedClass = computed(() => toMatch.test(passedClass.value));
  return hasMatchedClass;
}
