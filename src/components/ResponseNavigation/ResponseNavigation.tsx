import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useOpenCloseNotMemo } from '../../hooks/useOpenCloseNotMemo';
import s from './ResponseNavigation.sass';

export type ResponseNavigationItem = {
  key: string;
  horizontalElem: React.ReactNode | React.ReactElement;
  verticalElem: React.ReactNode | React.ReactElement;
};

export type ResponseNavigationProps = {
  className?: string;
  left?: ResponseNavigationItem[];
  right?: ResponseNavigationItem[];
  title?: React.ReactNode | React.ReactElement;
};

export const ResponseNavigation = memo<ResponseNavigationProps>(({ className, title, right, left }) => {
  const [opened, { open, close }] = useOpenCloseNotMemo();
  const [mobile, setMobile] = useState<boolean>(false);

  const root = useRef<HTMLDivElement>();

  useEffect(() => {
    const fn = (): void => setMobile(root.current && root.current.scrollHeight > root.current.offsetHeight);
    const mutation = new MutationObserver(fn);
    const resize = new ResizeObserver(fn);

    mutation.observe(root.current, { subtree: true, childList: true });
    resize.observe(root.current);
    return (): void => {
      mutation.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <div className={cn(s.root, className)}>
      <nav ref={root} className={cn(s.wrapper, mobile && s.mobile)}>
        {left && (
          <ul className={s.elem}>
            {left.map((i) => (
              <li className={s.li} key={i.key}>
                {i.horizontalElem}
              </li>
            ))}
          </ul>
        )}
        {right && (
          <ul className={s.elem}>
            {right.map((i) => (
              <li className={s.li} key={i.key}>
                {i.horizontalElem}
              </li>
            ))}
          </ul>
        )}
      </nav>
      <button type="button" onClick={open} className={cn(s.menu, s.menuButton, mobile && s.mobile)}>
        <MenuOutlined />
      </button>
      <div className={cn(s.holder, opened && s.opened)}>
        <div className={s.closeHolder}>
          <div className={s.menuTitle}>{title}</div>
          <button type="button" onClick={close} className={s.menuButton}>
            <CloseOutlined />
          </button>
        </div>
        <nav>
          {left && (
            <ul>
              {left.map((i) => (
                <li role="presentation" onClick={close} className={s.li} key={i.key}>
                  {i.verticalElem}
                </li>
              ))}
            </ul>
          )}
          {right && (
            <ul>
              {right.map((i) => (
                <li role="presentation" onClick={close} className={s.li} key={i.key}>
                  {i.verticalElem}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
});

ResponseNavigation.displayName = 'ResponseNavigation';
