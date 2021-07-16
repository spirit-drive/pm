import React, { memo } from 'react';
import cn from 'clsx';
import { HexagramItemValue } from '../../core/types';
import s from './YanYinView.sass';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
  value: HexagramItemValue;
};

export const YanYinView = memo<Props>(({ className, value, children }) => (
  <div className={cn([s.root, value ? s.yan : s.yin, className])}>{children}</div>
));
