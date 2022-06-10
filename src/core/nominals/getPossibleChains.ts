// import { Random } from 'random-js';
import { Solitaire } from '../Solitaire';
import { HexagramsMap } from '../../utils/hexagrams';
// import { Suits } from '../types';
import * as nominals from './nominal-data.json';

// const random = new Random();

// const cards = [
//   '6к',
//   '7к',
//   '8к',
//   '9к',
//   'Xк',
//   'Вк',
//   'Дк',
//   'Кк',
//   'Тк',
//   '6п',
//   '7п',
//   '8п',
//   '9п',
//   'Xп',
//   'Вп',
//   'Дп',
//   'Кп',
//   'Тп',
//   '6ч',
//   '7ч',
//   '8ч',
//   '9ч',
//   'Xч',
//   'Вч',
//   'Дч',
//   'Кч',
//   'Тч',
//   '6б',
//   '7б',
//   '8б',
//   '9б',
//   'Xб',
//   'Вб',
//   'Дб',
//   'Кб',
//   'Тб',
// ];

const unnecessary = ['3', '47', '39', '29', '21', '6', '20', '23'];
const necessary = [
  '1',
  '2',
  '7',
  '11',
  '13',
  '14',
  '16',
  '18',
  '19',
  '26',
  '31',
  '32',
  '33',
  '34',
  '35',
  '37',
  '40',
  '42',
  '45',
  '46', // !!
  '49',
  '53', // ??
  '55', // !! Изобилие
];

const ovd = Solitaire.parseString(
  'Вп 6ч Тп Вк Дк Дч Кп Вб Дп 9б 10б 6п 9к 8к Кк 8ч 6к Тч 10п Кб 6б 9п 8б 9ч Дб 7б 7к Кч 10ч Вч Тб 10к 7ч 8п Тк 7п'
);

const nom = [...new Set(ovd.split(' ').map((i) => i.slice(0, -1)))];

const map = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'l', 'k'];

export const getCurrentSolitaire = (index: number): string => {
  const item = nominals[index].split(' ');
  let raw: string = ovd;
  nom.forEach((nomItem, i) => {
    raw = raw.replace(new RegExp(nomItem, 'g'), map[i]);
  });
  item.forEach((nomItem, i) => {
    raw = raw.replace(new RegExp(map[i], 'g'), nomItem);
  });
  return raw;
};

export const getPossibleChains = (): Record<string, string> => {
  const result: Record<string, string> = {};
  let i = nominals.length;
  // let i = 500000;
  const set = new Set();
  while (i--) {
    try {
      const raw = getCurrentSolitaire(i).split(' ');
      if (raw[0][0] !== 'В') continue; // eslint-disable-line no-continue
      if (raw[2][0] !== 'Т') continue; // eslint-disable-line no-continue
      if (raw[raw.length - 1][0] !== '7') continue; // eslint-disable-line no-continue

      const solitaire = new Solitaire(raw.join(' '));
      const { hexagrams, chain, balance, selfBalancing, transits } = solitaire;
      const balanceString = balance.join(',');

      if (!selfBalancing && balanceString !== '0,0,0,0,0,0') continue; // eslint-disable-line no-continue

      if (selfBalancing?.length > 1) continue; // eslint-disable-line no-continue

      const hx = [
        HexagramsMap[hexagrams.hearts.join('')],
        HexagramsMap[hexagrams.spades.join('')],
        HexagramsMap[hexagrams.clubs.join('')],
        HexagramsMap[hexagrams.diamonds.join('')],
      ].join(';');
      const selfBalancingStrings = selfBalancing?.map((item) =>
        [
          HexagramsMap[item.hearts.join('')],
          HexagramsMap[item.spades.join('')],
          HexagramsMap[item.clubs.join('')],
          HexagramsMap[item.diamonds.join('')],
        ].join(';')
      );

      const selfBalancingString = selfBalancingStrings.join(' ');
      if (set.has(selfBalancingString)) continue; // eslint-disable-line no-continue
      set.add(selfBalancingString);
      const selfBalancingHex = selfBalancingStrings[0].split(';');

      if (unnecessary.some((u) => selfBalancingHex.includes(u))) continue; // eslint-disable-line no-continue

      const count = selfBalancingHex.reduce((acc, item) => {
        if (necessary.includes(item)) return acc + 1;
        return acc;
      }, 0);

      if (count < 2) continue; // eslint-disable-line no-continue

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
          selfBalancing: selfBalancing
            ?.map((item) =>
              [
                HexagramsMap[item.hearts.join('')],
                HexagramsMap[item.spades.join('')],
                HexagramsMap[item.clubs.join('')],
                HexagramsMap[item.diamonds.join('')],
              ].join(';')
            )
            .join(' '),
          hexagrams: hx,
          // selfBalancing: selfBalancing?.map((item) => ({
          //   [Suits.hearts]: HexagramsMap[item.hearts.join('')],
          //   [Suits.spades]: HexagramsMap[item.spades.join('')],
          //   [Suits.clubs]: HexagramsMap[item.clubs.join('')],
          //   [Suits.diamonds]: HexagramsMap[item.diamonds.join('')],
          // })),
          // hexagrams: {
          //   [Suits.hearts]: HexagramsMap[hexagrams.hearts.join('')],
          //   [Suits.spades]: HexagramsMap[hexagrams.spades.join('')],
          //   [Suits.clubs]: HexagramsMap[hexagrams.clubs.join('')],
          //   [Suits.diamonds]: HexagramsMap[hexagrams.diamonds.join('')],
          // },
        },
      });
    } catch (e) {
      //
    }
  }
  return result;
};

// Вп 6ч Тп Вк Кп Дч Дк Вб Дп 9б 10б 6п 9к 10к 8к 8ч 6к Тч 10п Кб 6б 9п 8б 9ч Дб 7б 7к Кч 10ч Вч Тб Кк 7ч 8п Тк 7п
