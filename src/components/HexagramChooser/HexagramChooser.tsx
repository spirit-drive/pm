import React, { memo } from 'react';
import cn from 'clsx';
import { HexagramByCodeView } from '../HexagramByCodeView';
import s from './HexagramChooser.sass';

export type HexagramChooserProps = {
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
};

export const HexagramChooser = memo<HexagramChooserProps>(({ className, value = [], onChange }) => (
  <div className={cn(s.root, className)}>
    {Array(64)
      .fill('')
      .map((_, i) => {
        const code = (i + 1).toString();
        const active = value.includes(code);
        const newValue = active ? value.filter((l) => l !== code) : [...value, code];
        return (
          <HexagramByCodeView
            key={code}
            className={cn(s.item, active && s.active)}
            code={code}
            onClick={(): void => onChange(newValue)}
          />
        );
      })}
  </div>
));

HexagramChooser.displayName = 'HexagramChooser';
