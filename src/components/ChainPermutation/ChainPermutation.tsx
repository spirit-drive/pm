import React, { memo, useEffect, useReducer, useRef, useMemo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { getCurrentSolitaire, getNominalsFromChain, permutations } from './helpers';
import { Solitaire } from '../../core/Solitaire';
import { factorial } from '../../utils/math';
import { ChainData } from '../BaseChains/types';
import { BaseChainsMenu } from '../BaseChains/BaseChainsMenu';
import { HexagramSearchFiltersState } from '../HexagramSearchFilters';
import s from './ChainPermutation.sass';

export type ChainPermutationProps = {
  className?: string;
  filters: HexagramSearchFiltersState;
  value: string;
  setValue: (value: string) => void;
};

enum ChainPermutationMode {
  PAUSE,
  RUNNING,
}

export type ChainPermutationState = {
  items: ChainData[];
  chain: string[];
  mode: ChainPermutationMode;
  nominals: string[];
  filters: HexagramSearchFiltersState;
};

enum ChainPermutationActionType {
  PAUSE,
  START,
  STOP,
  ADD,
  SET_FILTERS,
}

export type ChainPermutationActionAdd = { type: ChainPermutationActionType.ADD; payload: string[] };
export type ChainPermutationActionRunning = { type: ChainPermutationActionType.START; payload: string };
export type ChainPermutationActionSetFilters = {
  type: ChainPermutationActionType.SET_FILTERS;
  payload: HexagramSearchFiltersState;
};

export type ChainPermutationAction =
  | { type: ChainPermutationActionType.PAUSE }
  | { type: ChainPermutationActionType.STOP }
  | ChainPermutationActionSetFilters
  | ChainPermutationActionRunning
  | ChainPermutationActionAdd;

const reducer = (state: ChainPermutationState, action: ChainPermutationAction): ChainPermutationState => {
  switch (action.type) {
    case ChainPermutationActionType.ADD: {
      if (state.mode === ChainPermutationMode.PAUSE) return state;
      const { filters } = state;
      const solitaire = new Solitaire(
        getCurrentSolitaire(Solitaire.parseString(state.chain.join(' ')).split(' '), action.payload)
      );
      const { balancePotential } = solitaire;
      if (balancePotential < filters.potential.gte || balancePotential > filters.potential.lte) return state;

      const { selfBalancing } = solitaire;
      if (
        (selfBalancing?.length || 0) < filters.selfBalancingCount.gte ||
        (selfBalancing?.length || 0) > filters.selfBalancingCount.lte
      ) {
        return state;
      }

      const { selfBalancingToString } = solitaire;
      const hexagrams: string[] = selfBalancingToString?.split(' ').reduce((acc, item) => {
        acc.push(...item.split(';'));
        return acc;
      }, []);
      if (hexagrams && filters.include.values.length) {
        const countInclude = hexagrams.reduce((sum, item) => {
          if (filters.include.values.includes(item)) return sum + 1;
          return sum;
        }, 0);
        if (countInclude < filters.include.count.gte || countInclude > filters.include.count.lte) return state;
      }
      if (hexagrams && filters.exclude.values.length) {
        const countExclude = hexagrams.reduce((sum, item) => {
          if (filters.exclude.values.includes(item)) return sum + 1;
          return sum;
        }, 0);
        if (countExclude < filters.exclude.count.gte || countExclude > filters.exclude.count.lte) return state;
      }
      return {
        ...state,
        items: [
          ...(state.items || []),
          {
            selfBalancing: solitaire.selfBalancingToString,
            hexagrams: solitaire.hexagramsToString,
            chain: solitaire.chainAdvanced,
          },
        ],
      };
    }

    case ChainPermutationActionType.PAUSE:
      return { ...state, mode: ChainPermutationMode.PAUSE };

    case ChainPermutationActionType.STOP:
      return { ...state, mode: ChainPermutationMode.PAUSE, nominals: [], items: [] };

    case ChainPermutationActionType.SET_FILTERS:
      return { ...state, filters: action.payload };

    case ChainPermutationActionType.START:
      return {
        ...state,
        mode: ChainPermutationMode.RUNNING,
        chain: action.payload.split(' '),
        nominals: getNominalsFromChain(action.payload),
      };

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: never = action;
      return state;
    }
  }
};

export const ChainPermutation = memo<ChainPermutationProps>(({ className, filters, setValue, value }) => {
  const [iteration, setIteration] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    mode: ChainPermutationMode.PAUSE,
    nominals: [],
    chain: [],
    filters,
  });

  useEffect(() => {
    dispatch({ type: ChainPermutationActionType.SET_FILTERS, payload: filters });
  }, [filters]);

  const generator = useRef<Generator<string[]>>();
  useEffect(() => {
    if (state.nominals.length === 0) {
      generator.current = null;
      setIteration(0);
    }
  }, [state.nominals.length]);

  useEffect(() => {
    let id: number;
    if (state.mode === ChainPermutationMode.RUNNING) {
      generator.current = generator.current || permutations(state.nominals);
      const func = (): void => {
        const { value: v, done } = generator.current.next();
        if (!done) {
          setIteration((l) => l + 1);
          dispatch({ type: ChainPermutationActionType.ADD, payload: v });
          id = setTimeout(func);
        }
      };
      func();
    }
    return (): void => clearTimeout(id);
  }, [state.mode, state.nominals]);

  const count = useMemo(() => (value ? factorial(getNominalsFromChain(value).length) : 1), [value]);

  return (
    <div className={cn(s.root, className)}>
      <Button onClick={(): void => dispatch({ type: ChainPermutationActionType.START, payload: value })}>
        Начать перетасовку номиналов
      </Button>
      <Button onClick={(): void => dispatch({ type: ChainPermutationActionType.PAUSE })}>
        Приостановить перетасовку номиналов
      </Button>
      <Button onClick={(): void => dispatch({ type: ChainPermutationActionType.STOP })}>
        Остановить перетасовку номиналов
      </Button>
      <div>{`Найдено ${state.items?.length}. Прогресс ${iteration} / ${count}`}</div>
      <BaseChainsMenu className={s.result} data={state.items} onChoose={setValue} />
    </div>
  );
});

ChainPermutation.displayName = 'ChainPermutation';
