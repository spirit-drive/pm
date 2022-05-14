import React, { memo, useRef, useEffect } from 'react';
import cn from 'clsx';
import { HexagramView } from '../HexagramView';
import { HexagramsMap } from '../../utils/hexagrams';
import { HexagramValue } from '../../core/types';
import s from './HexagramSelect.module.sass';

export type HexagramSelectProps = {
  className?: string;
  disabled?: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

const hexagramNumbers = Array(64)
  .fill('')
  .map((_, i) => `${i + 1}`);

export const getHexagramValue = (number: string): HexagramValue =>
  HexagramsMap[number].split('').map((i) => parseInt(i, 10)) as HexagramValue;

export const HexagramSelect = memo<HexagramSelectProps>(({ className, disabled, value, onChange }) => {
  const valueCopy = useRef(value || []);
  useEffect(() => {
    valueCopy.current = value || [];
  }, [value]);
  return (
    <div className={cn(s.root, className)}>
      {hexagramNumbers.map((number) => {
        const onClick = (): void => {
          if (disabled.includes(number)) return;
          onChange(
            valueCopy.current.includes(number)
              ? valueCopy.current.filter((i) => i !== number)
              : [...valueCopy.current, number]
          );
        };
        const clx = cn(s.item, value.includes(number) && s.active, disabled.includes(number) && s.disabled);
        return (
          <div role="presentation" key={number} className={clx} onClick={onClick}>
            <HexagramView value={getHexagramValue(number)} />
          </div>
        );
      })}
    </div>
  );
});

HexagramSelect.displayName = 'HexagramSelect';
