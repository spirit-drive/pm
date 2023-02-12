import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';
import { Typography, Tooltip, Collapse } from 'antd';
import { BookOutlined, MinusOutlined } from '@ant-design/icons';
import { Solitaire } from '../../core/Solitaire';
import { HexagramsView } from '../../components/HexagramsView';
import { random } from '../../utils/random';
import { useSaveToUrl } from './useSaveToUrl';
import { SolitaireChainView } from '../../components/SolitaireChainView';
import { useHistory } from '../../hooks/useHistory';
import { HistoryControl } from '../../components/HistoryControl/HistoryControl';
import { BaseChains } from '../../components/BaseChains';
import { SolitaireInput } from '../../components/SolitaireInput/SolitaireInput';
import { ScreenBottom } from '../../components/ScreenBottom';
import { HexagramsMoldElement, HexagramsMoldElementProps } from '../../components/HexagramsMoldElement';
import { HexagramSearch } from '../../components/HexagramSearch';
import { CyrillicSuits } from '../../core/types';
import s from './Analise.sass';

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

  const onChangeHexagram = useCallback<HexagramsMoldElementProps['onChange']>(([that, to]) => {
    setValue(solitaireCopy.current.exchange(`6${CyrillicSuits[that]}`, `6${CyrillicSuits[to]}`).join(' '));
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
      <Typography.Title className={s.mainTitle}>Цепочка</Typography.Title>
      <div className={s.section}>
        <Collapse defaultActiveKey="1" ghost>
          <Collapse.Panel
            className={s.panel}
            key="1"
            header={<Typography.Title className={s.title}>Как с этим работать?</Typography.Title>}
          >
            <div className={s.tip}>
              Данный экран позволяет
              <ul>
                <li>Менять местами гексаграммы</li>
                <li>Менять местами карты в раскладе, что позволяет подстроить нужные обвалы</li>
                <li>Искать новые расклады на основе текущего с заданными гексаграммами, балансировками, обвалами</li>
                <li>Вводить цепочку вручную</li>
                <li>
                  Если у вас нет готовой цепочки, воспользуйтесь рецептами <BookOutlined />
                </li>
              </ul>
              В секции &quot;<b>Расклад</b>&quot; можно менять местами карты и находить нужные efl. В секции &quot;
              <b>Поиск гексаграмм в раскладе</b>&quot; можно найти идеальную для себя цепочку, с необходимыми
              гексаграммами, самобалансировкой, энергопотенциалом балансировки. Выбираете список гекс, которые вас
              устроят, а позже гексаграммы можно менять местами. Подробнее как работать смотрите в каждой секции.
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
      <SolitaireInput message={message} manage={manage} value={value} onChange={onChange} />
      <div className={s.section}>
        <Collapse defaultActiveKey="1" ghost>
          <Collapse.Panel className={s.panel} key="1" header={headerElement}>
            {((): React.ReactElement => {
              if (message || !solitaire?._chain) return <MinusOutlined />;
              return <SolitaireChainView setValue={setValue} onChange={onChangeSolitaire} solitaire={solitaire} />;
            })()}
          </Collapse.Panel>
        </Collapse>
      </div>
      {solitaire?._chain && (
        <div className={s.section}>
          <Collapse ghost>
            <Collapse.Panel
              className={s.panel}
              key="1"
              header={<Typography.Title className={s.title}>Поиск гексаграмм в раскладе</Typography.Title>}
            >
              <div className={s.tip}>
                Мы берем расклад, который вы установили, и начинаем менять местами номиналы, например все Тузы меняем на
                все 6 и смотрим что получается, расположение и размер обвалов (efl) будет сохранен. Всего существует
                362880 вариантов перестановок номиналов, против 371993326789901217467999448150835200000000 вариантов
                раскладов, поэтому в автоматическом режиме нет гарантии, что получится найти идеальный расклад и нужно
                будет на основе своей интуиции поменять карты местами. В секции &quot;Расклад&quot;, в режиме
                &quot;Обмен карт индивидуально&quot; выберите карты, подсвеченные красным, что создаст новые 362880
                вариантов перестановок
              </div>
              <HexagramSearch value={value} setValue={setValue} />
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
      <div className={s.section}>
        <div>
          <Typography.Text className={s.title}>Гексаграммы</Typography.Text>
        </div>
        <div className={s.tip}>Нажмите на гексаграммы, которые хотите поменять местами</div>
        <HexagramsMoldElement
          message={message}
          onChange={onChangeHexagram}
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
