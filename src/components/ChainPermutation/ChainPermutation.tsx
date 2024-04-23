import React, { memo, useEffect, useReducer, useRef, useMemo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { getNominalsFromChain } from './helpers';
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
  STOP,
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

const reducer = (state: ChainPermutationState, action: ChainPermutationAction): ChainPermutationState => {
  switch (action.type) {
    case ChainPermutationActionType.ADD: {
      if (state.mode === ChainPermutationMode.STOP) return state;
      const chains = action.payload;
      return {
        ...state,
        mode: ChainPermutationMode.STOP,
        items: [
          ...(state.items || []),
          ...(chains || []).map((chain) => {
            const solitaire = new Solitaire(chain);
            return {
              selfBalancing: solitaire.selfBalancingToString,
              hexagrams: solitaire.hexagramsToString,
              chain: solitaire.chainAdvanced,
            };
          }),
        ],
      };
    }

    case ChainPermutationActionType.PAUSE:
      return { ...state, mode: ChainPermutationMode.STOP };

    case ChainPermutationActionType.RESET:
      return { ...state, mode: ChainPermutationMode.STOP, items: [], chain: [] };

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
    mode: ChainPermutationMode.STOP,
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

  const timeoutId = useRef<number>();
  const stateCopy = useRef(state);
  stateCopy.current = state;

  useEffect(() => {
    let worker: Worker;
    if (state.mode === ChainPermutationMode.RUNNING) {
      worker = new Worker(new URL('./worker.ts', import.meta.url));
      worker.postMessage({ value: state.nominals, state: stateCopy.current });
      worker.addEventListener('message', (e) => {
        const { type } = e.data;
        if (type === 'iteration') {
          setIteration(e.data.data);
        } else if (type === 'end') {
          const { data: chains } = e.data;
          dispatch({ type: ChainPermutationActionType.ADD, payload: chains });
          worker.terminate();
        }
      });
    }
    const _timeoutId = timeoutId.current;
    return (): void => {
      worker?.terminate();
      clearTimeout(_timeoutId);
    };
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
          {state.mode === ChainPermutationMode.RUNNING ? 'Стоп' : 'Тасовать'}
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
