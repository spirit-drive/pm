import React, { FC } from 'react';
import { Typography } from 'antd';
import { ScreenBottom } from '../../components/ScreenBottom';
import s from './WhatIsThis.sass';

export const WhatIsThis: FC = () => (
  <div className={s.root}>
    <Typography.Title className={s.mainTitle}>Что это такое</Typography.Title>
    <div>Мы живем в компьютерной симуляции</div>
    <ScreenBottom className={s.bottom} />
  </div>
);
