/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
import {join} from 'path';

import {rootDir} from '../utils/env';

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@assets': join(rootDir, '/src/assets'),
  '@components': join(rootDir, '/src/components'),
  '@images': join(rootDir, '/src/images'),
  '@styles': join(rootDir, '/src/styles'),
  '@typescript': join(rootDir, '/src/typescript'),
};
