import React, { FC } from 'react';
import cn from 'clsx';
import { Dropdown } from 'antd';
import { HexagramInfoByCodeView } from '../HexagramInfoView';
import s from './HexagramByCodeView.sass';

export type HexagramByCodeViewProps = {
  className?: string;
  code: string | number;
  onClick?: () => void;
};

export const HexagramByCodeView: FC<HexagramByCodeViewProps> = ({ className, code, onClick }) => (
  <Dropdown overlay={<HexagramInfoByCodeView className={s.info} code={code.toString()} />}>
    <div className={cn(s.root, className)} role="presentation" onClick={onClick}>
      {code}
    </div>
  </Dropdown>
);
