import * as React from 'react';
import cn from 'clsx';
import { HTMLAttributes, memo, useMemo } from 'react';
import { Skeleton } from '../Skeleton';
import icons from './icons';
import s from './Icon.module.sass';

export type IconType = keyof typeof icons;

export type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: never;
  type: IconType;
};

const fallback = <Skeleton className={s.skeleton} />;

export const Icon = memo<Props>(({ type, className, ...props }) => {
  const Raw = useMemo(() => React.lazy(() => icons[type]), [type]);
  return (
    <i {...props} className={cn(s.root, className)}>
      <React.Suspense fallback={fallback}>
        <Raw />
      </React.Suspense>
    </i>
  );
});

Icon.displayName = 'Icon';
