import React, { FC } from 'react';
import { Typography } from 'antd';
import { ScreenBottom } from '../../components/ScreenBottom';
import s from './WhatIsThis.sass';

export const WhatIsThis: FC = () => (
  <div className={s.root}>
    <Typography.Title className={s.mainTitle}>Что это такое</Typography.Title>
    <div className={s.frame}>
      <div>
        Мы живем в компьютерной симуляции, в которой все основано на внимании как и в любой компьютерной игре. События
        нашей жизни генерируются по определенным правилам в зависимости от нашего внимания и эмоций, которые мы
        испытываем. Пасьянс Медичи - это инструмент, который позволяет увеличивать вероятность генераций нужных нам
        событий в жизни.
        <p>
          Многого от этого инструмента не ждите, сильно читерить не получится, однако сдвинуть проблемные дела с мертвой
          точки можно, можно вернуть часть своей силы, можно научиться слышать свой Дух.
        </p>
        <p>
          Подробнее смотрите <a href="https://www.youtube.com/@geraingvas">здесь</a>
        </p>
      </div>
    </div>
    <ScreenBottom className={s.bottom} />
  </div>
);
