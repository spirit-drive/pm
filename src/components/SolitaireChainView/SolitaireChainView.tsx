import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import cn from 'clsx';
import * as ics from 'ics';
import { Checkbox, message, Radio, Button, Divider } from 'antd';
import { DownloadOutlined, MinusOutlined } from '@ant-design/icons';
import { EventAttributes } from 'ics';
import { Card } from './Card';
import { PossibleReplacing, Solitaire } from '../../core/Solitaire';
import s from './SolitaireChainView.sass';
import { TimeEditor, TimeEditorState } from '../TimeEditor';
import {
  DateTime,
  getTimeForActions,
  getDateTimeFromString,
  getDateArrayByStartAndShift,
} from '../../utils/getTimeForActions';
import { getAllNominalsFromChain } from '../ChainPermutation/helpers';
import { cyrillicNominalTimeSize } from '../../core/types';
import { CardTimeView } from '../CardTimeView';
import { saveFile } from '../../utils/saveFile';

export type Props = {
  className?: string;
  children?: never;
  solitaire: Solitaire;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (that: string, to: string) => void;
};

export const SolitaireChainView = memo<Props>(({ className, setValue, onChange, solitaire }) => {
  const { chain, yin, yan, transits, chainAdvanced } = solitaire || {};
  const [chosen, setChosen] = useState<string>();
  const [possible, setPossible] = useState<{ data: PossibleReplacing[]; current: string }>();
  const [mode, setMode] = useState<'global' | 'unit'>('unit');
  const [time, setTime] = useState<TimeEditorState>();
  const [visibleTimes, setVisibleTimes] = useState<boolean>(true);
  const [times, setTimes] = useState<DateTime[]>([]);

  useEffect(() => {
    setChosen('');
    setPossible(null);
  }, [mode]);

  const replace = (current: string): void => {
    setPossible((v) => {
      if (v?.current === current) return null;
      if (v?.current) {
        if (v.data.find((i) => i.card === current)) {
          setValue(Solitaire.replace(v?.current, current, solitaire.chain).join(' '));
          return null;
        }
        return v;
      }
      return { current, data: solitaire.getPossibleReplacing(current) };
    });
  };

  const exchange = (value: string): void => {
    if (chosen) {
      onChange(chosen, value);
      setChosen('');
    } else {
      setChosen(value);
    }
  };

  const onClick = (value: string) => (): void => {
    if (mode === 'global') exchange(value);
    else replace(value);
  };

  const showDay = times?.[0]?.day !== times?.[times?.length - 1]?.day;

  useEffect(() => {
    if (!chain || !time) return;
    const sizes = getAllNominalsFromChain(chain.join(' ')).map((i) => cyrillicNominalTimeSize[i]);
    setTimes(
      getTimeForActions(getDateTimeFromString(time.start))(sizes, getDateTimeFromString(time.interval), [
        getDateTimeFromString(time.sleep[0]),
        getDateTimeFromString(time.sleep[1]),
      ])
    );
  }, [chain, time]);

  const getCal = (): void => {
    if (!times?.length) return;
    const arr: EventAttributes[] = chainAdvanced.split(' ').map((title, i) => ({
      title,
      description: 'desc',
      alarms: [
        {
          summary: title,
          action: 'audio',
          description: 'desc 1',
          trigger: { hours: 0, minutes: 0, before: true },
          repeat: 1,
        },
      ],
      start: getDateArrayByStartAndShift(time.startDate, times[i]),
      end: getDateArrayByStartAndShift(time.startDate, times[i + 1]),
    }));
    const { value, error } = ics.createEvents(arr);
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      message.error(`Ошибка построения календаря. Напишите мне в телеграмм @spirit_drive`);
    } else {
      saveFile('ЦС', value);
    }
  };

  if (!chain?.length) return null;
  return (
    <div className={cn(s.root, className)}>
      <TimeEditor className={s.editor} onChange={setTime} />
      <Checkbox checked={visibleTimes} onChange={(e): void => setVisibleTimes(e.target.checked)}>
        Показать тайминг
      </Checkbox>
      <Button onClick={getCal} disabled={!times?.length}>
        <DownloadOutlined />
        Скачать файл для календаря
      </Button>
      <Divider />
      <div className={s.radio}>
        <div className={s.tip}>
          {mode === 'global'
            ? 'Выбрав 2 карты они поменяются местами. Будьте осторожны, будут изменены все масти и номиналы выбранных карт, по-другому не сложится цепочка. Транзиты сохранят местоположение, а efl сохранит свой размер'
            : 'Выбрав карту будут подсвечены все карты, с которыми она может быть заменена. Могут измениться транзиты, efl и прочее.'}
        </div>
        {mode !== 'global' && (
          <div className={s.tip}>
            <div>Обмен с сохранением самобалансировки. Подсвечивается фиолетовым</div>
            {possible?.current ? (
              possible?.data
                ?.filter((i) => i.strict)
                .map((i) => i.card)
                .join(', ') || <MinusOutlined />
            ) : (
              <MinusOutlined />
            )}
          </div>
        )}
        <Radio.Group value={mode} size="small">
          <Radio.Button value="unit" onClick={(): void => setMode('unit')}>
            Обмен карт индивидуально
          </Radio.Button>
          <Radio.Button value="global" onClick={(): void => setMode('global')}>
            Обмен мастей и номиналов
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className={s.wrapper}>
        {chain?.map((item, i) => {
          const correctedItem = Solitaire.tenToX(item);
          const transit = transits.find((t) => t.value === correctedItem);
          const $className = cn(s.infoItem, yan.includes(correctedItem) && s.yan, yin.includes(correctedItem) && s.yin);
          const pos = possible?.data?.find((l) => l.card === item);
          return (
            <div key={i} className={s.wrapperItem}>
              <div
                role="presentation"
                onClick={onClick(item)}
                className={cn(
                  s.item,
                  (chosen === item || possible?.current === item) && s.active,
                  pos && (pos.strict ? s.strict : s.possible)
                )}
              >
                <div className={s.number}>{i + 1}</div>
                <Card value={item} />
                <div className={s.info}>
                  <div className={$className} />
                  {transit && <div className={cn(s.infoItem, s.transit)}>{transit.efl}</div>}
                </div>
              </div>
              {visibleTimes && !!times.length && (
                <CardTimeView
                  startDate={time.startDate}
                  className={s.time}
                  current={times[i]}
                  next={times[i + 1]}
                  showDay={showDay}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
