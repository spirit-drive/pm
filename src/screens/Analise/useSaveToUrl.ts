import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from '../../hooks/useNavigate';

export const useSaveToUrl = (value: string, setValue: Dispatch<SetStateAction<string>>): void => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = useMemo(() => location.search, [location.search]);

  const searchCopy = useRef(search);
  useEffect(() => {
    searchCopy.current = search;
  }, [search]);

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
      navigate({ addToSearch: { value: value.replace(/\s/g, '') } });
    } else {
      navigate({ removeKeysFromSearch: ['value'] });
    }
  }, [navigate, value]);
};
