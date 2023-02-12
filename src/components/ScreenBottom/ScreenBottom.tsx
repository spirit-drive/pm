import React, { memo } from 'react';
import cn from 'clsx';
import s from './ScreenBottom.sass';

export type ScreenBottomProps = {
  className?: string;
};

export const ScreenBottom = memo<ScreenBottomProps>(({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={s.block}>
      <div>Приложение работает на платной основе, потому буду благодарен за поддержку</div>
      <div>Тинькофф: 5536 9137 9113 9112</div>
      <div>Яндекс кошелек: 410012281752876</div>
      <div>Буду рад обратной связи в телеграмм @spirit_drive</div>
    </div>
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
