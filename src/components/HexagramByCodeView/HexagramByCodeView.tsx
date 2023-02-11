import React, { FC } from 'react';
import cn from 'clsx';
import { HexagramByCodeDropdown } from '../HexagramByCodeDropdown';
import s from './HexagramByCodeView.sass';

export type HexagramByCodeViewProps = {
  className?: string;
  code: string | number;
  onClick?: () => void;
};

export const HexagramByCodeView: FC<HexagramByCodeViewProps> = ({ className, code, onClick }) => (
  <HexagramByCodeDropdown code={code}>
    <div className={cn(s.root, className)} role="presentation" onClick={onClick}>
      {code}
    </div>
  </HexagramByCodeDropdown>
);
