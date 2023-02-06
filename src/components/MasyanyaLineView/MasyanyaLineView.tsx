import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import { HexagramByCodeView } from '../HexagramByCodeView';
import s from './MasyanyaLineView.sass';

export type Props = {
  className?: string;
  children?: never;
  red?: number[];
  blue?: number[];
  green?: number[];
  onClick?: (number: number) => void;
};

const hexagramms = Array(64)
  .fill('')
  .map((_, i) => i + 1);

export const MasyanyaLineView = memo<Props>(({ className, onClick = (): void => {}, red, green, blue }) => {
  const getClassName = useCallback(
    (number: number) => {
      if (red?.includes(number)) return s.red;
      if (green?.includes(number)) return s.green;
      if (blue?.includes(number)) return s.blue;
      return null;
    },
    [blue, green, red]
  );

  const handleClick = useCallback((number: number) => (): void => onClick(number), [onClick]);

  return (
    <div className={cn(s.root, className)}>
      {hexagramms.map((code) => (
        <HexagramByCodeView
          className={cn(s.item, getClassName(code))}
          code={code}
          key={code}
          onClick={handleClick(code)}
        />
      ))}
    </div>
  );
});
