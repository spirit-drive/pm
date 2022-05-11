import * as fs from 'fs';
import * as p from 'path';
import { getPossibleChains } from './getPossibleChains';
import * as file from './possible-chains-data.json';

const newFile = { ...(file || {}), ...getPossibleChains() };

fs.writeFile(p.join(__dirname, 'possible-chains-data.json'), JSON.stringify(newFile, null, 2), () =>
  // eslint-disable-next-line no-console
  console.log(`Количество раскладов: ${Object.keys(newFile).length}`)
);
