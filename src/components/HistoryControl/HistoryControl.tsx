import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './HistoryControl.sass';

export type HistoryControlProps = {
  className?: string;
  back: () => void;
  next: () => void;
};

export const HistoryControl = memo<HistoryControlProps>(({ className, back, next }) => (
  <div role="presentation" onClick={(e): void => e.stopPropagation()} className={cn(s.root, className)}>
    <Button size="small" className={s.button} onClick={back}>
      ←
    </Button>
    <Button size="small" className={s.button} onClick={next}>
      →
    </Button>
  </div>
));

HistoryControl.displayName = 'HistoryControl';
