import React, { memo } from 'react';
import cn from 'clsx';
import { Typography } from 'antd';
import Icon from '@ant-design/icons';
import { Hexagrams, HexagramsMold } from '../../core/types';
import { HexagramView } from '../HexagramView';
import { clubs } from '../../icons/clubs';
import { heards } from '../../icons/heards';
import { diamonds } from '../../icons/diamonds';
import { spades } from '../../icons/spades';
import s from './HexagramsView.sass';

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
          <Icon component={clubs} className={cn(s.icon, s.black)} />
          <Typography.Text className={s.title}>Крести</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.clubs} value={value.clubs} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <Icon component={spades} className={cn(s.icon, s.black)} />
          <Typography.Text className={s.title}>Пики</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.spades} value={value.spades} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <Icon component={heards} className={cn(s.icon, s.red)} />
          <Typography.Text className={s.title}>Червы</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.hearts} value={value.hearts} />
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <Icon component={diamonds} className={cn(s.icon, s.red)} />
          <Typography.Text className={s.title}>Буби</Typography.Text>
        </div>
        <HexagramView hexagramsMold={hexagramsMold?.diamonds} value={value.diamonds} />
      </div>
    </div>
  );
});
