import React, { memo } from 'react';
import cn from 'clsx';
import deepEqual from 'fast-deep-equal';
import { DateTime, getDateAndWeekday, getStringFromDateTime } from '../../utils/getTimeForActions';
import s from './CardTimeView.sass';

export type CardTimeViewProps = {
  className?: string;
  current: DateTime;
  next: DateTime;
  showDay: boolean;
  startDate: string;
  children?: never;
};

export const CardTimeView = memo<CardTimeViewProps>(({ className, current, next, startDate, showDay }) => {
  const { date, weekday } = getDateAndWeekday(startDate, current.day);
  return (
    <div className={cn(s.root, className)}>
      <div>{getStringFromDateTime(current)}</div>
      <div>{getStringFromDateTime(next)}</div>
      {showDay && (
        <div className={s.day}>
          <div>{`день ${current.day + 1}`}</div>
          <div>{date}</div>
          <div>{weekday}</div>
        </div>
      )}
    </div>
  );
}, deepEqual);

CardTimeView.displayName = 'CardTimeView';
