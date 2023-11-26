import FormsPlugin from '@tailwindcss/forms';
import TypographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import createPlugin from 'tailwindcss/plugin';
import type { KeyValuePair, RecursiveKeyValuePair } from 'tailwindcss/types/config';

const BaseThemeColors = {
  'nh-chalet-green': {
    '50': '#f6f7ee',
    '100': '#eaedda',
    '200': '#d6dcba',
    '300': '#bbc591',
    '400': '#a1ae6d',
    '500': '#84934f',
    '600': '#606c38',
    '700': '#4f5a31',
    '800': '#41492b',
    '900': '#383f28',
    '950': '#1d2112',
    DEFAULT: '#606c38',
  },
  'nh-mallard': {
    '50': '#f5faeb',
    '100': '#e9f3d4',
    '200': '#d4e8ae',
    '300': '#b6d87e',
    '400': '#9ac556',
    '500': '#7caa38',
    '600': '#5f8729',
    '700': '#4a6823',
    '800': '#3d5321',
    '900': '#283618',
    '950': '#1a260d',
    DEFAULT: '#283618',
  },
  'nh-off-yellow': {
    '50': '#fefae0',
    '100': '#fff7c2',
    '200': '#ffec89',
    '300': '#ffd945',
    '400': '#fdc412',
    '500': '#edaa05',
    '600': '#cc8202',
    '700': '#a35b05',
    '800': '#86480d',
    '900': '#723b11',
    '950': '#431d05',
    DEFAULT: '#fefae0',
  },
  'nh-di-serria': {
    '50': '#fcf8f0',
    '100': '#f8eedc',
    '200': '#f0dab8',
    '300': '#e7c18a',
    '400': '#dda15e',
    '500': '#d5863a',
    '600': '#c66f30',
    '700': '#a55729',
    '800': '#844628',
    '900': '#6b3b23',
    '950': '#391c11',
    DEFAULT: '#dda15e',
  },
  'nh-bourbon': {
    '50': '#fcf8ee',
    '100': '#f6ebcf',
    '200': '#ecd79b',
    '300': '#e3bd66',
    '400': '#dca743',
    '500': '#d38a2d',
    '600': '#bc6c25',
    '700': '#9b4e22',
    '800': '#7f3f21',
    '900': '#69341e',
    '950': '#3b1a0d',
    DEFAULT: '#bc6c25',
  },
  'nh-bali-hai': {
    '50': '#f5f6f8',
    '100': '#ecf1f3',
    '200': '#dce4e9',
    '300': '#c7d2da',
    '400': '#afbcca',
    '500': '#9aa8ba',
    '600': '#8e9aaf',
    '700': '#707b92',
    '800': '#5c6577',
    '900': '#4e5561',
    '950': '#2e3238',
    DEFAULT: '#8e9aaf',
  },
  'nh-empress': {
    '50': '#f8f7f8',
    '100': '#f2f1f2',
    '200': '#e7e3e5',
    '300': '#d4cdd1',
    '400': '#b9adb4',
    '500': '#a1939b',
    '600': '#887880',
    '700': '#72646b',
    '800': '#60545a',
    '900': '#52494e',
    '950': '#2f282b',
    DEFAULT: '#887880',
  },
};

// Add prefix and friendly names
const ThemeColors = Object.assign({}, BaseThemeColors, {
  'nh-dark-green': BaseThemeColors['nh-chalet-green'].DEFAULT,
  'nh-darkest-green': BaseThemeColors['nh-mallard'].DEFAULT,
  'nh-whiteish': BaseThemeColors['nh-off-yellow'].DEFAULT,
  'nh-light-orange': BaseThemeColors['nh-di-serria'].DEFAULT,
  'nh-dark-orange': BaseThemeColors['nh-bourbon'].DEFAULT,
  'nh-gray-blue': BaseThemeColors['nh-bali-hai'].DEFAULT,
  'nh-gray-pink': BaseThemeColors['nh-empress'].DEFAULT,
});

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: ThemeColors,
      boxShadow: {
        'inner-lg': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
      },
      spacing: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
      },
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      margin: {
        auto: 'auto',
      },
    },
  },
  plugins: [
    FormsPlugin,
    TypographyPlugin,
    /** TailwindDuotonePlugin */
    createPlugin(({ matchUtilities, theme }) => {
      type Ret = string | RecursiveKeyValuePair;
      const toColorValue = (input: Ret | ((opts: {}) => Ret)): Ret =>
        typeof input === 'function' ? input({}) : input;

      const flattenColorPalette = (colors: RecursiveKeyValuePair): KeyValuePair =>
        Object.assign(
          {},
          ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
            typeof values == 'object'
              ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                  [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
                }))
              : [{ [`${color}`]: values }]
          )
        );

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
    }),
  ],
} satisfies Config;
