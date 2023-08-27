import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import defaultColors from 'tailwindcss/colors';
import FormsPlugin from '@tailwindcss/forms';
import TypographyPlugin from '@tailwindcss/typography';
import TailwindDuotonePlugin from './TailwindDuotonePlugin';

const BaseThemeColors = {
  'chalet-green': {
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
  mallard: {
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
  'off-yellow': {
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
  'di-serria': {
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
  bourbon: {
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
  'bali-hai': {
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
  empress: {
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

const { inherit, white, black, transparent, current } = defaultColors;

export function applyThemeToTailwindConfig(config: Config): Config {
  // Add friendly names
  const themeColors = Object.assign({}, BaseThemeColors, {
    'dark-green': BaseThemeColors['chalet-green'].DEFAULT,
    'darkest-green': BaseThemeColors.mallard.DEFAULT,
    whiteish: BaseThemeColors['off-yellow'].DEFAULT,
    'light-orange': BaseThemeColors['di-serria'].DEFAULT,
    'dark-orange': BaseThemeColors.bourbon.DEFAULT,
    'gray-blue': BaseThemeColors['bali-hai'].DEFAULT,
    'gray-pink': BaseThemeColors.empress.DEFAULT,
  });

  return {
    ...config,
    theme: {
      colors: {
        inherit,
        white,
        black,
        transparent,
        current,
        ...themeColors,
      },
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [FormsPlugin, TypographyPlugin, TailwindDuotonePlugin],
  } satisfies Config;
}
