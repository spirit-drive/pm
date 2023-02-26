import React, { memo } from 'react';
import cn from 'clsx';
import deepEqual from 'fast-deep-equal';
import { DateTime, getStringFromDateTime } from '../../utils/getTimeForActions';
import s from './CardTimeView.sass';

export type CardTimeViewProps = {
  className?: string;
  current: DateTime;
  showDay: boolean;
  children?: never;
};

export const CardTimeView = memo<CardTimeViewProps>(
  ({ className, current, showDay }) => (
    <div className={cn(s.root, className)}>
      <div>{getStringFromDateTime(current)}</div>
      {showDay && <div>{current.day + 1}</div>}
    </div>
  ),
  deepEqual
);

CardTimeView.displayName = 'CardTimeView';
