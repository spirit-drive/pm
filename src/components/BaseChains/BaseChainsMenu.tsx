import React, { memo } from 'react';
import cn from 'clsx';
import { List } from 'react-virtualized';
import { BaseChainsMenuItem } from './BaseChainsMenuItem';
import { ChainData } from './types';
import s from './BaseChainsMenu.module.sass';

export type BaseChainsMenuProps = {
  className?: string;
  data: ChainData[];
  onChoose: (value: string) => void;
};

export const BaseChainsMenu = memo<BaseChainsMenuProps>(({ className, data, onChoose }) => {
  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }): React.ReactElement => {
    const chain = data[index];
    const { selfBalancing, tag, hexagrams } = chain;
    return (
      <div key={key} style={style}>
        <BaseChainsMenuItem
          onChoose={onChoose}
          chain={chain.chain}
          tag={tag}
          hexagrams={hexagrams}
          selfBalancing={selfBalancing}
        />
      </div>
    );
  };
  return (
    <List
      className={cn(s.root, className)}
      width={860}
      height={420}
      rowCount={data.length}
      rowHeight={60}
      rowRenderer={rowRenderer}
    />
  );
});

BaseChainsMenu.displayName = 'BaseChainsMenu';
