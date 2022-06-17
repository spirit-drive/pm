import React, { memo } from 'react';
import cn from 'clsx';
import data from './data.json';
import { BaseChainsMenuItem } from './BaseChainsMenuItem';
import { ChainData } from './types';
import s from './BaseChainsMenu.module.sass';

export type BaseChainsMenuProps = {
  className?: string;
  onChoose: (value: string) => void;
};

export const BaseChainsMenu = memo<BaseChainsMenuProps>(({ className, onChoose }) => (
  <div className={cn(s.root, className)}>
    {Object.keys(data).map((chain: keyof typeof data) => {
      const { selfBalancing, tag, hexagrams } = data[chain] as ChainData;
      return (
        <BaseChainsMenuItem
          onChoose={onChoose}
          chain={chain}
          key={chain}
          tag={tag}
          hexagrams={hexagrams}
          selfBalancing={selfBalancing}
        />
      );
    })}
  </div>
));

BaseChainsMenu.displayName = 'BaseChainsMenu';
