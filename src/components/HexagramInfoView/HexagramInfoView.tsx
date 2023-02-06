import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { HexagramValue } from '../../core/types';
import { getHexagramCode, getHexagramInfo } from '../../utils/hexagrams';
import s from './HexagramInfoView.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramValue;
};

export type HexagramInfoByCodeViewProps = {
  className?: string;
  code: string;
};

export const HexagramInfoByCodeView = memo<HexagramInfoByCodeViewProps>(({ className, code }) => {
  const info = useMemo(() => {
    if (!code) return null;
    return getHexagramInfo(code);
  }, [code]);

  if (!code) return null;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.title}>{info.title}</div>
      <div>{info.description}</div>
      <div className={s.bottom}>
        <a
          target="_blank"
          rel="noopener noreferer noreferrer"
          href={`https://www.astrocentr.ru/index.php?przd=izin&str=hek&id=${code}`}
        >
          Источник
        </a>
        <a target="_blank" rel="noopener noreferer noreferrer" href={`http://bit.do/hexagram${code}`}>
          Заметки
        </a>
      </div>
    </div>
  );
});

export const HexagramInfoView = memo<Props>(({ className, value }) => {
  const code = useMemo(() => {
    if (!value) return null;
    return getHexagramCode(value);
  }, [value]);

  if (!value) return null;
  return <HexagramInfoByCodeView code={code} className={className} />;
});
