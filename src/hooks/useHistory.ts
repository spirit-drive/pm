import { useEffect, useMemo, useRef, useState } from 'react';

export const removeSpaces = (value: string): string => value?.replace(/\s/g, '');

export const useHistory = (
  value: string,
  setValue: (value: string) => void
): [string[], { back: () => void; next: () => void }] => {
  const [history, setHistory] = useState<string[]>([]);
  const wasChanged = useRef(false);
  const index = useRef<number>(-1);

  const historyCopy = useRef(history);
  useEffect(() => {
    historyCopy.current = history;
  }, [history]);

  useEffect(() => {
    setHistory((v) => {
      if (!value) return v;
      if (!/\s/.test(value)) return v;
      if (removeSpaces(v[v.length - 1]) === removeSpaces(value)) return v;
      if (wasChanged.current) {
        wasChanged.current = false;
        return v;
      }
      const newValue = [...v, value];
      index.current = newValue.length - 1;
      return newValue;
    });
  }, [value]);

  const callbacks = useMemo(
    () => ({
      back: (): void => {
        wasChanged.current = true;
        const i = index.current === 0 ? 0 : --index.current;
        setValue(historyCopy.current[i]);
      },
      next: (): void => {
        wasChanged.current = true;
        const maxIndex = historyCopy.current.length - 1;
        const i = index.current === maxIndex ? maxIndex : ++index.current;
        setValue(historyCopy.current[i]);
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

  return [history, callbacks];
};
