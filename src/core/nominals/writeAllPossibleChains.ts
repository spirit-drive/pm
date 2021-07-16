import * as fs from 'fs';
import * as p from 'path';
import { getPossibleChains } from './getPossibleChains';

fs.writeFile(p.join(__dirname, 'possible-chains-data.json'), JSON.stringify(getPossibleChains()), () =>
  // eslint-disable-next-line no-console
  console.log('success')
);
