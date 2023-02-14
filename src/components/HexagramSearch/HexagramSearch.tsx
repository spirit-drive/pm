import React, { memo, useState } from 'react';
import cn from 'clsx';
import { ChainPermutation } from '../ChainPermutation';
import { HexagramSearchFilters, HexagramSearchFiltersState } from '../HexagramSearchFilters';
import s from './HexagramSearch.sass';

export type HexagramSearchProps = {
  className?: string;
  value: string;
  setValue: (value: string) => void;
};

const unnecessary = ['3', '47', '39', '29', '21', '6', '20', '23', '12', '41'];
const necessary = [
  '1',
  '2',
  '7', // войско
  '11',
  '13', // родня
  '14', // Владение многим
  '16', // Вольность
  '18', // исправление
  '19', // Посещение
  '26',
  '31',
  '32',
  '33',
  '34',
  '35',
  '37', // домашние
  '40',
  '42', // Приумножение
  '45', // Воссоединение
  '46', // !! Подъем
  '49',
  '53', // ??
  '55', // !! Изобилие
  '58', // радость
];

const initialValue: HexagramSearchFiltersState = {
  include: {
    values: necessary,
    count: { gte: 3, lte: 4 },
  },
  exclude: {
    values: unnecessary,
    count: { gte: 0, lte: 0 },
  },
  stableCards: [],
  potential: { gte: 1, lte: 6 },
  selfBalancingCount: { gte: 1, lte: 3 },
};

export const HexagramSearch = memo<HexagramSearchProps>(({ className, value, setValue }) => {
  const [filters, setFilters] = useState<HexagramSearchFiltersState>(initialValue);
  return (
    <div className={cn(s.root, className)}>
      <HexagramSearchFilters chain={value} value={filters} onChange={setFilters} />
      <ChainPermutation value={value} setValue={setValue} filters={filters} />
    </div>
  );
});
