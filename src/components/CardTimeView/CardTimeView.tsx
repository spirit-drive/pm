import React, { memo } from 'react';
import cn from 'clsx';
import deepEqual from 'fast-deep-equal';
import moment from 'moment';
import { DateTime, getStringFromDateTime } from '../../utils/getTimeForActions';
import s from './CardTimeView.sass';

export type CardTimeViewProps = {
  className?: string;
  current: DateTime;
  next: DateTime;
  showDay: boolean;
  startDate: string;
  children?: never;
};

const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const CardTimeView = memo<CardTimeViewProps>(({ className, current, next, startDate, showDay }) => {
  const time = moment(startDate.split('.').reverse().join('-'));
  return (
    <div className={cn(s.root, className)}>
      <div>{getStringFromDateTime(current)}</div>
      <div>{getStringFromDateTime(next)}</div>
      {showDay && (
        <div className={s.day}>
          <div>{`день ${current.day + 1}`}</div>
          <div>{time.add(current.day, 'day').format('DD.MM')}</div>
          <div>{`${days[time.day()]}`}</div>
        </div>
      )}
    </div>
  );
}, deepEqual);

CardTimeView.displayName = 'CardTimeView';
