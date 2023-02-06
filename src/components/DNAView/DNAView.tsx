import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import s from './DNAView.sass';
import { HexagramByCodeView } from '../HexagramByCodeView';

export type Props = {
  className?: string;
  children?: never;
  red?: number[];
  blue?: number[];
  green?: number[];
  onClick?: (number: number) => void;
};

const map = [
  [{ class: s.zero, code: 2 }],
  [
    { class: s.u1, code: 23 },
    { class: s.d1, code: 24 },
  ],
  [
    { class: s.u2, code: 8 },
    { class: s.d2, code: 7 },
  ],
  [
    { class: s.u3, code: 20 },
    { class: s.d3, code: 19 },
  ],
  [
    { class: s.u4, code: 16 },
    { class: s.d4, code: 15 },
  ],
  [
    { class: s.u5, code: 35 },
    { class: s.d5, code: 36 },
  ],
  [
    { class: s.u6, code: 45 },
    { class: s.d6, code: 46 },
  ],
  [
    { class: s.u5, code: 12 },
    { class: s.d5, code: 11 },
  ],
  [
    { class: s.u4, code: 15 },
    { class: s.d4, code: 16 },
  ],
  [
    { class: s.u3, code: 52 },
    { class: s.d3, code: 51 },
  ],
  [
    { class: s.u2, code: 39 },
    { class: s.d2, code: 40 },
  ],
  [
    { class: s.u1, code: 53 },
    { class: s.d1, code: 54 },
  ],
  [{ class: s.zero, code: 62 }],
  [
    { class: s.u1, code: 55 },
    { class: s.d1, code: 56 },
  ],
  [
    { class: s.u2, code: 32 },
    { class: s.d2, code: 31 },
  ],
  [
    { class: s.u3, code: 34 },
    { class: s.d3, code: 33 },
  ],
  [
    { class: s.u2, code: 8 },
    { class: s.d2, code: 7 },
  ],
  [
    { class: s.u1, code: 3 },
    { class: s.d1, code: 4 },
  ],
  [{ class: s.zero, code: 29 }],
  [
    { class: s.u1, code: 59 },
    { class: s.d1, code: 60 },
  ],
  [
    { class: s.u2, code: 40 },
    { class: s.d2, code: 39 },
  ],
  [
    { class: s.u3, code: 64 },
    { class: s.d3, code: 63 },
  ],
  [
    { class: s.u4, code: 47 },
    { class: s.d4, code: 48 },
  ],
  [
    { class: s.u5, code: 6 },
    { class: s.d5, code: 5 },
  ],
  [
    { class: s.u6, code: 46 },
    { class: s.d6, code: 45 },
  ],
  [
    { class: s.u5, code: 18 },
    { class: s.d5, code: 17 },
  ],
  [
    { class: s.u4, code: 48 },
    { class: s.d4, code: 47 },
  ],
  [
    { class: s.u3, code: 57 },
    { class: s.d3, code: 58 },
  ],
  [
    { class: s.u2, code: 32 },
    { class: s.d2, code: 31 },
  ],
  [
    { class: s.u1, code: 50 },
    { class: s.d1, code: 49 },
  ],
  [{ class: s.zero, code: 28 }],
  [
    { class: s.u1, code: 43 },
    { class: s.d1, code: 44 },
  ],
  [
    { class: s.u1, code: 23 },
    { class: s.d1, code: 24 },
  ],
  [{ class: s.zero, code: 27 }],
  [
    { class: s.u1, code: 3 },
    { class: s.d1, code: 4 },
  ],
  [
    { class: s.u2, code: 42 },
    { class: s.d2, code: 41 },
  ],
  [
    { class: s.u3, code: 51 },
    { class: s.d3, code: 52 },
  ],
  [
    { class: s.u4, code: 21 },
    { class: s.d4, code: 22 },
  ],
  [
    { class: s.u5, code: 17 },
    { class: s.d5, code: 18 },
  ],
  [
    { class: s.u6, code: 25 },
    { class: s.d6, code: 26 },
  ],
  [
    { class: s.u5, code: 36 },
    { class: s.d5, code: 35 },
  ],
  [
    { class: s.u4, code: 22 },
    { class: s.d4, code: 21 },
  ],
  [
    { class: s.u3, code: 63 },
    { class: s.d3, code: 64 },
  ],
  [
    { class: s.u2, code: 37 },
    { class: s.d2, code: 38 },
  ],
  [
    { class: s.u1, code: 55 },
    { class: s.d1, code: 56 },
  ],
  [{ class: s.zero, code: 30 }],
  [
    { class: s.u1, code: 50 },
    { class: s.d1, code: 49 },
  ],
  [
    { class: s.u2, code: 14 },
    { class: s.d2, code: 13 },
  ],
  [
    { class: s.u3, code: 20 },
    { class: s.d3, code: 19 },
  ],
  [
    { class: s.u2, code: 42 },
    { class: s.d2, code: 41 },
  ],
  [
    { class: s.u1, code: 59 },
    { class: s.d1, code: 60 },
  ],
  [{ class: s.zero, code: 61 }],
  [
    { class: s.u1, code: 54 },
    { class: s.d1, code: 53 },
  ],
  [
    { class: s.u2, code: 38 },
    { class: s.d2, code: 37 },
  ],
  [
    { class: s.u3, code: 58 },
    { class: s.d3, code: 57 },
  ],
  [
    { class: s.u4, code: 10 },
    { class: s.d4, code: 9 },
  ],
  [
    { class: s.u5, code: 11 },
    { class: s.d5, code: 12 },
  ],
  [
    { class: s.u6, code: 26 },
    { class: s.d6, code: 25 },
  ],
  [
    { class: s.u5, code: 5 },
    { class: s.d5, code: 6 },
  ],
  [
    { class: s.u4, code: 9 },
    { class: s.d4, code: 10 },
  ],
  [
    { class: s.u3, code: 34 },
    { class: s.d3, code: 33 },
  ],
  [
    { class: s.u2, code: 14 },
    { class: s.d2, code: 13 },
  ],
  [
    { class: s.u1, code: 43 },
    { class: s.d1, code: 44 },
  ],
  [{ class: s.zero, code: 1 }],
];

export const DNAView = memo<Props>(({ className, onClick = (): void => {}, red, green, blue }) => {
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
      <div className={s.main}>
        {map.map((column, i) => (
          <div key={i} className={s.col}>
            {column.map((cell) => (
              <HexagramByCodeView
                key={cell.code}
                className={cn(cell.class, getClassName(cell.code))}
                onClick={handleClick(cell.code)}
                code={cell.code}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
