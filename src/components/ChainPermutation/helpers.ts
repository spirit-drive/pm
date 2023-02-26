import { SolitaireBasis } from '../../core/SolitaireBasis';
import { HexagramSearchFiltersState } from '../HexagramSearchFilters';

export const getNominalsFromChain = (value: string): string[] => [
  ...SolitaireBasis.parseString(value)
    .split(' ')
    .reduce((acc, item) => acc.add(item[0]), new Set<string>()),
];

export const getAllNominalsFromChain = (value: string): string[] => [
  ...SolitaireBasis.parseString(value)
    .split(' ')
    .reduce((acc, item) => {
      acc.push(item[0]);
      return acc;
    }, []),
];

export function* permutations<T>(arr: T[], m: T[] = []): Generator<T[]> {
  if (arr.length === 0) {
    yield m;
  } else {
    for (let i = 0; i < arr.length; i++) {
      const curr = [...arr];
      const next = curr.splice(i, 1);
      yield* permutations(curr, m.concat(next));
    }
  }
}

const map = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'l', 'k'];

export const getCurrentSolitaire = (now: string[], permutation: string[]): string => {
  const nom = getNominalsFromChain(now.join(' '));
  let raw: string = now.join(' ');
  nom.forEach((item, i) => {
    raw = raw.replaceAll(item, map[i]);
  });
  permutation.forEach((item, i) => {
    raw = raw.replaceAll(map[i], item);
  });
  return raw;
};

export const isInsideRandle = (number: number, { gte, lte }: { gte: number; lte: number }): boolean =>
  number >= gte && number <= lte;

export const getSuitableHexCount = (hexagrams: string[], suitable: string[]): number =>
  hexagrams.reduce((sum, item) => (suitable.includes(item) ? sum + 1 : sum), 0);

export const isUnsuitableHex = (hexagrams: string[], filters: HexagramSearchFiltersState): boolean => {
  if (!hexagrams) return false;
  if (filters.include.values.length) {
    const count = getSuitableHexCount(hexagrams, filters.include.values);
    if (!isInsideRandle(count, filters.include.count)) return true;
  }
  if (filters.exclude.values.length) {
    const count = getSuitableHexCount(hexagrams, filters.exclude.values);
    if (!isInsideRandle(count, filters.exclude.count)) return true;
  }
  return false;
};
