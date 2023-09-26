import { generateConfigForContent } from '@noodles-house/tailwind';

export default generateConfigForContent([
  './index.html',
  './src/components/**/*',
  './src/dashboard/**/*',
  '../blur-hash/src/**/*',
]);
