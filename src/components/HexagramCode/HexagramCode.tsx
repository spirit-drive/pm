import React, { memo } from 'react';
import cn from 'clsx';
import { HexagramValue } from '../../core/types';
import s from './HexagramCode.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramValue;
};

export const HexagramCode = memo<Props>(({ className, value }) => {
  if (!value) return null;
  return <div className={cn(s.root, className)}>{value.join('')}</div>;
});
