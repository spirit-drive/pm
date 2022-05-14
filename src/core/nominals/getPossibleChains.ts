import { Random } from 'random-js';
import { Solitaire } from '../Solitaire';
import { hexagramsMap } from '../../utils/hexagrams';
import { Suits } from '../types';

const random = new Random();

const cards = [
  '6к',
  '7к',
  '8к',
  '9к',
  'Xк',
  'Вк',
  'Дк',
  'Кк',
  'Тк',
  '6п',
  '7п',
  '8п',
  '9п',
  'Xп',
  'Вп',
  'Дп',
  'Кп',
  'Тп',
  '6ч',
  '7ч',
  '8ч',
  '9ч',
  'Xч',
  'Вч',
  'Дч',
  'Кч',
  'Тч',
  '6б',
  '7б',
  '8б',
  '9б',
  'Xб',
  'Вб',
  'Дб',
  'Кб',
  'Тб',
];

export const getPossibleChains = (): Record<string, string> => {
  const result: Record<string, string> = {};
  let i = 500000;
  while (i--) {
    try {
      const raw = random.shuffle(cards);
      const solitaire = new Solitaire(raw.join(' '));
      const { hexagrams, chain, balance, selfBalancing, transits } = solitaire;
      const balanceString = balance.join(',');
      if (!selfBalancing && balanceString !== '0,0,0,0,0,0') continue; // eslint-disable-line no-continue
      const key = chain
        .map((item) => {
          const found = transits.find((t) => t.value === item);
          if (!found) return item;
          return `${found.value}!${found.efl === 1 ? '' : found.efl}`;
        })
        .join(' ');

      Object.assign(result, {
        [key]: {
          balance: balanceString,
          selfBalancing: selfBalancing?.map((item) => ({
            [Suits.hearts]: hexagramsMap[item.hearts.join('') as keyof typeof hexagramsMap],
            [Suits.spades]: hexagramsMap[item.spades.join('') as keyof typeof hexagramsMap],
            [Suits.clubs]: hexagramsMap[item.clubs.join('') as keyof typeof hexagramsMap],
            [Suits.diamonds]: hexagramsMap[item.diamonds.join('') as keyof typeof hexagramsMap],
          })),
          hexagrams: {
            [Suits.hearts]: hexagramsMap[hexagrams.hearts.join('') as keyof typeof hexagramsMap],
            [Suits.spades]: hexagramsMap[hexagrams.spades.join('') as keyof typeof hexagramsMap],
            [Suits.clubs]: hexagramsMap[hexagrams.clubs.join('') as keyof typeof hexagramsMap],
            [Suits.diamonds]: hexagramsMap[hexagrams.diamonds.join('') as keyof typeof hexagramsMap],
          },
        },
      });
    } catch (e) {
      //
    }
  }
  return result;
};
