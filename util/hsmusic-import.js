import * as path from 'node:path';

import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const HSMUSIC_PATH =
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..', '..', 'code');

const {imports: HSMUSIC_IMPORTS} =
  JSON.parse(readFileSync(path.join(HSMUSIC_PATH, 'package.json')));

export default function hsmusicImport(key) {
  return import(path.resolve(HSMUSIC_PATH, HSMUSIC_IMPORTS[key]));
}
