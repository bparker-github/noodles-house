import { applyThemeToTailwindConfig } from './tailwind.theme';
import type { Config } from 'tailwindcss';

const LocalConfig: Config = {
  content: ['./index.html', './src/core/**/*', './src/dashboard/**/*'],
};

const updated = applyThemeToTailwindConfig(LocalConfig);

export default updated;
