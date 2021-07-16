import React, { memo, useEffect, useMemo, useRef } from 'react';
import cn from 'clsx';
import { shallowCopy } from '../../utils/helpers';
import s from './ErrorView.sass';

export type Props = React.HTMLAttributes<HTMLDivElement>;

export const ErrorView = memo<Props>(({ className, children, ...props }) => {
  const visible = useMemo<boolean>(() => !!children, [children]);

  const prevChildrenCopy = useRef<typeof children>();
  useEffect(() => {
    if (children) {
      prevChildrenCopy.current = shallowCopy(children);
    }
  }, [children]);

  const prevChildren = useMemo(() => {
    if (children) return children;
    return prevChildrenCopy.current;
  }, [children]);

  return (
    <div {...props} className={cn(s.root, className)}>
      <div className={cn([s.holder, visible && s.visible])}>{children}</div>
      <div className={cn([s.error, visible && s.visible])}>{prevChildren}</div>
    </div>
  );
});
