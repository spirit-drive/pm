import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { HistoryType } from '../../hooks/useHistory';
import s from './HistoryControl.sass';

export type HistoryControlProps = {
  className?: string;
  history: HistoryType;
  value: string;
  back: () => void;
  next: () => void;
  setValue: (value: string) => void;
};

export const HistoryControl = memo<HistoryControlProps>(({ className, value, setValue, history, back, next }) => (
  <div className={cn(s.root, className)}>
    <Button className={s.button} onClick={back}>
      ←
    </Button>
    <Button className={s.button} onClick={next}>
      →
    </Button>
    <div className={s.history}>
      {history
        .map((item) => (
          <div
            role="presentation"
            className={cn(s.item, item.value === value && s.active)}
            onClick={(): void => setValue(item.value)}
            key={item.id}
          >
            {item.value}
          </div>
        ))
        .reverse()}
    </div>
  </div>
));

HistoryControl.displayName = 'HistoryControl';
