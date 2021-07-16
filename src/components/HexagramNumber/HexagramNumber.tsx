import React, { memo } from 'react';
import cn from 'clsx';
import { HexagramValue } from '../../core/types';
import { hexagramsMap } from '../../utils/hexagrams';
import s from './HexagramNumber.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramValue;
};

export const HexagramNumber = memo<Props>(({ className, value }) => {
  if (!value) return null;
  return <div className={cn(s.root, className)}>{`#${hexagramsMap[value.join('') as keyof typeof hexagramsMap]}`}</div>;
});
