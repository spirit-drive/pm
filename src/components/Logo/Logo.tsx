import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import s from './Logo.sass';

export type Props = {
  className?: string;
  children?: never;
};

export const Logo = memo<Props>(({ className }) => (
  <Link to="/" className={cn(s.root, className)}>
    Logo
  </Link>
));

Logo.displayName = 'Logo';
