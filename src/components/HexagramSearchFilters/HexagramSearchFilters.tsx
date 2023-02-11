import React, { FC } from 'react';
import cn from 'clsx';
import s from './HexagramSearchFilters.sass';

export type HexagramSearchFiltersProps = {
  className?: string;
};

export const HexagramSearchFilters: FC<HexagramSearchFiltersProps> = ({ className }) => {
  console.log('HexagramSearchFilters');
  return <div className={cn(s.root, className)}>HexagramSearchFilters</div>;
};
