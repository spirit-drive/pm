import React from 'react';

export type Props = React.HTMLAttributes<SVGElement>;

export const Svg: React.FC<Props> = (props) => (
  <svg data-testid="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props} />
);
