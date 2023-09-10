import createPlugin from 'tailwindcss/plugin';
import type { KeyValuePair, RecursiveKeyValuePair } from 'tailwindcss/types/config';

function toColorValue(
  input: string | RecursiveKeyValuePair | ((opts: {}) => string | RecursiveKeyValuePair)
): string | RecursiveKeyValuePair {
  return typeof input === 'function' ? input({}) : input;
}

function flattenColorPalette(colors: RecursiveKeyValuePair): KeyValuePair {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
          }))
        : [{ [`${color}`]: values }]
    )
  );
}

const TailwindDuotonePlugin = createPlugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      duo: (colorVal) => ({
        '--nood-duotone-primary': toColorValue(colorVal),
      }),
      duo2: (colorVal) => ({
        '--nood-duotone-secondary': toColorValue(colorVal),
      }),
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: ['color', 'any'],
    }
  );
});

export default TailwindDuotonePlugin;
