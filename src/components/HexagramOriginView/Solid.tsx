import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import s from './Solid.sass';

export type Props = {
  className?: string;
  children?: never;
  color: string;
};

export const Solid = memo<Props>(({ className, color }) => {
  const style = useMemo(() => ({ backgroundColor: color }), [color]);
  return <div style={style} className={cn(s.root, className)} />;
});
