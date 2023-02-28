import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Button, Input, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { EventAttributes } from 'ics';
import * as ics from 'ics';
import { SolitaireBasis } from '../../core/SolitaireBasis';
import {
  DateTime,
  getDateAndWeekday,
  getDateArrayByStartAndShift,
  getNowByMoment,
  getStringFromDateTime,
} from '../../utils/getTimeForActions';
import { saveFile } from '../../utils/saveFile';
import s from './ChainDescription.sass';

export type ChainDescriptionProps = {
  className?: string;
  chainAdvanced: string;
  startDate: string;
  times: DateTime[];
};

export const ChainDescription = memo<ChainDescriptionProps>(
  ({ className, times, startDate = getNowByMoment(), chainAdvanced }) => {
    const [name, setName] = useState<string>();
    const [desc, setDesc] = useState<Record<string, string>>({});

    const getCal = (): void => {
      if (!times?.length) return;
      const arr: EventAttributes[] = chainAdvanced?.split(' ').map((title, i) => {
        const cleanCard = SolitaireBasis.removeEfl(title);
        const summary = [i + 1, title, desc[cleanCard]].filter(Boolean).join(' ');
        return {
          title: summary,
          description: desc[cleanCard],
          alarms: [
            {
              summary,
              action: 'audio',
              description: desc[cleanCard],
              trigger: { before: false },
            },
          ],
          start: getDateArrayByStartAndShift(startDate, times[i]),
          end: getDateArrayByStartAndShift(startDate, times[i + 1]),
        };
      });
      const { value, error } = ics.createEvents(arr);
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        message.error(`Ошибка построения календаря. Напишите мне в телеграмм @spirit_drive`);
      } else {
        saveFile(name || 'ЦС', value);
      }
    };

    return (
      <div className={cn(s.root, className)}>
        <div className={s.block}>
          <div>Название цепочки событий</div>
          <Input
            className={s.input}
            placeholder="Назовите цепочку (не обязательно)"
            value={name}
            onChange={(e): void => setName(e.target.value)}
          />
        </div>
        <div className={s.block}>
          <Button onClick={getCal} disabled={!times?.length}>
            <DownloadOutlined />
            Скачать файл для календаря
          </Button>
        </div>
        {chainAdvanced?.split(' ').map((card, i) => {
          const cleanCard = SolitaireBasis.removeEfl(card);
          const current = times[i];
          const next = times[i + 1];
          const { date, weekday } = getDateAndWeekday(startDate, current.day);
          return (
            <div className={s.card} key={i}>
              <div className={s.top}>
                <div className={s.title}>{`${i + 1} ${card}`}</div>
                <div className={s.other}>
                  <div>{getStringFromDateTime(current)}</div>-<div>{getStringFromDateTime(next)}</div>
                  <div>{date}</div>
                  {weekday}
                </div>
              </div>
              <div>Комментарий</div>
              <Input.TextArea
                rows={3}
                value={desc[cleanCard]}
                onChange={(e): void => setDesc((v) => ({ ...v, [cleanCard]: e.target.value }))}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

ChainDescription.displayName = 'ChainDescription';
