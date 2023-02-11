import React, { memo, useEffect, useReducer, useRef, useMemo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { getCurrentSolitaire, getNominalsFromChain, permutations } from './helpers';
import s from './ChainPermutation.sass';
import { Solitaire } from '../../core/Solitaire';
import { factorial } from '../../utils/math';

export type ChainPermutationProps = {
  className?: string;
  value: string;
  onStop: () => void;
  onStart: () => void;
  onPause: () => void;
};

enum ChainPermutationMode {
  PAUSE,
  RUNNING,
}

export type ChainPermutationState = {
  items: Solitaire[];
  chain: string[];
  mode: ChainPermutationMode;
  nominals: string[];
};

enum ChainPermutationActionType {
  PAUSE,
  START,
  STOP,
  ADD,
}

export type ChainPermutationActionAdd = { type: ChainPermutationActionType.ADD; payload: string[] };
export type ChainPermutationActionRunning = { type: ChainPermutationActionType.START; payload: string };

export type ChainPermutationAction =
  | { type: ChainPermutationActionType.PAUSE }
  | { type: ChainPermutationActionType.STOP }
  | ChainPermutationActionRunning
  | ChainPermutationActionAdd;

const reducer = (state: ChainPermutationState, action: ChainPermutationAction): ChainPermutationState => {
  switch (action.type) {
    case ChainPermutationActionType.ADD: {
      return {
        ...state,
        items: [
          ...(state.items || []),
          new Solitaire(getCurrentSolitaire(Solitaire.parseString(state.chain.join(' ')).split(' '), action.payload)),
        ],
      };
    }

    case ChainPermutationActionType.PAUSE:
      return { ...state, mode: ChainPermutationMode.PAUSE };

    case ChainPermutationActionType.STOP:
      return { ...state, mode: ChainPermutationMode.PAUSE, nominals: [], items: [] };

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

export const ChainPermutation = memo<ChainPermutationProps>(({ className, value }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    mode: ChainPermutationMode.PAUSE,
    nominals: [],
    chain: [],
  });

  const generator = useRef<Generator<string[]>>();
  useEffect(() => {
    if (state.nominals.length === 0) {
      generator.current = null;
    }
  }, [state.nominals.length]);

  useEffect(() => {
    let id: number;
    if (state.mode === ChainPermutationMode.RUNNING) {
      generator.current = generator.current || permutations(state.nominals);
      const func = (): void => {
        const { value: v, done } = generator.current.next();
        if (!done) {
          dispatch({ type: ChainPermutationActionType.ADD, payload: v });
          id = setTimeout(func);
        }
      };
      func();
    }
    return (): void => clearTimeout(id);
  }, [state.mode, state.nominals]);

  const count = useMemo(() => factorial(state.nominals.length), [state.nominals.length]);

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
      {`${state.items?.length} / ${count}`}
    </div>
  );
});

ChainPermutation.displayName = 'ChainPermutation';
