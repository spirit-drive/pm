import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { Radio } from 'antd';
import { Card } from './Card';
import { Solitaire } from '../../core/Solitaire';
import s from './SolitaireChainView.sass';

export type Props = {
  className?: string;
  children?: never;
  solitaire: Solitaire;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (that: string, to: string) => void;
};

export const SolitaireChainView = memo<Props>(({ className, setValue, onChange, solitaire }) => {
  const chain = useMemo(() => solitaire?.chain, [solitaire?.chain]);
  const yin = useMemo(() => solitaire?.yin, [solitaire?.yin]);
  const yan = useMemo(() => solitaire?.yan, [solitaire?.yan]);
  const transits = useMemo(() => solitaire?.transits, [solitaire?.transits]);
  const [chosen, setChosen] = useState<string>();
  const [possible, setPossible] = useState<{ data: string[]; current: string }>();
  const [mode, setMode] = useState<'global' | 'unit'>('global');

  useEffect(() => {
    setChosen('');
    setPossible(null);
  }, [mode]);

  const chosenCopy = useRef(chosen);
  useEffect(() => {
    chosenCopy.current = chosen;
  }, [chosen]);

  const replace = useCallback(
    (current: string): void => {
      setPossible((v) => {
        if (v?.current === current) return null;
        if (v?.current) {
          if (v.data.includes(current)) {
            setValue(solitaire.replace(v?.current, current).join(' '));
            return null;
          }
          return v;
        }
        return { current, data: solitaire.getPossibleReplacing(current) };
      });
    },
    [setValue, solitaire]
  );

  const exchange = useCallback(
    (value: string) => {
      if (chosenCopy.current) {
        onChange(chosenCopy.current, value);
        setChosen('');
      } else {
        setChosen(value);
      }
    },
    [onChange]
  );

  const modeCopy = useRef(mode);
  useEffect(() => {
    modeCopy.current = mode;
  }, [mode]);
  const onClick = useCallback(
    (value: string) => (): void => {
      if (modeCopy.current === 'global') {
        exchange(value);
        return;
      }
      replace(value);
    },
    [exchange, replace]
  );

  if (!chain?.length) return null;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.radio}>
        <div className={s.tip}>
          {mode === 'global'
            ? 'Выбрав 2 карты они поменяются местами. Будьте осторожны, будут изменены все масти и номиналы выбранных карт, по-другому не сложится цепочка. Транзиты сохранят местоположение, а efl сохранит свой размер'
            : 'Выбрав карту будут подсвечены все карты, с которыми она может быть заменена. Могут измениться транзиты, efl и прочее.'}
        </div>
        <Radio.Group value={mode}>
          <Radio.Button value="global" onClick={(): void => setMode('global')}>
            Обмен мастей и номиналов
          </Radio.Button>
          <Radio.Button value="unit" onClick={(): void => setMode('unit')}>
            Обмен карт индивидуально
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className={s.wrapper}>
        {chain?.map((item) => {
          const correctedItem = Solitaire.tenToX(item);
          const transit = transits.find((t) => t.value === correctedItem);
          const $className = cn(s.infoItem, yan.includes(correctedItem) && s.yan, yin.includes(correctedItem) && s.yin);
          return (
            <div
              role="presentation"
              onClick={onClick(item)}
              className={cn([
                s.item,
                (chosen === item || possible?.current === item) && s.active,
                possible?.data?.includes(item) && s.possible,
              ])}
              key={item}
            >
              <Card value={item} />
              <div className={s.info}>
                <div className={$className} />
                {transit && <div className={cn(s.infoItem, s.transit)}>{transit.efl}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
