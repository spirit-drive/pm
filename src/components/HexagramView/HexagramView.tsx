import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Dropdown } from 'antd';
import { HexagramOriginView } from '../HexagramOriginView';
import { HexagramMold, HexagramValue } from '../../core/types';
import { HexagramCode } from '../HexagramCode';
import { HexagramNumber } from '../HexagramNumber';
import { HexagramMoldView } from '../HexagramMoldView';
import { HexagramInfoView } from '../HexagramInfoView';
import s from './HexagramView.sass';

export type Props = {
  className?: string;
  children?: never;
  value: HexagramValue;
  hexagramsMold?: HexagramMold;
};

export const HexagramView = memo<Props>(({ className, hexagramsMold, value }) => {
  const overlay = useMemo(() => <HexagramInfoView className={s.info} value={value} />, [value]);
  if (!value) return null;

  return (
    <Dropdown overlay={overlay}>
      <div className={cn(s.root, className)}>
        <div className={s.main}>
          <HexagramMoldView className={s.mold} value={hexagramsMold} />
          <div>
            <div className={s.top}>
              <HexagramNumber className={s.number} value={value} />
              <HexagramCode value={value} />
            </div>
            <HexagramOriginView value={value} />
          </div>
        </div>
      </div>
    </Dropdown>
  );
});
