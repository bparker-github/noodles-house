import { generateConfigForContent } from './src/tailwind/index';

export default generateConfigForContent([
  './index.html',
  './src/common/**/*',
  './src/dashboard/**/*',
  '../modules/blur-hash/src/**/*',
]);
