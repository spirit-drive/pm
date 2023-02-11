import React, { memo } from 'react';
import cn from 'clsx';
import { BaseChainsMenuItem } from './BaseChainsMenuItem';
import { ChainData } from './types';
import s from './BaseChainsMenu.module.sass';

export type BaseChainsMenuProps = {
  className?: string;
  data: ChainData[];
  onChoose: (value: string) => void;
};

export const BaseChainsMenu = memo<BaseChainsMenuProps>(({ className, data, onChoose }) => (
  <div className={cn(s.root, className)}>
    {data.map((chain) => {
      const { selfBalancing, tag, hexagrams } = chain;
      return (
        <BaseChainsMenuItem
          onChoose={onChoose}
          chain={chain.chain}
          key={chain.chain}
          tag={tag}
          hexagrams={hexagrams}
          selfBalancing={selfBalancing}
        />
      );
    })}
  </div>
));

BaseChainsMenu.displayName = 'BaseChainsMenu';
