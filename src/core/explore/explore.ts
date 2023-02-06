import * as fs from 'fs';
import * as p from 'path';
import { work } from './work';
import * as file from './explore.json';

const newFile = { ...(file || {}), ...work() };

fs.writeFile(p.join(__dirname, 'explore.json'), JSON.stringify(newFile, null, 2), () =>
  // eslint-disable-next-line no-console
  console.log(`Количество раскладов: ${Object.keys(newFile).length}`)
);
