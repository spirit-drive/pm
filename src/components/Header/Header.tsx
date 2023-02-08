import React, { memo } from 'react';
import cn from 'clsx';
import { NavLink, NavLinkProps, useSearchParams } from 'react-router-dom';
import { Logo } from '../Logo';
import { Frame } from '../Frame';
import { ResponseNavigation, ResponseNavigationProps } from '../ResponseNavigation';
import s from './Header.sass';

export type HeaderProps = {
  className?: string;
};

const horClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.horizontalLink, isActive && s.active);
const verClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.verticalLink, isActive && s.active);

export const Header = memo<HeaderProps>(({ className }) => {
  const [search] = useSearchParams();
  const searchString = search.toString();
  const links: Pick<ResponseNavigationProps, 'left' | 'right'> = {
    left: [
      {
        key: '/dna',
        horizontalElem: (
          <NavLink className={horClassName} to={[`/dna`, searchString].filter(Boolean).join('?')}>
            ДНК Тоналя
          </NavLink>
        ),
        verticalElem: (
          <NavLink className={verClassName} to={[`/dna`, searchString].filter(Boolean).join('?')}>
            ДНК Тоналя
          </NavLink>
        ),
      },
      {
        key: '/',
        horizontalElem: (
          <NavLink className={horClassName} to={[`/`, searchString].filter(Boolean).join('?')}>
            Гексаграммный анализ
          </NavLink>
        ),
        verticalElem: (
          <NavLink className={verClassName} to={[`/`, searchString].filter(Boolean).join('?')}>
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
