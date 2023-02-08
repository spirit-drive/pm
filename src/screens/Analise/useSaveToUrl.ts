import { useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const useSaveToUrl = (value: string, setValue: Dispatch<SetStateAction<string>>): void => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsCopy = useRef(searchParams);
  searchParamsCopy.current = searchParams;

  useEffect(() => {
    try {
      const $value = qs.parse(searchParamsCopy.current.toString());
      setValue($value.value as string);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }, [setValue]);

  useEffect(() => {
    if (value) {
      setSearchParams(new URLSearchParams({ value: value.replace(/\s/g, '') }));
    } else {
      setSearchParams(new URLSearchParams({}));
    }
  }, [value, setSearchParams]);
};
