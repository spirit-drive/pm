import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import s from './Dashed.sass';

export type Props = {
  className?: string;
  children?: never;
  color: string;
};

export const Dashed = memo<Props>(({ className, color }) => {
  const style = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <div className={cn(s.root, className)}>
      <div style={style} className={cn(s.item, s.full)} />
      <div className={cn(s.item, s.middle)} />
      <div style={style} className={cn(s.item, s.full)} />
    </div>
  );
});
