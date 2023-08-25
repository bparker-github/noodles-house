import TailwindPlugin from 'tailwindcss';
import AutoPrefixerPlugin from 'autoprefixer';

import tailwindConfig from './tailwind.config';

export default {
  plugins: [TailwindPlugin(tailwindConfig), AutoPrefixerPlugin],
};
