import React, { memo } from 'react';
import cn from 'clsx';
import { HexagramMold } from '../../core/types';
import { YanYinView } from '../YanYinView';
import s from './HexagramMoldView.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramMold;
};

export const HexagramMoldView = memo<Props>(({ className, value }) => {
  if (!value) return null;

  return (
    <div className={cn(s.root, className)}>
      <YanYinView className={s.item} value={value.ace}>
        Т
      </YanYinView>
      <YanYinView className={s.item} value={value.king}>
        К
      </YanYinView>
      <div className={cn(s.item, s.line)}>
        <YanYinView value={value.queen}>Д</YanYinView>
        <YanYinView className={s.second} value={value.jack}>
          В
        </YanYinView>
      </div>
      <YanYinView className={s.item} value={value.X}>
        10
      </YanYinView>
      <div className={cn(s.item, s.line)}>
        <YanYinView value={value['6']}>6</YanYinView>
        <YanYinView className={s.second} value={value['8']}>
          8
        </YanYinView>
      </div>
      <div className={cn(s.item, s.line)}>
        <YanYinView value={value['9']}>9</YanYinView>
        <YanYinView className={s.second} value={value['7']}>
          7
        </YanYinView>
      </div>
    </div>
  );
});
