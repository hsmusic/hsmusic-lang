import * as path from 'node:path';

const HSMUSIC_PATH =
  path.join('..', '..', 'code');

const yamlOptions = {
  indent: 2,
  quotingType: '"',
  forceQuotes: true,
};

import {createReadStream} from 'node:fs';
import {readFile} from 'node:fs/promises';

import csv2json from 'csv2json';
import yaml from 'js-yaml';

const {empty} = await import(path.join(
  HSMUSIC_PATH, 'src', 'util', 'sugar.js'));

const {
  internalDefaultStringsFile,
  unflattenLanguageSpec,
} = await import(path.join(
  HSMUSIC_PATH, 'src', 'data', 'language.js'));

// https://stackoverflow.com/a/49428486/4633828
function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

const args = process.argv.slice(2);

if (empty(args)) {
  console.error(`provide path to CSV; outputs to stdout`);
  process.exit(1);
}

const csvobj =
  JSON.parse(
    await streamToString(
      createReadStream(args[0])
        .pipe(csv2json())));

const flat =
  Object.fromEntries(
    csvobj
      .map(({'String Key': key, 'String Value': value}) => [key, value])
      .filter(([key, value]) => value !== ''));

if (empty(Object.entries(flat).filter(([k, v]) => v))) {
  console.error(`doesn't look like that's a CSV formatted appropriately`);
  console.error(`confirm the first row is String Key,String Value`);
  process.exit(1);
}

const refPath = internalDefaultStringsFile;
const refYAML = (await readFile(refPath)).toString();
const ref = yaml.load(refYAML);

const root = unflattenLanguageSpec(flat, ref);
const outYAML = yaml.dump(root, yamlOptions);

const niceYAML =
  outYAML
    .replace(/^( *)(?!_|title)\S.*\n(?=\1\S.*\n\1 +\S)/gm, '$&\n')
    .replace(/^( +).*\n(?=(?!\1) *\S)/gm, '$&\n');

process.stdout.write(niceYAML);
