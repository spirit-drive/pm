import React, { FC } from 'react';
import cn from 'clsx';
import s from './HexagramSearch.sass';

export type HexagramSearchProps = {
  className?: string;
};

export const HexagramSearch: FC<HexagramSearchProps> = ({ className }) => {
  console.log('HexagramSearch');
  return <div className={cn(s.root, className)}>HexagramSearch</div>;
};
