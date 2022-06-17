import React, { memo } from 'react';
import cn from 'clsx';
import { Suits } from '../../core/types';
import { ShortHexagram } from '../ShortHexagram';
import s from './ShortHexagrams.module.sass';

export type ShortHexagramsData = {
  hexagram: string | number;
  suit: Suits;
};

export type ShortHexagramsProps = {
  className?: string;
  data: ShortHexagramsData[];
};

export const ShortHexagrams = memo<ShortHexagramsProps>(({ className, data }) => (
  <div className={cn(s.root, className)}>
    {data.map(({ hexagram, suit }, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <ShortHexagram className={s.item} hexagram={hexagram} suit={suit} key={i} />
    ))}
  </div>
));

ShortHexagrams.displayName = 'ShortHexagrams';
