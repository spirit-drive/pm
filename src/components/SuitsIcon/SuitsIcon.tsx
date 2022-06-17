import React, { memo } from 'react';
import cn from 'clsx';
import Icon from '@ant-design/icons';
import s from './SuitsIcon.module.sass';
import { clubs } from '../../icons/clubs';
import { Suits } from '../../core/types';
import { spades } from '../../icons/spades';
import { hearts } from '../../icons/hearts';
import { diamonds } from '../../icons/diamonds';

export type SuitsIconProps = {
  className?: string;
  suit: Suits;
};

const icon = {
  [Suits.clubs]: clubs,
  [Suits.spades]: spades,
  [Suits.hearts]: hearts,
  [Suits.diamonds]: diamonds,
};

export const SuitsIcon = memo<SuitsIconProps>(({ className, suit }) => (
  <Icon component={icon[suit]} className={cn(s[suit], className)} />
));

SuitsIcon.displayName = 'SuitsIcon';
