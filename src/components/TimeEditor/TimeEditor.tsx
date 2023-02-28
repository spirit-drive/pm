import React, { memo, useState, useEffect } from 'react';
import cn from 'clsx';
import { Button, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { getDateTimeFromString } from '../../utils/getTimeForActions';
import s from './TimeEditor.sass';

export type TimeEditorState = {
  start: string;
  interval: string;
  sleep: [string, string];
};

export type TimeEditorProps = {
  className?: string;
  onChange: (value: TimeEditorState) => void;
};

const KEY = 'time-editor';

export const getValue = (string: string): Moment => {
  const raw = moment();
  const { hour, minute } = getDateTimeFromString(string);
  return raw.hours(hour).minutes(minute);
};

export const TimeEditor = memo<TimeEditorProps>(({ className, onChange }) => {
  const [value, setValue] = useState<TimeEditorState>(() => {
    const raw = localStorage.getItem(KEY);
    return raw
      ? JSON.parse(raw)
      : {
          start: '09:00',
          interval: '00:15',
          sleep: ['23:00', '07:00'],
        };
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(value));
  }, [onChange, value]);

  return (
    <div className={cn(s.root, className)}>
      <div>
        <div>Время старта</div>
        <TimePicker
          format="HH:mm"
          onChange={(_, start): void => setValue((v) => ({ ...v, start }))}
          value={getValue(value.start)}
        />
      </div>
      <div>
        <div>Интервал</div>
        <TimePicker
          format="HH:mm"
          onChange={(_, interval): void => setValue((v) => ({ ...v, interval }))}
          value={getValue(value.interval)}
        />
      </div>
      <div>
        <div>Время сна</div>
        <TimePicker.RangePicker
          format="HH:mm"
          order={false}
          onChange={(_, sleep): void => setValue((v) => ({ ...v, sleep }))}
          value={[getValue(value.sleep[0]), getValue(value.sleep[1])]}
        />
      </div>
      <Button onClick={(): void => onChange(value)}>Расставить время</Button>
    </div>
  );
});
