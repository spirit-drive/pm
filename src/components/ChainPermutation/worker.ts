import { getCurrentSolitaire, isInsideRandle, isUnsuitableHex, permutations } from './helpers';
import { Solitaire } from '../../core/Solitaire';
import { ChainPermutationState, StableCard } from './ChainPermutation';

const getCorrectedChain = (stableCards: StableCard[], chain: string[]): string[] => {
  const raw = [...chain];
  stableCards.forEach((card) => {
    raw.splice(card.index, 0, card.value);
  });
  return raw;
};

onmessage = function (e: MessageEvent) {
  const { value, state } = e.data as { value: string[]; state: ChainPermutationState };
  const result: string[] = [];
  let j = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const permutation of permutations(value)) {
    if (!(++j % 1000)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      postMessage({ data: j, type: 'iteration' });
    }

    const { filters } = state;
    const correctedChain = getCorrectedChain(state.stableCards, permutation);
    const solitaire = new Solitaire(
      getCurrentSolitaire(Solitaire.parseString(state.chain.join(' ')).split(' '), correctedChain)
    );
    const { balancePotential } = solitaire;
    if (!isInsideRandle(balancePotential, filters.potential)) continue;

    const { selfBalancing } = solitaire;
    const selfBalancingCount = selfBalancing?.length || 0;
    if (!isInsideRandle(selfBalancingCount, filters.selfBalancingCount)) continue;

    const { selfBalancingToString } = solitaire;
    if (selfBalancingToString) {
      const selfBalancings = selfBalancingToString?.split(' ');
      for (let i = 0; i < selfBalancings.length; i++) {
        const selfBalancingItem = selfBalancings[i];
        const hexagrams: string[] = selfBalancingItem.split(';');
        if (isUnsuitableHex(hexagrams, filters)) continue;
      }
    } else {
      const { hexagramsToString } = solitaire;
      const hexagrams: string[] = hexagramsToString.split(';');
      if (isUnsuitableHex(hexagrams, filters)) continue;
    }
    result.push(solitaire.chainAdvanced);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  postMessage({ data: j, type: 'iteration' });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setTimeout(() => postMessage({ data: result, type: 'end' }));
};
