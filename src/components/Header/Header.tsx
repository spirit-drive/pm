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
        key: '/',
        horizontalElem: (
          <NavLink exact className={s.horizontalLink} activeClassName={s.active} to={`/${search}`}>
            Цепочка
          </NavLink>
        ),
        verticalElem: (
          <NavLink exact className={s.verticalLink} activeClassName={s.active} to={`/${search}`}>
            Цепочка
          </NavLink>
        ),
      },
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
        key: '/what-is-this',
        horizontalElem: (
          <NavLink className={s.horizontalLink} activeClassName={s.active} to={`/what-is-this${search}`}>
            Что это такое
          </NavLink>
        ),
        verticalElem: (
          <NavLink className={s.verticalLink} activeClassName={s.active} to={`/what-is-this${search}`}>
            Что это такое
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
