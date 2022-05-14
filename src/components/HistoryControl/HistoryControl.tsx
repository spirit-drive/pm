import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { HistoryType } from '../../hooks/useHistory';
import s from './HistoryControl.sass';

export type HistoryControlProps = {
  className?: string;
  back: () => void;
  next: () => void;
  first: boolean;
  last: boolean;
  history: HistoryType;
  currentIndex: number;
};

export const HistoryControl = memo<HistoryControlProps>(
  ({ className, history, currentIndex, first, last, back, next }) => (
    <div role="presentation" onClick={(e): void => e.stopPropagation()} className={cn(s.root, className)}>
      <Button size="small" className={s.button} disabled={last} onClick={back}>
        ←
      </Button>
      <div className={s.info}>{`${currentIndex + 1} / ${history.length}`}</div>
      <Button size="small" className={s.button} disabled={first} onClick={next}>
        →
      </Button>
    </div>
  )
);

HistoryControl.displayName = 'HistoryControl';
