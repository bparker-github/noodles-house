import { type Config } from 'tailwindcss';
import { applyThemeToTailwindConfig } from './plugins/TailwindConfigAdapter';

export function generateConfigForContent(content: string[]): Config {
  return applyThemeToTailwindConfig({ content });
}
