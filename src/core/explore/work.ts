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
  console.log(_solitaire.join(' '));
  return _solitaire.length === 2;
};

export const getSolitaire = (length: number): string[] => {
  const res = [];
  for (let i = 0; i < length; i++) {
    // res.push(`${Math.ceil(i / 2) % 2}${Math.ceil(i / 2 + 0.5) % 2}`); // 01 11
    // res.push(`${Math.ceil(i / 2 + 0.5) % 2}${Math.ceil(i / 2) % 2}`); // 10 11
    // res.push(`${Math.ceil(i / 2) % 2}${Math.ceil(i / 2 + 1) % 2}`); // 01 10
    // res.push(`${Math.ceil(i / 2 + 1) % 2}${Math.ceil(i / 2) % 2}`); // 01 10
    // res.push(`${Math.ceil(i / 2) % 2}${Math.ceil(i / 2 + 1.5) % 2}`); // 00 10
    // res.push(`${Math.ceil(i / 2 + 1.5) % 2}${Math.ceil(i / 2) % 2}`); // 00 01
    // res.push(`${(Math.ceil(i / 2) + 1) % 2}${Math.ceil(i / 2) % 2}`); // 10 01
    // res.push(`${Math.ceil(i / 2) % 2}${(Math.ceil(i / 2) + 1) % 2}`); // 01 10
    // res.push(`${(Math.ceil(i / 2 + 0.5) + 1) % 2}${Math.ceil(i / 2) % 2}`); // 00 01
    // res.push(`${(Math.ceil(i / 2 + 0.5) + 1) % 2}${Math.ceil(i / 2 + 0.5) % 2}`); // 01 01
    // res.push(`${Math.ceil(i / 2) % 2}${(Math.ceil(i / 2 + 0.5) + 1) % 2}`); // 00 10
    // res.push(`${Math.ceil(i / 2 + 0.5) % 2}${(Math.ceil(i / 2 + 0.5) + 1) % 2}`); // 10 10
    // res.push(`${Math.ceil(i / 2 + 3) % 2}${(Math.ceil(i / 2 + 4) + 1) % 2}`); // 11 00
    // res.push(`${Math.ceil(i / 2) % 2}${Math.ceil(i / 2 + 0.5) % 2}`); // 01 11
    // res.push(`${Math.ceil(i / 2 + 0.5) % 2}${Math.ceil(i / 2) % 2}`); // 10 11
    // res.push(`${Math.ceil(i / 2 + 1) % 2}${Math.ceil(i / 2 + 1.5) % 2}`); // 10 00
  }
  // console.log('res', res.join(' '));
  res.push('00');
  return res;
};

export const work = (): unknown => {
  const solitaire = getSolitaire(8);
  console.log(solitaire.join(' '), isSolitaire(solitaire));
  return isSolitaire(solitaire) && isMaxEfl(solitaire);
};

// 10 11 01 11 (01 11 4) 10 00 01 11 10 11 (10 11 10) 01 00 10 11 01 00 10 11 01 00 10 00 (10 00 22) 01 11 10 00 01 11 00 (11 00 29) 00 11 11 00 00 11 00 (36)
