import {
  Balance,
  BalanceValue,
  CorrectedLines,
  HexagramValue,
  HexagramCorrectedLine,
  HexagramLineData,
  HexagramMold,
  Hexagrams,
  HexagramsMold,
  HexagramItemValue,
  SelfBalance,
  Suits,
  Nominal,
  CyrillicSuits,
  CyrillicNominal,
  LineBalance,
  SuitsIcon,
} from './types';
import { hexagramsInfoMap } from '../utils/hexagrams';

export const EXCHANGE_HELPED_SYMBOL = '.';

export const initHexagramMold = (): HexagramMold => ({
  '6': null,
  '7': null,
  '8': null,
  '9': null,
  X: null,
  jack: null,
  queen: null,
  king: null,
  ace: null,
});

export const getHexagram = (mold: HexagramMold): HexagramValue => [
  mold['9'],
  mold['6'],
  mold.X,
  mold.queen,
  mold.king,
  mold.ace,
];

export const nominalsOnLineMap: Nominal[][] = [
  [Nominal.nine, Nominal.seven],
  [Nominal.six, Nominal.eight],
  [Nominal.X],
  [Nominal.queen, Nominal.jack],
  [Nominal.king],
  [Nominal.ace],
];

export const yinYanToLineBalance = [-1, 1];

export const getLineBalance = (mold: HexagramMold, imbalanceLineIndex: number): LineBalance => {
  const keys = nominalsOnLineMap[imbalanceLineIndex] as Nominal[];
  return (keys.reduce((acc, key) => acc + mold[key], 0) - 1) as LineBalance;
};

export const getLineValue = (mold: HexagramMold, imbalanceLineIndex: number): HexagramItemValue => {
  const keys = nominalsOnLineMap[imbalanceLineIndex] as Nominal[];
  return mold[keys[0]];
};

export const getImbalanceLineIndexes = (balance: Balance): number[] =>
  balance.map((v, i) => (v === 0 ? null : i)).filter((v) => v !== null);

export const getHexagramLineData = (
  { clubs, spades, diamonds, hearts }: HexagramsMold,
  imbalanceLineIndex: number
): HexagramLineData => ({
  clubs: { balance: getLineBalance(clubs, imbalanceLineIndex), value: getLineValue(clubs, imbalanceLineIndex) },
  spades: { balance: getLineBalance(spades, imbalanceLineIndex), value: getLineValue(spades, imbalanceLineIndex) },
  diamonds: {
    balance: getLineBalance(diamonds, imbalanceLineIndex),
    value: getLineValue(diamonds, imbalanceLineIndex),
  },
  hearts: { balance: getLineBalance(hearts, imbalanceLineIndex), value: getLineValue(hearts, imbalanceLineIndex) },
});

export const isMayBePredict = ({ clubs, spades, diamonds, hearts }: HexagramLineData): boolean => {
  const { length } = [spades.balance, diamonds.balance, hearts.balance, clubs.balance].filter((v) => !v);
  return length > 0;
};

export const lineBalanceAsHexagramValue = (lineBalance: BalanceValue): HexagramItemValue => {
  if (lineBalance < 0) return 0;
  return 1;
};

export const getEnergySuitKeys = (
  lineBalance: BalanceValue,
  { clubs, spades, diamonds, hearts }: HexagramLineData
): Suits[] =>
  [
    { value: clubs.value, balance: clubs.balance, suit: Suits.clubs },
    { value: spades.value, balance: spades.balance, suit: Suits.spades },
    { value: diamonds.value, balance: diamonds.balance, suit: Suits.diamonds },
    { value: hearts.value, balance: hearts.balance, suit: Suits.hearts },
  ]
    .filter(({ value, balance }) => balance === 0 && value === lineBalanceAsHexagramValue(lineBalance))
    .map(({ suit }) => suit);

export const balanceValueToHexagramValue = (value: BalanceValue): HexagramItemValue =>
  (Math.ceil(value / 2) * -1 + 1) as HexagramItemValue;

export const getCorrectedCardsForBalance = (
  lineBalance: BalanceValue,
  imbalanceLineIndex: number
): HexagramCorrectedLine => {
  const lineKey = nominalsOnLineMap[imbalanceLineIndex];
  const corrected = {} as Record<Nominal, HexagramItemValue>;
  lineKey.forEach((key) => {
    corrected[key] = balanceValueToHexagramValue(lineBalance);
  });
  return corrected;
};

export const getNextKey = (key: keyof CorrectedLines): keyof CorrectedLines => {
  switch (key) {
    case '0':
      return '1';

    case '1':
      return '3';

    default:
      return null;
  }
};

export const hexagramsEngine = ({ clubs, spades, diamonds, hearts }: HexagramsMold): Hexagrams => ({
  spades: getHexagram(spades),
  diamonds: getHexagram(diamonds),
  clubs: getHexagram(clubs),
  hearts: getHexagram(hearts),
});

export const mergeHexagramsMold = (
  hexagramsMold: HexagramsMold,
  suit: Suits,
  value: HexagramCorrectedLine
): HexagramsMold => ({
  ...hexagramsMold,
  [suit]: { ...hexagramsMold[suit], ...value },
});

export const getCorrectedKey = (key: keyof CorrectedLines, correctedLines: CorrectedLines): keyof CorrectedLines => {
  let next = key;
  do {
    if (correctedLines[next]) return next;
    next = getNextKey(key);
  } while (next);
  return null;
};

export const combinations = (
  {
    correctedLines,
    key,
    hexagramsMold,
  }: {
    correctedLines: CorrectedLines;
    key: keyof CorrectedLines;
    hexagramsMold: HexagramsMold;
  },
  result: SelfBalance = []
): void => {
  if (!Object.keys(correctedLines).length) return;
  const correctedKey = getCorrectedKey(key, correctedLines);
  if (!correctedKey) return;
  for (let i = 0; i < correctedLines[correctedKey].length; i++) {
    const { suit, value } = correctedLines[correctedKey][i];
    const nextKey = getNextKey(correctedKey);
    if (nextKey && correctedLines[nextKey]) {
      combinations(
        {
          correctedLines,
          key: nextKey,
          hexagramsMold: mergeHexagramsMold(hexagramsMold, suit, value),
        },
        result
      );
    } else {
      result.push(hexagramsEngine(mergeHexagramsMold(hexagramsMold, suit, value)));
    }
  }
};

export const valueToHexagram: Record<string, Nominal> = {
  [CyrillicNominal.six]: Nominal.six,
  [CyrillicNominal.seven]: Nominal.seven,
  [CyrillicNominal.eight]: Nominal.eight,
  [CyrillicNominal.nine]: Nominal.nine,
  [CyrillicNominal.X]: Nominal.X,
  [CyrillicNominal.jack]: Nominal.jack,
  [CyrillicNominal.queen]: Nominal.queen,
  [CyrillicNominal.king]: Nominal.king,
  [CyrillicNominal.ace]: Nominal.ace,
};

export const suitToHexagram: Record<CyrillicSuits, Suits> = {
  [CyrillicSuits.spades]: Suits.spades,
  [CyrillicSuits.diamonds]: Suits.diamonds,
  [CyrillicSuits.clubs]: Suits.clubs,
  [CyrillicSuits.hearts]: Suits.hearts,
};

export const getHexagramInfo = (hexagramStrings: Record<Suits, string>, suits: Suits): string =>
  `${SuitsIcon[suits]}️ #${hexagramStrings[suits]} ${hexagramsInfoMap[hexagramStrings[suits]].title}`;

export const getTotalHexagramInfo = (
  hexagramStrings: Record<Suits, string>,
  selfBalancingStrings: Record<Suits, string>[],
  suits: Suits
): string => {
  const main = getHexagramInfo(hexagramStrings, suits);
  if (!selfBalancingStrings?.length) return main;
  const other = selfBalancingStrings?.map((item) => getHexagramInfo(item, suits));
  if (main === other[0]) return other.join(' ');
  return [main, other.join(' ')].join(' ');
};
