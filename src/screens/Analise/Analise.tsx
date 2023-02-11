import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { Typography, Tooltip, Collapse } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Solitaire } from '../../core/Solitaire';
import { HexagramsView } from '../../components/HexagramsView';
import { random } from '../../utils/random';
import { useSaveToUrl } from './useSaveToUrl';
import { SolitaireChainView } from '../../components/SolitaireChainView';
import { useHistory } from '../../hooks/useHistory';
import { HistoryControl } from '../../components/HistoryControl/HistoryControl';
import { BaseChains } from '../../components/BaseChains';
import s from './Analise.sass';
import { SolitaireInput } from '../../components/SolitaireInput/SolitaireInput';
import { ScreenBottom } from '../../components/ScreenBottom';
import { HexagramsMoldElement } from '../../components/HexagramsMoldElement';
import { ChainPermutation } from '../../components/ChainPermutation';

export type Props = {
  className?: string;
  children?: never;
};

export const Analise = memo<Props>(({ className }) => {
  const [value, setValue] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [solitaire, setSolitaire] = useState<Solitaire>();

  useSaveToUrl(value, setValue);
  const [{ first, last, index, history }, { back, next }] = useHistory(value, setValue);

  const onChange = useCallback((v: string) => {
    setValue(v);
    setMessage('');
  }, []);

  const valueCopy = useRef(value);
  valueCopy.current = value;

  const manage = useCallback(($value: string) => {
    if ($value) {
      try {
        const $solitaire = new Solitaire($value);
        setSolitaire($solitaire);
        setValue($solitaire.chain.join(' '));
        setMessage('');
      } catch (e) {
        if (e.stack.includes('InvalidChain')) {
          setMessage('Пасьянс не складывается');
        } else {
          setMessage('Не получилось расшифровать расклад. Возможно в нем ошибка');
        }
        console.error(e); // eslint-disable-line no-console
      }
    } else {
      setSolitaire(null);
      setMessage('');
    }
  }, []);

  useEffect(() => {
    manage(value);
  }, [manage, value]);

  const selfBalancing = useMemo(
    () => solitaire?.selfBalancing?.map((item) => ({ id: random.uuid4(), value: item })),
    [solitaire?.selfBalancing]
  );

  const showSelfBalancing = useMemo(() => solitaire?.balance?.some((v) => v !== 0), [solitaire?.balance]);

  const solitaireCopy = useRef(solitaire);
  solitaireCopy.current = solitaire;

  const onChangeSolitaire = useCallback((that: string, to: string) => {
    setValue(solitaireCopy.current.exchange(that, to).join(' '));
  }, []);

  const headerElement = (
    <Typography.Text className={s.title}>
      Расклад
      <HistoryControl
        currentIndex={index}
        history={history}
        className={s.history}
        back={back}
        first={first}
        last={last}
        next={next}
      />
      <BaseChains className={s.choose} onChoose={setValue} />
    </Typography.Text>
  );

  return (
    <div className={cn(s.root, className)}>
      <Typography.Title className={s.mainTitle}>Гексаграммный анализ</Typography.Title>
      <SolitaireInput message={message} manage={manage} value={value} onChange={onChange} />
      <div className={s.section}>
        <Collapse defaultActiveKey="1" ghost>
          <Collapse.Panel className={s.panel} key="1" header={headerElement}>
            {((): React.ReactElement => {
              if (message || !solitaire?.chain) return <MinusOutlined />;
              return <SolitaireChainView setValue={setValue} onChange={onChangeSolitaire} solitaire={solitaire} />;
            })()}
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className={s.section}>
        <Collapse defaultActiveKey="1" ghost>
          <Collapse.Panel className={s.panel} key="1" header="Поиск гексаграмм в раскладе">
            <ChainPermutation value={value} setValue={setValue} />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className={s.section}>
        <div>
          <Typography.Text className={s.title}>Гексаграммы</Typography.Text>
        </div>
        <HexagramsMoldElement
          message={message}
          hexagramsMold={solitaire?.hexagramsMold}
          hexagrams={solitaire?.hexagrams}
          balance={solitaire?.balance}
        />
      </div>
      <div className={s.section}>
        <div>
          <Typography.Text className={s.title}>Возможные варианты самобалансировки</Typography.Text>
        </div>
        {((): React.ReactElement[] | React.ReactElement => {
          if (!solitaire || message) return <MinusOutlined />;
          if (!showSelfBalancing) return <div>Расклад полностью сбалансирован</div>;
          if (!selfBalancing) {
            return (
              <Tooltip title="Предполагается что балансировать можно только на линиях, где есть 2 карты (линии под номерами 1, 2 и 4)">
                <div>Непредсказуемая самобалансировка</div>
              </Tooltip>
            );
          }
          return selfBalancing?.map((item) => (
            <div key={item.id} className={s.hexagramsView}>
              <HexagramsView value={item.value} />
            </div>
          ));
        })()}
      </div>
      <ScreenBottom className={s.bottom} />
    </div>
  );
});
