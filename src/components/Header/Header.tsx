import React, { memo } from 'react';
import cn from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { Frame } from '../Frame';
import { ResponseNavigation, ResponseNavigationProps } from '../ResponseNavigation';
import s from './Header.sass';

export type HeaderProps = {
  className?: string;
};

export const Header = memo<HeaderProps>(({ className }) => {
  const { search } = useLocation();
  const links: Pick<ResponseNavigationProps, 'left' | 'right'> = {
    left: [
      {
        key: '/dna',
        horizontalElem: (
          <NavLink className={s.horizontalLink} activeClassName={s.active} to={`/dna${search}`}>
            ДНК Тоналя
          </NavLink>
        ),
        verticalElem: (
          <NavLink className={s.verticalLink} activeClassName={s.active} to={`/dna${search}`}>
            ДНК Тоналя
          </NavLink>
        ),
      },
      {
        key: '/',
        horizontalElem: (
          <NavLink exact className={s.horizontalLink} activeClassName={s.active} to={`/${search}`}>
            Гексаграммный анализ
          </NavLink>
        ),
        verticalElem: (
          <NavLink exact className={s.verticalLink} activeClassName={s.active} to={`/${search}`}>
            Гексаграммный анализ
          </NavLink>
        ),
      },
    ],
  };
  const { left, right } = links;

  return (
    <header className={cn(s.root, className)}>
      <Frame className={s.frame}>
        <Logo className={s.logo} />
        <ResponseNavigation title="Навигация" className={s.menu} left={left} right={right} />
      </Frame>
    </header>
  );
});

Header.displayName = 'HeaderOrigin';
