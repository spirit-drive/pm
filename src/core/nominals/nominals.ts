/* eslint-disable no-continue */

import { CyrillicNominal } from '../types';

const nominals = [
  CyrillicNominal.six,
  CyrillicNominal.seven,
  CyrillicNominal.eight,
  CyrillicNominal.nine,
  CyrillicNominal.X,
  CyrillicNominal.jack,
  CyrillicNominal.queen,
  CyrillicNominal.king,
  CyrillicNominal.ace,
];

export const getAllNominalCombination = (): string[] => {
  const results = [];

  for (let i = 0; i < nominals.length; i++) {
    for (let j = 0; j < nominals.length; j++) {
      if (i === j) continue;
      for (let k = 0; k < nominals.length; k++) {
        if (i === k || k === j) continue;
        for (let l = 0; l < nominals.length; l++) {
          if (i === l || l === j || l === k) continue;
          for (let m = 0; m < nominals.length; m++) {
            if (i === m || m === l || m === k || m === j) continue;
            for (let n = 0; n < nominals.length; n++) {
              if (i === n || n === m || n === l || n === k || n === j) continue;
              for (let o = 0; o < nominals.length; o++) {
                if (i === o || o === n || o === m || o === l || o === k || o === j) continue;
                for (let p = 0; p < nominals.length; p++) {
                  if (i === p || p === o || p === n || p === m || p === l || p === k || p === j) continue;
                  for (let q = 0; q < nominals.length; q++) {
                    if (i === q || q === p || q === o || q === n || q === m || q === l || q === k || q === j) continue;
                    results.push(
                      `${nominals[i]} ${nominals[j]} ${nominals[k]} ${nominals[l]} ${nominals[m]} ${nominals[n]} ${nominals[o]} ${nominals[p]} ${nominals[q]}`
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return results;
};
