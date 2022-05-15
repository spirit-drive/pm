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

const unnecessary = ['3', '47', '39', '29'];

const ovd =
  'Вб Тп 8ч Вп 7к Дп 9к 10б 7п Кб 6б 10п Кк 8к 6к 6п Дч Вч 10ч 7ч Кп Тб Дб Кч 8б 7б 6ч 9б Дк Тч 9ч 10к Вк 8п Тк 9п';

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
      if (raw[1][0] !== 'Т') continue; // eslint-disable-line no-continue
      // const solitaire = new Solitaire(raw);
      // const raw = random.shuffle(cards);
      // console.log(raw.join(' '));
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

      if (selfBalancing?.length > 1) continue; // eslint-disable-line no-continue
      // const hexs = [...new Set(Object.values(selfBalancing[0]).map((item) => HexagramsMap[item.join('')]))];
      // if (hexs.some((e) => e !== '1' && e !== '2')) continue; // eslint-disable-line no-continue
      const hx = [
        HexagramsMap[hexagrams.hearts.join('')],
        HexagramsMap[hexagrams.spades.join('')],
        HexagramsMap[hexagrams.clubs.join('')],
        HexagramsMap[hexagrams.diamonds.join('')],
      ].join(';');
      if (set.has(hx)) continue; // eslint-disable-line no-continue
      set.add(hx);
      const selfBalancingStrings = selfBalancing?.map((item) =>
        [
          HexagramsMap[item.hearts.join('')],
          HexagramsMap[item.spades.join('')],
          HexagramsMap[item.clubs.join('')],
          HexagramsMap[item.diamonds.join('')],
        ].join(';')
      );
      if (unnecessary.some((u) => selfBalancingStrings.some((s) => s.includes(u)))) continue; // eslint-disable-line no-continue
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
