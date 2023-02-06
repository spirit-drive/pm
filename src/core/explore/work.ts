// import { Random } from 'random-js';
// import { Suits } from '../types';

// const random = new Random();

export const splitBy2 = (string: string): string[] => {
  const result = [];
  const split = string.split('');
  while (split.length) {
    result.push(split.splice(0, 2).join(''));
  }
  return result;
};

export const isSympathy = (a: string, b: string): boolean => a[0] === b[0] || a[1] === b[1];
export const hasSympathy = (solitaire: string[]): boolean => {
  for (let i = 2; i < solitaire.length; i++) {
    if (isSympathy(solitaire[i - 2], solitaire[i])) return true;
  }
  return false;
};
export const isMaxEfl = (solitaire: string[]): boolean => {
  for (let i = 2; i < solitaire.length - 1; i++) {
    if (isSympathy(solitaire[i - 2], solitaire[i])) return false;
  }
  return true;
};
export const makeSolitaire = (solitaire: string[]): string[] => {
  for (let i = 2; i < solitaire.length; i++) {
    if (isSympathy(solitaire[i - 2], solitaire[i])) {
      const result = [...solitaire];
      result.splice(i - 2, 1);
      return result;
    }
  }
  return solitaire;
};

export const isSolitaire = (solitaire: string[]): boolean => {
  let _solitaire = solitaire;
  while (hasSympathy(_solitaire)) {
    _solitaire = makeSolitaire(_solitaire);
  }
  return _solitaire.length === 2;
};

const LENGTH = 34;

export const work = (number = 36): Record<string, unknown> => {
  const result = [];
  let pattern = '';
  const volumePattern: string[] = [];
  const max = 2 ** (number * 2);
  for (let i = 0; i < max; i++) {
    const string = i.toString(2);
    const solitaireString = `${'0'.repeat(number * 2 - string.length)}${string}`;
    const solitaire = splitBy2(solitaireString);
    // const isTarget = isSolitaire(solitaire);
    const isTarget = isSolitaire(solitaire) && isMaxEfl(solitaire);
    const res = isTarget ? '✅' : '❌';
    if (volumePattern[volumePattern.length - 1] && volumePattern[volumePattern.length - 1].length < LENGTH) {
      volumePattern[volumePattern.length - 1] += res;
    } else {
      volumePattern.push(res);
    }
    pattern += res;
    if (isTarget) result.push(`${res} ${solitaire.join(' ')}`);
  }
  return { result, pattern, volumePattern };
};

// 00 00 11 11 00 00 11 11 10   00 01 11 10 00 01 00
// 00 00 11 11 00 00 11 10   00 01 11 10 00 01 00
// 00 00 11 11 00 11 10   00 01 11 10 00 01 00
// 00 00 11 00 11 10   00 01 11 10 00 01 00
// 00 11 00 11 10   00 01 11 10 00 01 00
// 11 00 11 10   00 01 11 10 00 01 00
// 00 11 10   00 01 11 10 00 01 00
// 11 10   00 01 11 10 00 01 00

// 11 10 00 01 11 10 01 00
// 11 10 00 01 10 01 00
// 11 10 00 10 01 00
// 11 00 10 01 00
// 11 10 01 00
// 10 01 00
// 01 00

// Кб 7б Дч Вч 8б 6б 9ч 7ч 9б   00 01 11 10 00 01 00
// 7ч 9б   00 01 11 10 00 01 00
// 11 10 00 01 11 10 00 01 00
// 11 10 00 01 11 10 01 00
// 11 10 00 01 10 01 00
// 11 10 00 10 01 00
// 11 00 10 01 00
// 11 10 01 00
// 10 01 00
// 01 00

// 7ч 9б 00 01 11 10 00 01 00
// 7ч 9б 8к 8п Кч Вб Вп 8ч Вч
// 7ч 9б 8к 8п Кч Вб 8ч Вч
// 7ч 9б 8к 8п Вб 8ч Вч
// 7ч 9б 8к Вб 8ч Вч
// 7ч 8к Вб 8ч Вч
// 7ч Вб 8ч Вч
// Вб 8ч Вч
// 8ч Вч

// 8ч Вч

// Кб 7б Дч Вч 8б 6б 9ч 7ч 9б 8к 8п Кч Вб Вп 8ч Вч
