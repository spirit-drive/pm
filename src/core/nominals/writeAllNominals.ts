import * as fs from 'fs';
import * as p from 'path';
import { getAllNominalCombination } from './nominals';

fs.writeFile(p.join(__dirname, 'nominal-data.json'), JSON.stringify(getAllNominalCombination()), () =>
  // eslint-disable-next-line no-console
  console.log('success')
);
