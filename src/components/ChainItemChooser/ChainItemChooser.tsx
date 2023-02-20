import React, { FC } from 'react';
import cn from 'clsx';
import { SolitaireBasis } from '../../core/SolitaireBasis';
import s from './ChainItemChooser.sass';

export type ChainItemChooserProps = {
  className?: string;
  chain: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export const ChainItemChooser: FC<ChainItemChooserProps> = ({ className, chain, value = [], onChange }) => {
  if (!chain) return null;
  return (
    <div className={cn(s.root, className)}>
      {chain.map((item) => {
        const active = value.map(SolitaireBasis.removeEfl).includes(SolitaireBasis.removeEfl(item));

        return (
          <div
            role="presentation"
            onClick={(): void => onChange(active ? value.filter((i) => i !== item) : [...value, item])}
            className={cn(s.item, active && s.active)}
            key={item}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
