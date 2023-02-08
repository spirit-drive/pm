import React, { memo, useCallback, useState } from 'react';
import cn from 'clsx';
import { InputNumber, Typography } from 'antd';
import { DNAView } from '../../components/DNAView';
import { masyanyaTable } from './masyanyaTable';
import { MasyanyaLineView } from '../../components/MasyanyaLineView';
import s from './DNA.sass';

export type Props = {
  className?: string;
  children?: never;
};

export const DNA = memo<Props>(({ className }) => {
  const [value, setValue] = useState<number>();

  const onChange = useCallback((number: number) => setValue(number), []);
  const red = [value];
  const green = masyanyaTable[value];
  const onClick = useCallback((number: number) => setValue(number), []);

  return (
    <div className={cn(s.root, className)}>
      <Typography.Title className={s.mainTitle}>ДНК Тоналя</Typography.Title>
      <InputNumber
        placeholder="Введите номер гексаграммы"
        onChange={onChange}
        value={value}
        className={s.input}
        min={1}
        max={64}
      />
      <div className={s.tip}>
        При нажатии будет подсвечена <span className={s.red}>красным</span> выбранная гексаграмма, а{' '}
        <span className={s.green}>зеленым</span> гексограммы, куда может быть осуществлен переход. Также можно текстом
        прописать номер нужной гексаграммы
      </div>
      <DNAView onClick={onClick} red={red} green={green} />
      <MasyanyaLineView className={s.line} onClick={onClick} red={red} green={green} />
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
