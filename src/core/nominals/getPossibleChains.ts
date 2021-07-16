import { Random } from 'random-js';
import { InvalidChain } from '../Errors';

const random = new Random();

const isSympathy = (card1: string, card2: string): boolean => card1[0] === card2[0] || card1[1] === card2[1];

const convergeRaw = (
  chain: string[],
  {
    handlePassive,
    handleActive,
    handleTransit,
  }: {
    handleActive: (string: string) => void;
    handlePassive: (string: string) => void;
    handleTransit: (string: string) => void;
  }
): void => {
  for (let i = 2; i < chain.length; i++) {
    if (i === 2) handlePassive(chain[0]);
    if (i === chain.length - 1) handleActive(chain[i]);

    if (isSympathy(chain[i - 2], chain[i])) {
      handleActive(chain[i - 1]);
      handleTransit(chain[i]);
      handlePassive(chain.splice(i - 2, 1)[0]);

      convergeRaw(chain, { handlePassive, handleActive, handleTransit });
      break;
    }
  }
};

const elf35 = [
  '11',
  '21',
  '31',
  '41',
  '51',
  '61',
  '71',
  '81',
  '91',
  '12',
  '22',
  '32',
  '42',
  '52',
  '62',
  '72',
  '82',
  '92',
  '13',
  '23',
  '33',
  '43',
  '53',
  '63',
  '73',
  '83',
  '93',
  '14',
  '24',
  '34',
  '44',
  '54',
  '64',
  '74',
  '84',
  '94',
];

const converge = (chain: string[]): Record<string, string> => {
  const chain1 = [...chain];
  const yins: string[] = [];
  const yans: string[] = [];
  // const transits: string[] = [];
  convergeRaw(chain1, {
    handleTransit: () => {
      // if (transits.includes(v)) return;
      // transits.push(v);
    },
    handleActive: (v) => {
      if (yans.includes(v) || yins.includes(v)) return;
      yans.push(v);
    },
    handlePassive: (v) => {
      if (yans.includes(v) || yins.includes(v)) return;
      yins.push(v);
    },
  });
  if (chain1.length === 2) {
    const key = chain
      .map((item) => {
        if (yins.includes(item)) return '-';
        if (yans.includes(item)) return '+';
        throw new Error(`item not yin or yan! item: "${item}"`);
      })
      .join(' ');
    return { [key]: chain.join(' ') };
  }
  throw new InvalidChain(chain1.join(' '));
};

// const converge = (chain: string[]): string[] => {
//   const result = [...chain];
//   const yins: string[] = [];
//   const yans: string[] = [];
//   // const transits: string[] = [];
//   convergeRaw(result, {
//     handleTransit: () => {
//       // if (transits.includes(v)) return;
//       // transits.push(v);
//     },
//     handleActive: (v) => {
//       if (yans.includes(v) || yins.includes(v)) return;
//       yans.push(v);
//     },
//     handlePassive: (v) => {
//       if (yans.includes(v) || yins.includes(v)) return;
//       yins.push(v);
//     },
//   });
//   if (result.length === 2) return result;
//   throw new InvalidChain(result.join(' '));
// };

export const getPossibleChains = (): Record<string, string> => {
  const result: Record<string, string> = {};
  let i = 10000000;
  while (i--) {
    try {
      const chain = random.shuffle(elf35);
      Object.assign(result, converge(chain));
    } catch (e) {
      //
    }
  }
  return result;
};
// export const getPossibleChains = (): string[] => {
//   const set = new Set<string>();
//   let i = 10000000;
//   while (i--) {
//     try {
//       const chain = random.shuffle(elf35);
//       converge(chain);
//       set.add(chain.join(' '));
//     } catch (e) {
//       // console.log(e.message);
//       //
//     }
//   }
//   return [...set];
// };
