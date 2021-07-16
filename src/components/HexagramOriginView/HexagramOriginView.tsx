import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { HexagramValue } from '../../core/types';
import { random } from '../../utils/random';
import { Solid } from './Solid';
import { Dashed } from './Dashed';
import { getHexagramColor } from '../../utils/hexagrams';
import s from './HexagramOriginView.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramValue;
};

export const HexagramOriginView = memo<Props>(({ className, value }) => {
  const corrected = useMemo(() => {
    if (!value) return null;
    return [...value].reverse().map((item) => ({ id: random.uuid4(), value: item }));
  }, [value]);

  const color = useMemo(() => {
    if (!value) return null;
    return getHexagramColor(value);
  }, [value]);

  if (!value) return null;
  return (
    <div className={cn(s.root, className)}>
      {corrected.map((item) => {
        if (item.value) return <Solid color={color} className={s.item} key={item.id} />;
        return <Dashed color={color} className={s.item} key={item.id} />;
      })}
    </div>
  );
});
