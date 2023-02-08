import React, { memo } from 'react';
import cn from 'clsx';
import { MinusOutlined } from '@ant-design/icons';
import { HexagramsView } from '../HexagramsView';
import { HexagramBalanceView } from '../HexagramBalanceView';
import s from './HexagramsMoldElement.sass';
import { Solitaire } from '../../core/Solitaire';

export type HexagramsMoldElementProps = {
  className?: string;
  message: string;
  hexagramsMold: Solitaire['hexagramsMold'];
  hexagrams: Solitaire['hexagrams'];
  balance: Solitaire['balance'];
};

export const HexagramsMoldElement = memo<HexagramsMoldElementProps>(
  ({ className, hexagramsMold, balance, hexagrams, message }) => {
    if (message) return <MinusOutlined />;
    if (!hexagramsMold) return <MinusOutlined />;
    return (
      <div className={cn(s.root, className)}>
        <div className={s.main}>
          <HexagramsView hexagramsMold={hexagramsMold} value={hexagrams} />
          <HexagramBalanceView className={s.balance} value={balance} />
        </div>
      </div>
    );
  }
);

HexagramsMoldElement.displayName = 'HexagramsMoldElement';
