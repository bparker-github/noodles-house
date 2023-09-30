import { generateConfigForContent } from './src/tailwind/index';

export default generateConfigForContent([
  './index.html',
  './src/components/**/*',
  './src/dashboard/**/*',
  '../blur-hash/src/**/*',
]);
