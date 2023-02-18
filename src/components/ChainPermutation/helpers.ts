import { SolitaireBasis } from '../../core/SolitaireBasis';

export const getNominalsFromChain = (value: string): string[] => [
  ...SolitaireBasis.parseString(value)
    .split(' ')
    .reduce((acc, item) => acc.add(item[0]), new Set<string>()),
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
