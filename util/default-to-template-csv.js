import * as path from 'node:path';

const HSMUSIC_PATH =
  path.join('..', '..', 'code');

import {readFile} from 'node:fs/promises';

import yaml from 'js-yaml';

const {
  internalDefaultStringsFile,
  flattenLanguageSpec,
} = await import(path.join(
  HSMUSIC_PATH, 'src', 'data', 'language.js'));

const refPath = internalDefaultStringsFile;
const refYAML = (await readFile(refPath)).toString();
const ref = yaml.load(refYAML);

const header = [
  {
    title: `Reviewed?`,
    what: () => 'FALSE',
  },
  {
    title: `Sign-off`,
    what: () => '',
  },
  {
    title: `String Key`,
    what: entry => entry[0],
  },
  {
    title: `Reference (English)`,
    what: entry => entry[1],
  },
  {
    title: `Used Reference (English)`,
    what: entry => entry[1],
  },
  {
    title: `String Value`,
    what: () => '',
  },
  {
    title: `Comments`,
    what: () => '',
  },
];

const entries = Object.entries(flattenLanguageSpec(ref));

const headerRow =
  header
    .map(({title}) => title)
    .map(cell => JSON.stringify(cell))
    .join(',');

const entryRows =
  entries
    .map(entry => header
      .map(({what}) => what(entry))
      .map(cell => JSON.stringify(cell))
      .join(','));

console.log([headerRow, ...entryRows].join('\n'));
