import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useNavigate } from '../../hooks/useNavigate';

export const useSaveToUrl = (value: string, setValue: Dispatch<SetStateAction<string>>): void => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;

  const searchCopy = useRef(search);
  searchCopy.current = search;

  useEffect(() => {
    try {
      const $value = qs.parse(searchCopy.current);
      setValue($value.value as string);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }, [setValue]);

  useEffect(() => {
    if (value) {
      navigate({ addToSearch: { value: value.replace(/!\d*\s/, '').replace(/\s/g, '') } });
    } else {
      navigate({ removeKeysFromSearch: ['value'] });
    }
  }, [navigate, value]);
};
