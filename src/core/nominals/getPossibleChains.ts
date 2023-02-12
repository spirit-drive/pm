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
  '7', // войско
  '11',
  '13', // родня
  '14', // Владение многим
  '16', // Вольность
  '18', // исправление
  '19', // Посещение
  '26',
  '31',
  '32',
  '33',
  '34',
  '35',
  '37', // домашние
  '40',
  '42', // Приумножение
  '45', // Воссоединение
  '46', // !! Подъем
  '49',
  '53', // ??
  '55', // !! Изобилие
  '58', // радость
];

// 'Вч 9п Тч 7к 9б Дп 7б 7п 6к Кп 6ч 8к 8б 10п Тп 6п Тк 8ч Кч 9к Дч 8п Кб Вп 9ч Тб 10б Вк 10к Вб 10ч Кк 6б Дк 7ч Дб'
// 'Вч 8п Тч 6к 8б Кп 6б 6п Дк 9п Дч 7к 7б 10п Тп Дп Тк 7ч 9ч 8к Кч 7п 9б Вп 8ч Тб 10б Вк 10к Вб 10ч 9к Дб Кк 6ч Кб'
// 'Вч Тп Тч 10б 9б 8к Кб 7ч Кч Кк 7п 8ч 6б Дб 9к Дч Тб 6к 7б Вп 6п 7к 9ч Тк 6ч Вб 10ч Дк 8б 9п Дп 10п 10к 8п Вк Кп'
// 'Вч Тп Тч Дб 8б 10к Кб 6п Кп Кк 6ч 10п 7б 9б 8к 9п Тб 7к 6б Вп 7ч 6к 8п Тк 7п Вб Дп 9к 10б 8ч 9ч Дч Дк 10ч Вк Кч'

const ovd = Solitaire.parseString(
  '6к 7ч 7б 6б 6ч 7п 7к Тч 6п Кб Тк 8ч Кп 10б 8к Дч 10п 8б Дк 9ч 8п Вб 9к 10ч Вп Дб 10к Кч 9б Дп Кк Вч 9п Тб Вк Тп'
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
      // if (raw[0] !== 'Вч') continue; // eslint-disable-line no-continue
      // if (raw[1] !== '9п') continue; // eslint-disable-line no-continue
      // if (raw[2] !== 'Тч') continue; // eslint-disable-line no-continue
      // if (raw[31] !== '10ч' && raw[31] !== 'Дч') continue; // eslint-disable-line no-continue
      // if (
      //   raw[30] !== '10ч' &&
      //   raw[31] !== '10ч' &&
      //   raw[32] !== '10ч' &&
      //   raw[33] !== '10ч' &&
      //   raw[34] !== '10ч' &&
      //   raw[35] !== '10ч' &&
      //   raw[29] !== '10ч'
      // )
      //   continue; // eslint-disable-line no-continue
      // if (raw[raw.length - 1][0] !== '7') continue; // eslint-disable-line no-continue

      const solitaire = new Solitaire(raw.join(' '));
      const { balance, selfBalancing, balancePotential } = solitaire;
      const balanceString = balance.join(',');

      if (balancePotential < 1) continue;

      if (!selfBalancing && balanceString !== '0,0,0,0,0,0') continue; // eslint-disable-line no-continue

      if (selfBalancing?.length > 1) continue; // eslint-disable-line no-continue

      const hx = solitaire.hexagramsToString;
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

      if (count < 4) continue; // eslint-disable-line no-continue

      const key = solitaire.chainAdvanced;

      Object.assign(result, {
        [key]: {
          balance: balanceString,
          selfBalancing: solitaire.selfBalancingToString,
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
