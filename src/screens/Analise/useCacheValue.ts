import { Dispatch, SetStateAction, useEffect } from 'react';

export const KEY = 'solitaire-value';

export const useCacheValue = (value: string, setValue: Dispatch<SetStateAction<string>>): void => {
  useEffect(() => {
    const $value = localStorage.getItem(KEY);
    if (!$value) return;
    setValue($value);
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(KEY, value || '');
  }, [value]);
};
