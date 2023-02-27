import React, { FC } from 'react';
import cn from 'clsx';
import { Header } from '../Header';
import s from './Layout.sass';

export type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ className, children }) => (
  <div className={cn(s.root, className)} id="layout">
    <Header />
    {children}
  </div>
);
