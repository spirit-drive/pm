import React, { memo } from 'react';
import cn from 'clsx';
import s from './ScreenBottom.sass';

export type ScreenBottomProps = {
  className?: string;
};

export const ScreenBottom = memo<ScreenBottomProps>(({ className }) => (
  <div className={cn(s.root, className)}>
    Icons made by{' '}
    <a href="https://smashicons.com/" title="Smashicons">
      Smashicons
    </a>{' '}
    from{' '}
    <a href="https://www.flaticon.com/" title="Flaticon">
      www.flaticon.com
    </a>
  </div>
));

ScreenBottom.displayName = 'ScreenBottom';
