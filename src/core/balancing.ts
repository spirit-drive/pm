import {
  Balance,
  BalanceValue,
  HexagramItemValue,
  HexagramMold,
  Hexagrams,
  HexagramsMold,
  HexagramValue,
  LineBalance,
  Nominal,
  Suits,
} from './types';
import { getEnergySuitKeys, nominalsOnLineMap, yinYanToLineBalance } from './helpers';

export class InvalidCombinationInput extends Error {}

export const combinationBasis = <T = unknown>(
  lines: T[][],
  result: T[][] = [],
  lineResult: T[] = [],
  lineIndex = 0
): T[][] => {
  const line = lines[lineIndex];
  if (!line) return null;
  for (let i = 0; i < line.length; i++) {
    const item = line[i];
    if (lineResult.length === lines.length - 1) {
      result.push([...lineResult, item]);
    }
    combinationBasis(lines, result, [...lineResult, item], lineIndex + 1);
  }
  return result;
};

export const getCombination = <T = unknown>(data: T[][]): T[][] => {
  if (!Array.isArray(data)) throw new InvalidCombinationInput(`invalid data: ${JSON.stringify(data)}`);
  return combinationBasis<T>(data);
};

export type SuitLineData = {
  balance: LineBalance;
  value: HexagramItemValue;
  mold: HexagramMold;
};

export type LineData = Record<Suits, SuitLineData>;

export const getMoldByLineIndex = (nominal: Nominal[], hexagramsMold: HexagramsMold, suit: Suits): HexagramMold => {
  const result: HexagramMold = {} as HexagramMold;
  nominal.forEach((item) => {
    result[item] = hexagramsMold[suit][item];
  });
  return result;
};

export const getBalanceByNominals = (mold: HexagramMold, nominals: Nominal[]): LineBalance =>
  nominals.reduce((acc, nominal) => acc + yinYanToLineBalance[mold[nominal]], 0) as LineBalance;

export const moldToLineData = (
  balanceValue: BalanceValue,
  lineIndex: number,
  hexagramsMold: HexagramsMold
): LineData => {
  const suits = Object.keys(hexagramsMold) as Suits[];
  const result: LineData = {} as LineData;
  const nominals = nominalsOnLineMap[lineIndex];
  suits.forEach((suit) => {
    const mold = getMoldByLineIndex(nominals, hexagramsMold, suit);
    result[suit] = { mold, balance: getBalanceByNominals(mold, nominals), value: mold[nominals[0]] };
  });
  return result;
};

export const getLinesData = (balance: Balance, hexagramsMold: HexagramsMold): LineData[] =>
  balance.map((item, i) => moldToLineData(item, i, hexagramsMold));

export const canLineBeBalanced = (lineBalance: BalanceValue, lineData: LineData): boolean => {
  if (Math.abs(lineBalance) === 2) {
    const suits = Object.keys(lineData) as Suits[];
    const sum = suits.reduce((acc, suit) => {
      if (lineData[suit].balance === 0) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return sum >= 2;
  }
  if (Math.abs(lineBalance) === 1) {
    const suits = Object.keys(lineData) as Suits[];
    return suits.some((suit) => lineData[suit].balance === 0);
  }
  return true;
};

export const canBeBalanced = (balance: Balance, hexagramsMold: HexagramsMold): boolean => {
  if (balance[2] !== 0 || balance[4] !== 0 || balance[5] !== 0) return false;
  const lineData = getLinesData(balance, hexagramsMold);
  return balance.every((line, i) => canLineBeBalanced(line, lineData[i]));
  // [{ hearts: { balance: 0, value: 1, mold: { 6: 1, 7: 0 } } }]
};

const addToPossibleLine = (possibleLines: LineData[][], index: number, data: LineData): void => {
  if (Array.isArray(possibleLines[index])) {
    possibleLines[index].push(data);
  } else {
    possibleLines[index] = [data]; // eslint-disable-line no-param-reassign
  }
};

export const inverseValue = (value: HexagramItemValue): HexagramItemValue => {
  if (value === 1) return 0;
  return 1;
};

export const inverseMoldValue = (value: HexagramMold): HexagramMold => {
  const nominal = Object.keys(value) as Nominal[];
  const result = {} as HexagramMold;
  nominal.forEach((key) => {
    result[key] = inverseValue(value[key]);
  });
  return result;
};

export const getPossibleLines = (balance: Balance, hexagramsMold: HexagramsMold): LineData[][] => {
  const possibleLines: LineData[][] = [];
  balance.forEach((line, i) => {
    const mold = moldToLineData(line, i, hexagramsMold);
    if (line === 0) {
      addToPossibleLine(possibleLines, i, mold);
      return;
    }
    // Берем только те масти, чья линия не сбалансирована и текущее значение совпадает с суммарным значением баланса
    const energySuitKeys = getEnergySuitKeys(line, mold);
    energySuitKeys.forEach((suit) => {
      addToPossibleLine(possibleLines, i, {
        ...mold,
        [suit]: { ...mold[suit], value: inverseValue(mold[suit].value), mold: inverseMoldValue(mold[suit].mold) },
      });
    });
  });
  return possibleLines;
};

export const linesDataToHexagrams = (data: LineData[][]): Hexagrams[] =>
  data?.map<Hexagrams>((lineData) => {
    const result: Hexagrams = {} as Hexagrams;
    lineData?.forEach((lineDataItem) => {
      const suits = Object.keys(lineDataItem) as Suits[];
      suits.forEach((suit) => {
        if (Array.isArray(result[suit])) {
          result[suit].push(lineDataItem[suit].value);
        } else {
          result[suit] = [lineDataItem[suit].value] as unknown as HexagramValue;
        }
      });
    });
    return result;
  });
