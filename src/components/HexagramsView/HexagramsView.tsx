import React, { memo } from 'react';
import cn from 'clsx';
import { Typography } from 'antd';
import { Hexagrams, HexagramsMold, Suits } from '../../core/types';
import { HexagramView } from '../HexagramView';
import s from './HexagramsView.sass';
import { SuitsIcon } from '../SuitsIcon';

export type Props = {
  className?: string;
  children?: never;
  value: Hexagrams;
  hexagramsMold?: HexagramsMold;
};

export const HexagramsView = memo<Props>(({ className, hexagramsMold, value }) => {
  if (!value) return null;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.clubs} className={s.icon} />
          <Typography.Text className={s.title}>Крести</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.clubs} value={value.clubs} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.spades} className={s.icon} />
          <Typography.Text className={s.title}>Пики</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.spades} value={value.spades} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.hearts} className={s.icon} />
          <Typography.Text className={s.title}>Червы</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.hearts} value={value.hearts} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.diamonds} className={s.icon} />
          <Typography.Text className={s.title}>Буби</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.diamonds} value={value.diamonds} />
      </div>
    </div>
  );
});
