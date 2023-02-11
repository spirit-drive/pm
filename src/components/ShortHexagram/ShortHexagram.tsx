import React, { memo } from 'react';
import cn from 'clsx';
import { Suits } from '../../core/types';
import { SuitsIcon } from '../SuitsIcon';
import { hexagramsInfoMap } from '../../utils/hexagrams';
import { HexagramByCodeDropdown } from '../HexagramByCodeDropdown';
import s from './ShortHexagram.module.sass';

export type ShortHexagramsProps = {
  className?: string;
  hexagram: string | number;
  suit: Suits;
};

export const ShortHexagram = memo<ShortHexagramsProps>(({ className, hexagram, suit }) => (
  <HexagramByCodeDropdown code={hexagram}>
    <div className={cn(s.root, className)}>
      <SuitsIcon suit={suit} />
      <div>{`#${hexagram}`}</div>
      <div>{hexagramsInfoMap[hexagram]?.title}</div>
    </div>
  </HexagramByCodeDropdown>
));

ShortHexagram.displayName = 'ShortHexagram';
