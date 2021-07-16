import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Balance, BalanceValue } from '../../core/types';
import { YanYinView } from '../YanYinView';
import s from './HexagramBalanceView.sass';
import { random } from '../../utils/random';

export type Props = {
  className?: string;
  children?: never;
  value: Balance;
};

export const getText = (value: BalanceValue): string => {
  if (value === 0) return '=';
  if (value > 0) return '+'.repeat(value);
  return '-'.repeat(Math.abs(value));
};

export const HexagramBalanceView = memo<Props>(({ className, value }) => {
  const corrected = useMemo(() => {
    if (!value) return null;
    return value.map((item) => ({ value: item, text: getText(item), id: random.uuid4() })).reverse();
  }, [value]);
  if (!value) return null;

  return (
    <div className={cn(s.root, className)}>
      {corrected.map((item) => {
        if (item.value > 0) {
          return (
            <YanYinView key={item.id} className={s.item} value={1}>
              {item.text}
            </YanYinView>
          );
        }
        if (item.value < 0) {
          return (
            <YanYinView key={item.id} className={s.item} value={0}>
              {item.text}
            </YanYinView>
          );
        }
        return (
          <div key={item.id} className={s.item}>
            {item.text}
          </div>
        );
      })}
    </div>
  );
});
