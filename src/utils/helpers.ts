/* global FileReader */
import deepEqual from 'fast-deep-equal';
import { BaseSyntheticEvent } from 'react';

export const isValidIp = (ip: string): boolean => /^\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(ip);

export const parseBooleanFromString = (value: string): boolean => {
  switch (value) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return null;
  }
};

export const parseStringIfIsBoolean = <T extends unknown = unknown>(value: T): T | boolean => {
  if (typeof value !== 'string') return value;
  switch (value) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return value;
  }
};

export const parseBoolean = (value: string | boolean | number): boolean => {
  if (typeof value === 'string') {
    return parseBooleanFromString(value);
  }
  if (typeof value === 'number') {
    return !!value;
  }
  return value;
};

export const emailPattern =
  /^[\w!#$%&'*+/=?^`{|}~-]+(:?\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export const isValidEmail = (email: string): boolean => emailPattern.test(email);

export const stopPropagation = (e: Event | BaseSyntheticEvent): void => {
  e.stopPropagation();
};

export const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result as string);
    reader.onerror = (error): void => reject(error);
  });

export const getBinaryString = (file: Blob): Promise<FileReader['result']> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (): void => resolve(reader.result);
    reader.onerror = (error): void => reject(error);
  });

export const getArrayWithOnlyUniqItems = <T>(array: T[]): T[] => [...new Set(array)];

export const formatInt = (value: string): string => value.replace(/\D/g, '');
export const formatFloat = (value: string): string => {
  const result = value
    .replace(/\s/g, '')
    .replace(/,/g, '.')
    .match(/\d+(\.\d*)?/);
  return result && result[0];
};

export const getPreparedValueInput = (
  value: string,
  params?: { maxLengthString?: number; maxValue?: number; isFloat?: boolean }
): string => {
  const { maxLengthString, maxValue, isFloat = false } = params || {};
  const format = isFloat ? formatFloat : formatInt;
  let prepared = format(value);
  if (prepared) {
    if (maxLengthString) {
      prepared = prepared.slice(0, maxLengthString);
    }
    if (maxValue && parseFloat(prepared) > maxValue) {
      prepared = maxValue.toString();
    }
  }
  return prepared;
};

export const setDotForWhole = (value: string, countDigitsAfterDot = 2): string => {
  const res = value.replace(/[\s,.]/g, '').split('') as string[];
  if (res.length <= countDigitsAfterDot) {
    res.splice(0, 0, ...Array(countDigitsAfterDot - (res.length - 1)).fill('0'));
  }
  res.splice(res.length - countDigitsAfterDot, 0, '.');
  return res.join('');
};

export const removeFirstZeros = (value: string): string => value.replace(/^[0]+(\d+([.,]\d{2})?)$/, '$1');

export const getBeautifulNumber = (value: string, separator = ' '): string =>
  value?.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const formatByThreeDigit = (
  value: unknown,
  params?: { asWhole?: boolean; emptyValue?: unknown; separator?: string; countDigitsAfterDot?: number }
): string => {
  const { asWhole = false, emptyValue = 0, separator = ' ', countDigitsAfterDot = 2 } = params || {};
  if (!value && value !== 0) return emptyValue as string;

  const res = removeFirstZeros(value.toString());
  if (asWhole) {
    return getBeautifulNumber(setDotForWhole(res, countDigitsAfterDot), separator);
  }
  return getBeautifulNumber(res, separator);
};

export const onlyFirstPathname = (pathname: string): string => pathname.replace(/^(\/[^\s/\\]+)(\/.*)*/, '$1');

export const mobileAndTabletCheck = (): boolean => {
  const a = navigator.userAgent || navigator.vendor || (window as Window & typeof globalThis & { opera: string }).opera;
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br[ev]w|bumb|bw-[nu]|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do[cp]o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly[-_]|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-[mpt]|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      a.substr(0, 4)
    )
  );
};

export const isMobile = mobileAndTabletCheck();

export const safeDecrease = (number: number, edge = 0): number => (number <= edge ? edge : number - 1);

export const isNotMac = !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

export const rounding = (number: number, accuracy = 2, type: 'ceil' | 'floor' | 'round' = 'round'): number => {
  const helper = 10 ** accuracy;
  return Math[type](number * helper) / helper;
};

type Filters = { [key: string]: [unknown[]] };
export const changeFilters = (filters?: Filters, oldFilters?: Filters): Filters | undefined => {
  if (!filters || typeof filters !== 'object') {
    return undefined;
  }
  if (!oldFilters || typeof oldFilters !== 'object') {
    return filters;
  }
  const keys = Object.keys(filters);
  const oldKeys = Object.keys(oldFilters);
  const add: Filters = {};
  oldKeys
    .filter((k) => !keys.includes(k))
    .forEach((k) => {
      add[k] = [[]];
    });
  return { ...filters, ...add };
};

export const changePlaceItem = <T>(array: T[], dragIndex: number, dropIndex: number): T[] => {
  const result = [...array];
  result.splice(dragIndex, 1);
  result.splice(dropIndex, 0, array[dragIndex]);
  return result;
};

export const areEqualsArrays = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const copy = [...arr2];
  for (let i = 0; i < arr1.length; i++) {
    const index = copy.findIndex((c) => c === arr1[i]);
    if (index === -1) {
      return false;
    }
    copy.splice(index, 1);
  }
  return !copy.length;
};

/**
 * Вычитает один массив из другого. Возвращает массив из остатков от изначальных массивов.
 * Первый остаток - это arr1 без значений, которые встречаются в arr2
 * Второй остаток - это arr2 без значений, которые встречаются в arr1
 * */
export const diffArrays = <T>(
  arr1: T[],
  arr2: T[],
  comparison: (a: T, b: T) => boolean = (a, b): boolean => a === b
): [T[], T[]] => {
  const residue1 = [...arr1];
  const forCycle = [...arr1];
  const residue2 = [...arr2];
  let countDeleted = 0;
  for (let i = 0; i < forCycle.length; i++) {
    const index = residue2.findIndex((c) => comparison(c, forCycle[i]));
    if (index !== -1) {
      residue1.splice(i - countDeleted++, 1);
      residue2.splice(index, 1);
    }
  }
  return [residue1, residue2];
};

export const getCommonAndOther = <
  T extends string | number | boolean,
  Common extends T[] = T[],
  Other extends T[] = T[]
>(
  base: T[],
  target: T[]
): [Common, Other] => {
  const common = [] as Common;
  const targetCopy = [...target];
  for (let i = 0; i < base.length; i++) {
    const index = targetCopy.findIndex((t) => t === base[i]);
    if (index !== -1) {
      common.push(...targetCopy.splice(index, 1));
    }
  }
  return [common, targetCopy as Other];
};

export const getNOD = (...args: number[]): number => {
  let x = args[0];
  for (let i = 1; i < args.length; i++) {
    let y = args[i];
    while (x && y) {
      if (x > y) {
        x %= y;
      } else {
        y %= x;
      }
    }
    x += y;
  }
  return x;
};

export const copyObjectExcludingKeys = <T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  keys: K[]
): Omit<T, K> => {
  const result = {} as T;
  (Object.keys(target) as K[]).forEach((key) => {
    if (!keys.includes(key)) {
      result[key] = target[key];
    }
  });
  return result;
};

export const getExtensions = (name: string): string => name.split('.').reverse()[0];

export const checkName = (name: string, extensions: string[]): boolean => !extensions.includes(name);

export const EXTENSIONS_IMAGE = ['png', 'jpg', 'jpeg', 'svg'];

export const checkNameImages = (name: string, extensions?: string[]): boolean =>
  checkName(name, extensions || EXTENSIONS_IMAGE);

export const checkFile = (file: File, extensions: string[]): boolean =>
  !!file && !!file.name && checkName(getExtensions(file.name), extensions);

export const checkFileImage = (file: File, extensions?: string[]): boolean =>
  !!file && !!file.name && checkNameImages(getExtensions(file.name), extensions);

export const deepCopy = <T extends unknown | unknown[]>(target: T): T => {
  if (!target || typeof target !== 'object') return target;

  if (Array.isArray(target)) {
    return target.map(deepCopy) as T;
  }

  const res = {} as Record<string, unknown>;
  Object.keys(target).forEach((key) => {
    res[key] = deepCopy((target as Record<string, unknown>)[key]);
  });
  return res as T;
};

export const shallowCopy = <T extends unknown | unknown[]>(target: T): T => {
  if (!target || typeof target !== 'object') return target;

  if (Array.isArray(target)) {
    return [...target] as unknown as T;
  }

  return { ...(target as T as Record<string, unknown>) } as T;
};

export const isCorrectValue = (value: unknown): boolean => (typeof value === 'number' ? !Number.isNaN(value) : true);

export const isExist = (value: unknown): boolean => value !== undefined && value !== null && isCorrectValue(value);

export const escapeSpecialSymbolsMain = (value: string): string | never => {
  if (value.length !== 1) {
    throw new Error(`value length should be equal 1, but it is: ${value.length}`);
  }
  if (/^[[\\^$.|?*+()/]$/.test(value)) {
    return `\\${value}`;
  }
  return value;
};

export const validatedEscapeSpecialSymbols = (value: string): string => {
  try {
    return escapeSpecialSymbolsMain(value);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return value;
  }
};

export const escapeSpecialSymbols = (value: string): string => validatedEscapeSpecialSymbols(value);

export const escapeSpecialSymbolsString = (value: string): string =>
  value
    .split('')
    .map((v) => validatedEscapeSpecialSymbols(v))
    .join('');

export const getParentByCondition = <T extends HTMLElement = HTMLElement>(
  e: Event,
  isEqual: (parent: HTMLElement) => boolean
): T => {
  let { target } = e;
  while (target instanceof window.HTMLElement && target.parentElement) {
    if (isEqual(target.parentElement)) {
      return target.parentElement as T;
    }
    target = target.parentElement;
  }
  return null;
};

export const getLast = <T extends unknown = string>(data: T[]): T => data[data.length - 1];

export const returnCorrectedState = <T extends Record<string, unknown>>(previousState: T, newState: T): T => {
  if (deepEqual(previousState, newState)) return previousState;
  return newState;
};

export const isInvalidNameLength = (name: string): boolean => name.length > 100;

export const sortByArchived = <T extends { archived: boolean }>(any: T[]): T[] =>
  any &&
  any.sort((a, b) => {
    if (a.archived && !b.archived) return 1;
    if (b.archived && !a.archived) return -1;
    return 0;
  });

export const createPreventFastCallback = (): ((callback: () => void, timeout?: number) => void) => {
  let timeoutId: number = null;
  return (callback, timeout = 30): void => {
    if (timeoutId !== null) return;
    timeoutId = window.setTimeout(() => {
      callback();
      timeoutId = null;
    }, timeout);
  };
};

export const toInt = (value: string | number): number => {
  if (typeof value === 'number') return value;
  return parseInt(value.replace(/\D/g, ''), 10);
};
export const toFloat = (value: string | number): number => {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(/[^\d.]/g, ''));
};

export const isExpired = (date: string): boolean => {
  if (!date) return false;
  return new Date() > new Date(date);
};
