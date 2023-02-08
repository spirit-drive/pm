import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { Typography, Tooltip, Collapse } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Solitaire } from '../../core/Solitaire';
import { HexagramsView } from '../../components/HexagramsView';
import { random } from '../../utils/random';
import { HexagramBalanceView } from '../../components/HexagramBalanceView';
import { useSaveToUrl } from './useSaveToUrl';
import { SolitaireChainView } from '../../components/SolitaireChainView';
import { useHistory } from '../../hooks/useHistory';
import { HistoryControl } from '../../components/HistoryControl/HistoryControl';
import { BaseChains } from '../../components/BaseChains';
import s from './Analise.sass';
import { SolitaireInput } from '../../components/SolitaireInput/SolitaireInput';

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

  const selfBalancingElement = ((): React.ReactElement[] | React.ReactElement => {
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
  })();

  const solitaireCopy = useRef(solitaire);
  solitaireCopy.current = solitaire;

  const onChangeSolitaire = useCallback((that: string, to: string) => {
    setValue(solitaireCopy.current.exchange(that, to).join(' '));
  }, []);

  const solitaireChainElement = ((): React.ReactElement => {
    if (message) return <MinusOutlined />;
    if (solitaire?.chain) {
      return <SolitaireChainView setValue={setValue} onChange={onChangeSolitaire} solitaire={solitaire} />;
    }
    return <MinusOutlined />;
  })();

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

  const hexagramsMoldElement = ((): React.ReactElement => {
    if (message) return <MinusOutlined />;
    if (solitaire?.hexagramsMold) {
      return (
        <div className={s.hexagramsView}>
          <div className={s.mainHexagram}>
            <HexagramsView hexagramsMold={solitaire?.hexagramsMold} value={solitaire?.hexagrams} />
            <HexagramBalanceView className={s.balance} value={solitaire?.balance} />
          </div>
        </div>
      );
    }
    return <MinusOutlined />;
  })();

  return (
    <div className={cn(s.root, className)}>
      <Typography.Title className={s.mainTitle}>Гексаграммный анализ</Typography.Title>
      <SolitaireInput message={message} manage={manage} value={value} onChange={onChange} />
      <div className={s.section}>
        <Collapse defaultActiveKey="1" ghost>
          <Collapse.Panel className={s.panel} key="1" header={headerElement}>
            {solitaireChainElement}
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className={s.section}>
        <div>
          <Typography.Text className={s.title}>Гексаграммы</Typography.Text>
        </div>
        {hexagramsMoldElement}
      </div>
      <div className={s.section}>
        <div>
          <Typography.Text className={s.title}>Возможные варианты самобалансировки</Typography.Text>
        </div>
        {selfBalancingElement}
      </div>
      <div className={s.bottom}>
        Icons made by{' '}
        <a href="https://smashicons.com/" title="Smashicons">
          Smashicons
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
});
