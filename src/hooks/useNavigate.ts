import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import * as qs from 'query-string';

type History = H.History;

export type NavigateOptionsForSearch = {
  /**
   * the object that is containing the key-value. used for adding variables to the search of the url
   * */
  addToSearch?: Record<string, string>;
  /**
   * array of the keys. they will be removed from the search of the url
   * */
  removeKeysFromSearch?: string[];
};

export type NavigateOptions = NavigateOptionsForSearch & {
  /**
   * if true - the company id will be removed from the url
   * */
  toRoot?: boolean;
  /**
   * the react-router state. if undefined - previous state will be used
   * */
  state?: unknown;
};

export type Navigate = (to: string, options?: NavigateOptions) => void;

export type SafeSavedData = {
  pathname: string;
  search: string;
  savedState: unknown;
  historyPush: History['push'];
};

export const getSearch = (
  search: string,
  {
    addToSearch = {},
    removeKeysFromSearch,
  }: { addToSearch?: NavigateOptions['addToSearch']; removeKeysFromSearch?: NavigateOptions['removeKeysFromSearch'] }
): string => {
  const data = qs.parse(search);
  const newData = { ...data, ...addToSearch };
  if (removeKeysFromSearch) {
    removeKeysFromSearch.forEach((key) => {
      delete newData[key];
    });
  }
  return qs.stringify(newData);
};

const getRepairedPath = (pathname: string, to: string): string => {
  if (pathname.endsWith('/')) {
    return to;
  }
  if (pathname.startsWith('/')) {
    return `${pathname}/${to}`;
  }
  return `/${pathname}/${to}`;
};

export const getPath = ({ to, pathname }: { pathname: string; to: string }): string => {
  if (!to) return pathname;

  if (!to.startsWith('/')) {
    return getRepairedPath(pathname, to);
  }

  return to;
};

export const getToWithSearch = (
  to: string,
  search: string,
  {
    addToSearch,
    removeKeysFromSearch,
  }: { addToSearch?: NavigateOptions['addToSearch']; removeKeysFromSearch?: NavigateOptions['removeKeysFromSearch'] }
): string => {
  const newSearch = getSearch(search, { removeKeysFromSearch, addToSearch });
  if (!to && !newSearch) return '';
  if (!newSearch) return to;
  return `${to}?${newSearch}`;
};

export type ParamsForNavigate = {
  toWithSearch: string;
  state: unknown;
};

const getParamsForNavigate = ({
  to,
  options,
  search,
}: {
  to: string | NavigateOptionsForSearch;
  options: NavigateOptions;
  search: string;
}): ParamsForNavigate => {
  if (typeof to === 'string' || to === undefined || to === null) {
    const { removeKeysFromSearch, addToSearch, state } = options || {};
    const toWithSearch = getToWithSearch(to as string, search, { removeKeysFromSearch, addToSearch });
    return { state, toWithSearch };
  }
  const { removeKeysFromSearch, addToSearch } = to || {};
  const toWithSearch = getToWithSearch('', search, { removeKeysFromSearch, addToSearch });
  return { state: undefined, toWithSearch };
};

interface Navigator {
  navigate(to: string, options?: NavigateOptions): void;
  navigate(options: NavigateOptionsForSearch): void;
}

function createNavigate(safeSavedData: MutableRefObject<SafeSavedData>): Navigator['navigate'] {
  return (to: string | NavigateOptionsForSearch, options?: NavigateOptions): void => {
    const { pathname, historyPush, savedState, search } = safeSavedData.current;
    const { state, toWithSearch } = getParamsForNavigate({ to, search, options });
    const path = getPath({ pathname, to: toWithSearch });
    historyPush(path, state || savedState);
  };
}

export const getPathWithoutLastSlash = (path: string): string => {
  if (path.endsWith('/')) return path.slice(0, -1);
  return path;
};

export const joinPath = (path: string, id: string): string => `${path}/${id}`;

export const useCreateLinkToId = (): ((id: string) => string) => {
  const match = useRouteMatch();
  return useCallback((id: string): string => joinPath(match.path, id), [match.path]);
};

export function useNavigate(): Navigator['navigate'] {
  const history = useHistory();
  const historyPush = useMemo(() => history.push, [history.push]);
  const location = useLocation();
  const { pathname, search, savedState } = useMemo(
    () => ({ pathname: location.pathname, search: location.search, savedState: location.state }),
    [location.pathname, location.search, location.state]
  );

  const safeSavedData = useRef<SafeSavedData>({ pathname, historyPush, savedState, search });
  useEffect(() => {
    safeSavedData.current = { pathname, historyPush, savedState, search };
  }, [pathname, historyPush, savedState, search]);

  return useMemo<Navigator['navigate']>(() => createNavigate(safeSavedData), []);
}
