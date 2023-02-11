import React, { FC } from 'react';
import cn from 'clsx';
import { Dropdown } from 'antd';
import s from './HexagramByCodeDropdown.sass';
import { HexagramInfoByCodeView } from '../HexagramInfoView';

export type HexagramByCodeDropdownProps = {
  className?: string;
  code: string | number;
  children: React.ReactNode;
};

export const HexagramByCodeDropdown: FC<HexagramByCodeDropdownProps> = ({ className, children, code }) => (
  <Dropdown overlay={<HexagramInfoByCodeView className={cn(s.info, className)} code={code.toString()} />}>
    {children}
  </Dropdown>
);
