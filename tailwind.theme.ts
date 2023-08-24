import type { Config } from 'tailwindcss';
import FormsPlugin from '@tailwindcss/forms';
import TypographyPlugin from '@tailwindcss/typography';

export function applyThemeToTailwindConfig(config: Config): Config {
  return {
    ...config,
    plugins: [FormsPlugin, TypographyPlugin],
  } satisfies Config;
}
