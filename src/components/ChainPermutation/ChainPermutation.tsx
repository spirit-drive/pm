import React, { memo, useEffect, useReducer, useRef, useMemo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { getCurrentSolitaire, getNominalsFromChain, isInsideRandle, isUnsuitableHex, permutations } from './helpers';
import { Solitaire } from '../../core/Solitaire';
import { factorial } from '../../utils/math';
import { ChainData } from '../BaseChains/types';
import { BaseChainsMenu } from '../BaseChains/BaseChainsMenu';
import { HexagramSearchFiltersState } from '../HexagramSearchFilters';
import { diffArrays } from '../../utils/helpers';
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

export type StableCard = {
  index: number;
  value: string;
};

export type ChainPermutationState = {
  items: ChainData[];
  chain: string[];
  stableCards: StableCard[];
  mode: ChainPermutationMode;
  nominals: string[];
  filters: HexagramSearchFiltersState;
};

enum ChainPermutationActionType {
  PAUSE,
  START,
  RESET,
  ADD,
  SET_FILTERS,
}

export type ChainPermutationActionAdd = { type: ChainPermutationActionType.ADD; payload: string[] };
export type ChainPermutationActionRunning = {
  type: ChainPermutationActionType.START;
  payload: {
    filters: HexagramSearchFiltersState;
    value: string;
  };
};
export type ChainPermutationActionSetFilters = {
  type: ChainPermutationActionType.SET_FILTERS;
  payload: HexagramSearchFiltersState;
};

export type ChainPermutationAction =
  | { type: ChainPermutationActionType.PAUSE }
  | { type: ChainPermutationActionType.RESET }
  | ChainPermutationActionSetFilters
  | ChainPermutationActionRunning
  | ChainPermutationActionAdd;

const getNominalsAndStableCards = ({
  filters,
  value,
}: ChainPermutationActionRunning['payload']): Pick<ChainPermutationState, 'stableCards' | 'nominals'> => {
  const stableNominals = filters.stableCards?.length ? getNominalsFromChain(filters.stableCards.join(' ')) : [];
  const valueNominals = getNominalsFromChain(value);
  const stableCards: StableCard[] = stableNominals
    .reduce((acc, item) => {
      const index = valueNominals.indexOf(item);
      valueNominals.splice(index, 1);
      acc.push({ index, value: item });
      return acc;
    }, [])
    .reverse();
  const [nominals] = diffArrays(valueNominals, stableNominals);
  return {
    stableCards,
    nominals,
  };
};

const getCorrectedChain = (stableCards: StableCard[], chain: string[]): string[] => {
  const raw = [...chain];
  stableCards.forEach((card) => {
    raw.splice(card.index, 0, card.value);
  });
  return raw;
};

const reducer = (state: ChainPermutationState, action: ChainPermutationAction): ChainPermutationState => {
  switch (action.type) {
    case ChainPermutationActionType.ADD: {
      if (state.mode === ChainPermutationMode.PAUSE) return state;
      const { filters } = state;
      const correctedChain = getCorrectedChain(state.stableCards, action.payload);
      const solitaire = new Solitaire(
        getCurrentSolitaire(Solitaire.parseString(state.chain.join(' ')).split(' '), correctedChain)
      );
      const { balancePotential } = solitaire;
      if (!isInsideRandle(balancePotential, filters.potential)) return state;

      const { selfBalancing } = solitaire;
      const selfBalancingCount = selfBalancing?.length || 0;
      if (!isInsideRandle(selfBalancingCount, filters.selfBalancingCount)) return state;

      const { selfBalancingToString } = solitaire;
      if (selfBalancingToString) {
        const selfBalancings = selfBalancingToString?.split(' ');
        for (let i = 0; i < selfBalancings.length; i++) {
          const selfBalancingItem = selfBalancings[i];
          const hexagrams: string[] = selfBalancingItem.split(';');
          if (isUnsuitableHex(hexagrams, filters)) return state;
        }
      } else {
        const { hexagramsToString } = solitaire;
        const hexagrams: string[] = hexagramsToString.split(';');
        if (isUnsuitableHex(hexagrams, filters)) return state;
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

    case ChainPermutationActionType.RESET:
      return { ...state, mode: ChainPermutationMode.PAUSE, items: [], chain: [] };

    case ChainPermutationActionType.SET_FILTERS:
      return { ...state, filters: action.payload };

    case ChainPermutationActionType.START: {
      const { value, filters } = action.payload;
      const { nominals, stableCards } = getNominalsAndStableCards({ value, filters });
      return {
        ...state,
        stableCards,
        mode: ChainPermutationMode.RUNNING,
        chain: state.chain.length ? state.chain : value.split(' '),
        nominals,
      };
    }

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: never = action;
      return state;
    }
  }
};

const initializer = ({
  value,
  filters,
}: {
  value: string;
  filters: HexagramSearchFiltersState;
}): ChainPermutationState => {
  const { nominals, stableCards } = getNominalsAndStableCards({ value, filters });
  return {
    stableCards,
    items: [],
    mode: ChainPermutationMode.PAUSE,
    nominals,
    chain: value.split(' '),
    filters,
  };
};

export const ChainPermutation = memo<ChainPermutationProps>(({ className, filters, setValue, value }) => {
  const [iteration, setIteration] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, { value, filters }, initializer);

  useEffect(() => {
    dispatch({ type: ChainPermutationActionType.SET_FILTERS, payload: filters });
  }, [filters]);

  const generator = useRef<Generator<string[]>>();
  const timeoutId = useRef<number>();
  useEffect(() => {
    if (state.mode === ChainPermutationMode.RUNNING) {
      generator.current = generator.current || permutations(state.nominals);
      const func = (): void => {
        const { value: v, done } = generator.current.next();
        if (!done) {
          setIteration((l) => l + 1);
          dispatch({ type: ChainPermutationActionType.ADD, payload: v });
          timeoutId.current = setTimeout(func);
        }
      };
      func();
    }
    return (): void => clearTimeout(timeoutId.current);
  }, [state.mode, state.nominals]);

  const count = useMemo(() => factorial(state.nominals?.length || 0), [state.nominals]);
  const permutationChain = useMemo(
    () => !!state.chain.length && new Solitaire(state.chain.join(' ')).chainAdvanced,
    [state.chain]
  );

  const onPlay = (): void => {
    if (state.mode === ChainPermutationMode.RUNNING) {
      clearTimeout(timeoutId.current);
      dispatch({ type: ChainPermutationActionType.PAUSE });
    } else {
      dispatch({ type: ChainPermutationActionType.START, payload: { value, filters } });
    }
  };

  const onReset = (): void => {
    generator.current = null;
    setIteration(0);
    dispatch({ type: ChainPermutationActionType.RESET });
  };

  return (
    <div className={cn(s.root, className)}>
      <div>
        <div>Тасуем расклад</div>
        <div>{permutationChain || <MinusOutlined />}</div>
      </div>
      <div className={s.buttons}>
        <Button size="small" onClick={onPlay}>
          {state.mode === ChainPermutationMode.RUNNING ? 'Пауза' : 'Тасовать'}
        </Button>
        <Button size="small" onClick={onReset}>
          Сбросить
        </Button>
      </div>
      <div>{`Найдено ${state.items?.length}. Прогресс ${iteration} / ${count}`}</div>
      <BaseChainsMenu className={s.result} data={state.items} onChoose={setValue} />
    </div>
  );
});

ChainPermutation.displayName = 'ChainPermutation';
