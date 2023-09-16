import { applyThemeToTailwindConfig } from './src/plugins/TailwindConfigAdapter';
import type { Config } from 'tailwindcss';

const LocalConfig: Config = {
  content: ['./index.html', './src/components/**/*', './src/dashboard/**/*'],
};

export default applyThemeToTailwindConfig(LocalConfig);
