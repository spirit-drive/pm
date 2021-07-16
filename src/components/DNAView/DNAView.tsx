import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import s from './DNAView.sass';

export type Props = {
  className?: string;
  children?: never;
  red?: number[];
  blue?: number[];
  green?: number[];
  onClick?: (number: number) => void;
};

export const DNAView = memo<Props>(({ className, onClick = (): void => {}, red, green, blue }) => {
  const getClassName = useCallback(
    (number: number) => {
      if (red?.includes(number)) return s.red;
      if (green?.includes(number)) return s.green;
      if (blue?.includes(number)) return s.blue;
      return null;
    },
    [blue, green, red]
  );

  const handleClick = useCallback((number: number) => (): void => onClick(number), [onClick]);

  return (
    <div className={cn(s.root, className)}>
      <div className={s.main}>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(2))} role="presentation" onClick={handleClick(2)}>
            2
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(23))} role="presentation" onClick={handleClick(23)}>
            23
          </div>
          <div className={cn(s.d1, getClassName(24))} role="presentation" onClick={handleClick(24)}>
            24
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(8))} role="presentation" onClick={handleClick(8)}>
            8
          </div>
          <div className={cn(s.d2, getClassName(7))} role="presentation" onClick={handleClick(7)}>
            7
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(20))} role="presentation" onClick={handleClick(20)}>
            20
          </div>
          <div className={cn(s.d3, getClassName(19))} role="presentation" onClick={handleClick(19)}>
            19
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(16))} role="presentation" onClick={handleClick(16)}>
            16
          </div>
          <div className={cn(s.d4, getClassName(15))} role="presentation" onClick={handleClick(15)}>
            15
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(35))} role="presentation" onClick={handleClick(35)}>
            35
          </div>
          <div className={cn(s.d5, getClassName(36))} role="presentation" onClick={handleClick(36)}>
            36
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u6, getClassName(45))} role="presentation" onClick={handleClick(45)}>
            45
          </div>
          <div className={cn(s.d6, getClassName(46))} role="presentation" onClick={handleClick(46)}>
            46
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(12))} role="presentation" onClick={handleClick(12)}>
            12
          </div>
          <div className={cn(s.d5, getClassName(11))} role="presentation" onClick={handleClick(11)}>
            11
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(15))} role="presentation" onClick={handleClick(15)}>
            15
          </div>
          <div className={cn(s.d4, getClassName(16))} role="presentation" onClick={handleClick(16)}>
            16
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(52))} role="presentation" onClick={handleClick(52)}>
            52
          </div>
          <div className={cn(s.d3, getClassName(51))} role="presentation" onClick={handleClick(51)}>
            51
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(39))} role="presentation" onClick={handleClick(39)}>
            39
          </div>
          <div className={cn(s.d2, getClassName(40))} role="presentation" onClick={handleClick(40)}>
            40
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(53))} role="presentation" onClick={handleClick(53)}>
            53
          </div>
          <div className={cn(s.d1, getClassName(54))} role="presentation" onClick={handleClick(54)}>
            54
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(62))} role="presentation" onClick={handleClick(62)}>
            62
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(55))} role="presentation" onClick={handleClick(55)}>
            55
          </div>
          <div className={cn(s.d1, getClassName(56))} role="presentation" onClick={handleClick(56)}>
            56
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(32))} role="presentation" onClick={handleClick(32)}>
            32
          </div>
          <div className={cn(s.d2, getClassName(31))} role="presentation" onClick={handleClick(31)}>
            31
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(34))} role="presentation" onClick={handleClick(34)}>
            34
          </div>
          <div className={cn(s.d3, getClassName(33))} role="presentation" onClick={handleClick(33)}>
            33
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(8))} role="presentation" onClick={handleClick(8)}>
            8
          </div>
          <div className={cn(s.d2, getClassName(7))} role="presentation" onClick={handleClick(7)}>
            7
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(3))} role="presentation" onClick={handleClick(3)}>
            3
          </div>
          <div className={cn(s.d1, getClassName(4))} role="presentation" onClick={handleClick(4)}>
            4
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(29))} role="presentation" onClick={handleClick(29)}>
            29
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(59))} role="presentation" onClick={handleClick(59)}>
            59
          </div>
          <div className={cn(s.d1, getClassName(60))} role="presentation" onClick={handleClick(60)}>
            60
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(40))} role="presentation" onClick={handleClick(40)}>
            40
          </div>
          <div className={cn(s.d2, getClassName(39))} role="presentation" onClick={handleClick(39)}>
            39
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(64))} role="presentation" onClick={handleClick(64)}>
            64
          </div>
          <div className={cn(s.d3, getClassName(63))} role="presentation" onClick={handleClick(63)}>
            63
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(47))} role="presentation" onClick={handleClick(47)}>
            47
          </div>
          <div className={cn(s.d4, getClassName(48))} role="presentation" onClick={handleClick(48)}>
            48
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(6))} role="presentation" onClick={handleClick(6)}>
            6
          </div>
          <div className={cn(s.d5, getClassName(5))} role="presentation" onClick={handleClick(5)}>
            5
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u6, getClassName(46))} role="presentation" onClick={handleClick(46)}>
            46
          </div>
          <div className={cn(s.d6, getClassName(45))} role="presentation" onClick={handleClick(45)}>
            45
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(18))} role="presentation" onClick={handleClick(18)}>
            18
          </div>
          <div className={cn(s.d5, getClassName(17))} role="presentation" onClick={handleClick(17)}>
            17
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(48))} role="presentation" onClick={handleClick(48)}>
            48
          </div>
          <div className={cn(s.d4, getClassName(47))} role="presentation" onClick={handleClick(47)}>
            47
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(57))} role="presentation" onClick={handleClick(57)}>
            57
          </div>
          <div className={cn(s.d3, getClassName(58))} role="presentation" onClick={handleClick(58)}>
            58
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(32))} role="presentation" onClick={handleClick(32)}>
            32
          </div>
          <div className={cn(s.d2, getClassName(31))} role="presentation" onClick={handleClick(31)}>
            31
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(50))} role="presentation" onClick={handleClick(50)}>
            50
          </div>
          <div className={cn(s.d1, getClassName(49))} role="presentation" onClick={handleClick(49)}>
            49
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(28))} role="presentation" onClick={handleClick(28)}>
            28
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(43))} role="presentation" onClick={handleClick(43)}>
            43
          </div>
          <div className={cn(s.d1, getClassName(44))} role="presentation" onClick={handleClick(44)}>
            44
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(23))} role="presentation" onClick={handleClick(23)}>
            23
          </div>
          <div className={cn(s.d1, getClassName(24))} role="presentation" onClick={handleClick(24)}>
            24
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(27))} role="presentation" onClick={handleClick(27)}>
            27
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(3))} role="presentation" onClick={handleClick(3)}>
            3
          </div>
          <div className={cn(s.d1, getClassName(4))} role="presentation" onClick={handleClick(4)}>
            4
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(42))} role="presentation" onClick={handleClick(42)}>
            42
          </div>
          <div className={cn(s.d2, getClassName(41))} role="presentation" onClick={handleClick(41)}>
            41
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(51))} role="presentation" onClick={handleClick(51)}>
            51
          </div>
          <div className={cn(s.d3, getClassName(52))} role="presentation" onClick={handleClick(52)}>
            52
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(21))} role="presentation" onClick={handleClick(21)}>
            21
          </div>
          <div className={cn(s.d4, getClassName(22))} role="presentation" onClick={handleClick(22)}>
            22
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(17))} role="presentation" onClick={handleClick(17)}>
            17
          </div>
          <div className={cn(s.d5, getClassName(18))} role="presentation" onClick={handleClick(18)}>
            18
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u6, getClassName(25))} role="presentation" onClick={handleClick(25)}>
            25
          </div>
          <div className={cn(s.d6, getClassName(26))} role="presentation" onClick={handleClick(26)}>
            26
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(36))} role="presentation" onClick={handleClick(36)}>
            36
          </div>
          <div className={cn(s.d5, getClassName(35))} role="presentation" onClick={handleClick(35)}>
            35
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(22))} role="presentation" onClick={handleClick(22)}>
            22
          </div>
          <div className={cn(s.d4, getClassName(21))} role="presentation" onClick={handleClick(21)}>
            21
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(63))} role="presentation" onClick={handleClick(63)}>
            63
          </div>
          <div className={cn(s.d3, getClassName(64))} role="presentation" onClick={handleClick(64)}>
            64
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(37))} role="presentation" onClick={handleClick(37)}>
            37
          </div>
          <div className={cn(s.d2, getClassName(38))} role="presentation" onClick={handleClick(38)}>
            38
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(55))} role="presentation" onClick={handleClick(55)}>
            55
          </div>
          <div className={cn(s.d1, getClassName(56))} role="presentation" onClick={handleClick(56)}>
            56
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(30))} role="presentation" onClick={handleClick(30)}>
            30
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(50))} role="presentation" onClick={handleClick(50)}>
            50
          </div>
          <div className={cn(s.d1, getClassName(49))} role="presentation" onClick={handleClick(49)}>
            49
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(14))} role="presentation" onClick={handleClick(14)}>
            14
          </div>
          <div className={cn(s.d2, getClassName(13))} role="presentation" onClick={handleClick(13)}>
            13
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(20))} role="presentation" onClick={handleClick(20)}>
            20
          </div>
          <div className={cn(s.d3, getClassName(19))} role="presentation" onClick={handleClick(19)}>
            19
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(42))} role="presentation" onClick={handleClick(42)}>
            42
          </div>
          <div className={cn(s.d2, getClassName(41))} role="presentation" onClick={handleClick(41)}>
            41
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(59))} role="presentation" onClick={handleClick(59)}>
            59
          </div>
          <div className={cn(s.d1, getClassName(60))} role="presentation" onClick={handleClick(60)}>
            60
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(61))} role="presentation" onClick={handleClick(61)}>
            61
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(54))} role="presentation" onClick={handleClick(54)}>
            54
          </div>
          <div className={cn(s.d1, getClassName(53))} role="presentation" onClick={handleClick(53)}>
            53
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(38))} role="presentation" onClick={handleClick(38)}>
            38
          </div>
          <div className={cn(s.d2, getClassName(37))} role="presentation" onClick={handleClick(37)}>
            37
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(58))} role="presentation" onClick={handleClick(58)}>
            58
          </div>
          <div className={cn(s.d3, getClassName(57))} role="presentation" onClick={handleClick(57)}>
            57
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(10))} role="presentation" onClick={handleClick(10)}>
            10
          </div>
          <div className={cn(s.d4, getClassName(9))} role="presentation" onClick={handleClick(9)}>
            9
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(11))} role="presentation" onClick={handleClick(11)}>
            11
          </div>
          <div className={cn(s.d5, getClassName(12))} role="presentation" onClick={handleClick(12)}>
            12
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u6, getClassName(26))} role="presentation" onClick={handleClick(26)}>
            26
          </div>
          <div className={cn(s.d6, getClassName(25))} role="presentation" onClick={handleClick(25)}>
            25
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u5, getClassName(5))} role="presentation" onClick={handleClick(5)}>
            5
          </div>
          <div className={cn(s.d5, getClassName(6))} role="presentation" onClick={handleClick(6)}>
            6
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u4, getClassName(9))} role="presentation" onClick={handleClick(9)}>
            9
          </div>
          <div className={cn(s.d4, getClassName(10))} role="presentation" onClick={handleClick(10)}>
            10
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u3, getClassName(34))} role="presentation" onClick={handleClick(34)}>
            34
          </div>
          <div className={cn(s.d3, getClassName(33))} role="presentation" onClick={handleClick(33)}>
            33
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u2, getClassName(14))} role="presentation" onClick={handleClick(14)}>
            14
          </div>
          <div className={cn(s.d2, getClassName(13))} role="presentation" onClick={handleClick(13)}>
            13
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.u1, getClassName(43))} role="presentation" onClick={handleClick(43)}>
            43
          </div>
          <div className={cn(s.d1, getClassName(44))} role="presentation" onClick={handleClick(44)}>
            44
          </div>
        </div>
        <div className={s.col}>
          <div className={cn(s.zero, getClassName(1))} role="presentation" onClick={handleClick(1)}>
            1
          </div>
        </div>
      </div>
    </div>
  );
});
