import { useEffect, useMemo, useRef, useState } from 'react';
import { SolitaireBasis } from '../core/SolitaireBasis';

export type HistoryType = string[];

export const removeSpaces = (string: string): string => string.replace(/\s/g, '');
export const prepare = (string: string): string => removeSpaces(SolitaireBasis.parseString(string));

export const isValueEqualLastItem = (value: string, lastItem: string): boolean => prepare(value) !== prepare(lastItem);

export const useHistory = (
  value: string,
  setValue: (value: string) => void
): [{ history: HistoryType; first: boolean; last: boolean; index: number }, { back: () => void; next: () => void }] => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<HistoryType>(['']);
  const wasChanged = useRef(false);

  const copy = useRef({ history, index });
  useEffect(() => {
    copy.current = { history, index };
  }, [history, index]);

  const prevValue = useRef<string>();
  useEffect(() => {
    if (prevValue.current !== prepare(value)) {
      if (wasChanged.current) {
        wasChanged.current = false;
      } else if (isValueEqualLastItem(value, copy.current.history[copy.current.history.length - 1])) {
        const newValue = ((): HistoryType =>
          // if (copy.current.history.length - 1 !== copy.current.index) {
          //   return [...copy.current.history.slice(0, copy.current.index + 1), prepare(value)];
          // }
          [...copy.current.history, prepare(value)])();
        setIndex(newValue.length - 1);
        setHistory(newValue);
      }
    }
    prevValue.current = prepare(value);
  }, [value]);

  const callbacks = useMemo(
    () => ({
      back: (): void => {
        wasChanged.current = true;
        const i = copy.current.index <= 0 ? 0 : --copy.current.index;
        setIndex(i);
        setValue(copy.current.history[i]);
      },
      next: (): void => {
        wasChanged.current = true;
        const maxIndex = copy.current.history.length - 1;
        const i = copy.current.index >= maxIndex ? maxIndex : ++copy.current.index;
        setIndex(i);
        setValue(copy.current.history[i]);
      },
    }),
    [setValue]
  );

  const { back, next } = callbacks;

  useEffect(() => {
    const fn = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && !e.altKey && !e.shiftKey) {
        back();
      } else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && !e.altKey && e.shiftKey) {
        next();
      }
    };
    window.addEventListener('keydown', fn);
    return (): void => {
      window.removeEventListener('keydown', fn);
    };
  }, [back, next]);

  return [{ history, first: index === history.length - 1, last: index === 0, index }, callbacks];
};
