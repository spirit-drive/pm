import React, { memo } from 'react';
import cn from 'clsx';
import { ChainData } from './types';
import s from './BaseChainsMenuItem.module.sass';
import { ShortHexagrams } from '../ShortHexagrams';
import { Suits } from '../../core/types';

export type BaseChainsMenuItemProps = ChainData & {
  className?: string;
  chain: string;
  onChoose: (chain: string) => void;
};

export const BaseChainsMenuItem = memo<BaseChainsMenuItemProps>(
  ({ className, onChoose, chain, tag, selfBalancing }) => (
    <button onClick={(): void => onChoose(chain)} type="button" className={cn(s.root, className)}>
      <div className={s.line}>
        {tag && (
          <div className={s.tags}>
            {tag.split(' ').map((t) => (
              <div className={s.tag} key={t}>
                {t}
              </div>
            ))}
          </div>
        )}
        <div>
          {selfBalancing?.split(' ').map((set) => {
            const [hearts, spades, clubs, diamonds] = set.split(';');
            const data = [
              {
                suit: Suits.clubs,
                hexagram: clubs,
              },
              {
                suit: Suits.spades,
                hexagram: spades,
              },
              {
                suit: Suits.hearts,
                hexagram: hearts,
              },
              {
                suit: Suits.diamonds,
                hexagram: diamonds,
              },
            ];
            return <ShortHexagrams key={set} data={data} />;
          })}
        </div>
      </div>
      <div className={s.chain}>{chain}</div>
    </button>
  )
);

BaseChainsMenuItem.displayName = 'BaseChainsMenuItem';
