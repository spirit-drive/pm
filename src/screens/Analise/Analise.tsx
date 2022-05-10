import React, { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { Button, Input, Typography, message as messageAnt, Form, Tooltip, Collapse } from 'antd';
import { CopyOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Solitaire } from '../../core/Solitaire';
import { HexagramsView } from '../../components/HexagramsView';
import { random } from '../../utils/random';
import { HexagramBalanceView } from '../../components/HexagramBalanceView';
import { useSaveToUrl } from './useSaveToUrl';
import { SolitaireChainView } from '../../components/SolitaireChainView';
import { useHistory } from '../../hooks/useHistory';
import s from './Analise.sass';

export type Props = {
  className?: string;
  children?: never;
};

export const Analise = memo<Props>(({ className }) => {
  const [value, setValue] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [solitaire, setSolitaire] = useState<Solitaire>();
  const input = useRef<Input>();

  useSaveToUrl(value, setValue);
  useHistory(value, setValue);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value);
    setMessage('');
  }, []);

  const valueCopy = useRef(value);
  useEffect(() => {
    valueCopy.current = value;
  }, [value]);

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

  const onClick = useCallback(() => {
    if (valueCopy.current) {
      manage(valueCopy.current);
    }
  }, [manage]);

  const onCopy = useCallback(() => {
    if (valueCopy.current) {
      navigator.clipboard
        .writeText(valueCopy.current)
        .then(() => {
          messageAnt.success('Скопировано в буфер обмена');
        })
        .catch((e) => {
          messageAnt.error('Что-то пошло не так, не удалось скопировать в буфер');
          console.error(e); // eslint-disable-line no-console
        });
    }
  }, []);

  const onReset = useCallback(() => {
    setValue('');
    input.current.input.focus();
  }, []);

  useEffect(() => {
    manage(value);
  }, [manage, value]);

  const selfBalancing = useMemo(
    () => solitaire?.selfBalancing?.map((item) => ({ id: random.uuid4(), value: item })),
    [solitaire?.selfBalancing]
  );

  const showSelfBalancing = useMemo(() => solitaire?.balance?.some((v) => v !== 0), [solitaire?.balance]);

  const selfBalancingElement = useMemo(() => {
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
  }, [message, selfBalancing, showSelfBalancing, solitaire]);

  const validateStatus = useMemo(() => (message ? 'error' : ''), [message]);

  const solitaireCopy = useRef(solitaire);
  useEffect(() => {
    solitaireCopy.current = solitaire;
  }, [solitaire]);

  const onChangeSolitaire = useCallback((that: string, to: string) => {
    setValue(solitaireCopy.current.exchange(that, to).join(' '));
  }, []);

  const solitaireChainElement = useMemo(() => {
    if (message) return <MinusOutlined />;
    if (solitaire?.chain) {
      return <SolitaireChainView setValue={setValue} onChange={onChangeSolitaire} solitaire={solitaire} />;
    }
    return <MinusOutlined />;
  }, [message, onChangeSolitaire, solitaire]);

  const headerElement = useMemo(() => <Typography.Text className={s.title}>Расклад</Typography.Text>, []);

  const hexagramsMoldElement = useMemo(() => {
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
  }, [message, solitaire?.balance, solitaire?.hexagrams, solitaire?.hexagramsMold]);

  const { search } = useLocation();

  return (
    <div className={cn(s.root, className)}>
      <Typography.Title className={s.mainTitle}>Гексаграммный анализ</Typography.Title>
      <div className={s.link}>
        <Link to={`/dna${search}`}>ДНК Тоналя →</Link>
      </div>
      <Form.Item help={message} validateStatus={validateStatus} className={s.error}>
        <div className={s.top}>
          <Button className={s.btn} onClick={onReset} type="primary" danger>
            <DeleteOutlined />
          </Button>
          <Input autoFocus ref={input} onPressEnter={onClick} value={value} onChange={onChange} className={s.input} />
          <Button color="#ccc" className={s.btn} onClick={onCopy} type="primary">
            <CopyOutlined />
          </Button>
        </div>
      </Form.Item>
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
