import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Typography } from 'antd';
import { Hexagrams, HexagramsMold, Suits } from '../../core/types';
import { HexagramView } from '../HexagramView';
import s from './HexagramsView.sass';
import { SuitsIcon } from '../SuitsIcon';

export type Props = {
  className?: string;
  children?: never;
  value: Hexagrams;
  onChange?: (value: [Suits, Suits]) => void;
  hexagramsMold?: HexagramsMold;
};

export const HexagramsView = memo<Props>(({ className, hexagramsMold, onChange, value }) => {
  const [chosen, setChosen] = useState<Suits>();

  const handleChange = (target: Suits) => (): void => {
    if (!onChange) return;
    if (chosen) {
      if (chosen === target) {
        setChosen(null);
        return;
      }
      setChosen(null);
      onChange([chosen, target]);
      return;
    }
    setChosen(target);
  };

  if (!value) return null;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.clubs} className={s.icon} />
          <Typography.Text className={s.title}>Крести</Typography.Text>
        </div>
        <div role="presentation" onClick={handleChange(Suits.clubs)}>
          <HexagramView
            className={cn(s.hex, chosen === Suits.clubs && s.active)}
            hexagramsMold={hexagramsMold?.clubs}
            value={value.clubs}
          />
        </div>
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.spades} className={s.icon} />
          <Typography.Text className={s.title}>Пики</Typography.Text>
        </div>
        <div role="presentation" onClick={handleChange(Suits.spades)}>
          <HexagramView
            className={cn(s.hex, chosen === Suits.spades && s.active)}
            hexagramsMold={hexagramsMold?.spades}
            value={value.spades}
          />
        </div>
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.hearts} className={s.icon} />
          <Typography.Text className={s.title}>Червы</Typography.Text>
        </div>
        <div role="presentation" onClick={handleChange(Suits.hearts)}>
          <HexagramView
            className={cn(s.hex, chosen === Suits.hearts && s.active)}
            hexagramsMold={hexagramsMold?.hearts}
            value={value.hearts}
          />
        </div>
      </div>
      <div className={s.item}>
        <div className={s.line}>
          <SuitsIcon suit={Suits.diamonds} className={s.icon} />
          <Typography.Text className={s.title}>Буби</Typography.Text>
        </div>
        <div role="presentation" onClick={handleChange(Suits.diamonds)}>
          <HexagramView
            className={cn(s.hex, chosen === Suits.diamonds && s.active)}
            hexagramsMold={hexagramsMold?.diamonds}
            value={value.diamonds}
          />
        </div>
      </div>
    </div>
  );
});
