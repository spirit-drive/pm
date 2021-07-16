import React, { CSSProperties, memo, useMemo } from 'react';
import cn from 'clsx';
import s from './Card.sass';

export type Props = {
  className?: string;
  children?: never;
  value: string; // Дк, 10б и т.д.
};

export const yShift: Record<string, string> = {
  [`к`]: '0',
  [`б`]: '33.33',
  [`ч`]: '66.66',
  [`п`]: '100',
};

export const xShift: Record<string, string> = {
  [`6`]: '0',
  [`7`]: '12.5',
  [`8`]: '25',
  [`9`]: '37.5',
  [`10`]: '50',
  [`x`]: '50',
  [`X`]: '50',
  [`В`]: '62.5',
  [`в`]: '62.5',
  [`Д`]: '75',
  [`д`]: '75',
  [`К`]: '87.5',
  [`к`]: '87.5',
  [`Т`]: '100',
  [`т`]: '100',
};

export const Card = memo<Props>(({ className, value }) => {
  const { x, y } = useMemo(() => {
    const last = value.slice(-1);
    const first = value.slice(0, -1);
    return {
      x: xShift[first],
      y: yShift[last],
    };
  }, [value]);

  const style = useMemo<CSSProperties>(() => ({ backgroundPositionX: `${x}%`, backgroundPositionY: `${y}%` }), [x, y]);
  return <div style={style} className={cn(s.root, className)} />;
});
