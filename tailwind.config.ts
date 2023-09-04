import type { Config } from 'tailwindcss';
import { applyThemeToTailwindConfig } from './src/core/plugins/TailwindConfigAdapter';

const LocalConfig: Config = {
  content: ['./index.html', './src/components/**/*', './src/dashboard/**/*'],
};

export default applyThemeToTailwindConfig(LocalConfig);
