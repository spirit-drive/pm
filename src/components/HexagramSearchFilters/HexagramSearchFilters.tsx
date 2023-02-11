import React, { FC } from 'react';
import cn from 'clsx';
import { Slider } from 'antd';
import { HexagramChooser } from '../HexagramChooser';
import s from './HexagramSearchFilters.sass';

export type HexagramSearchFiltersProps = {
  className?: string;
  value: HexagramSearchFiltersState;
  onChange: (value: HexagramSearchFiltersState) => void;
};

export type HexagramSearchFiltersState = {
  include: {
    values: string[];
    count: { gte: number; lte: number };
  };
  exclude: {
    values: string[];
    count: { gte: number; lte: number };
  };
  potential: { gte: number; lte: number };
  selfBalancingCount: { gte: number; lte: number };
};

export const HexagramSearchFilters: FC<HexagramSearchFiltersProps> = ({ className, value = {}, onChange }) => (
  <div className={cn(s.root, className)}>
    <div>
      <div>Включая гексаграммы</div>
      <HexagramChooser
        value={value.include?.values}
        onChange={(v): void =>
          onChange({ ...value, include: { ...(value.include || {}), values: v } } as HexagramSearchFiltersState)
        }
      />
      <div>
        <div>Кол-во</div>
        <Slider
          range
          min={0}
          max={4}
          value={[value.include.count.gte, value.include.count.lte]}
          onChange={([gte, lte]): void =>
            onChange({
              ...value,
              include: { ...(value.include || {}), count: { gte, lte } },
            } as HexagramSearchFiltersState)
          }
        />
      </div>
    </div>
    <div>
      <div>Исключая гексаграммы</div>
      <HexagramChooser
        value={value?.exclude?.values}
        onChange={(v): void =>
          onChange({ ...value, exclude: { ...(value.exclude || {}), values: v } } as HexagramSearchFiltersState)
        }
      />
      <div>
        <div>Кол-во</div>
        <Slider
          range
          min={0}
          max={4}
          value={[value.exclude.count.gte, value.exclude.count.lte]}
          onChange={([gte, lte]): void =>
            onChange({
              ...value,
              exclude: { ...(value.exclude || {}), count: { gte, lte } },
            } as HexagramSearchFiltersState)
          }
        />
      </div>
    </div>
    <div>
      <div>Энергопотенциал</div>
      <Slider
        range
        min={0}
        max={6}
        value={[value.potential.gte, value.potential.lte]}
        onChange={([gte, lte]): void =>
          onChange({
            ...value,
            potential: { gte, lte },
          } as HexagramSearchFiltersState)
        }
      />
    </div>
    <div>
      <div>Кол-во возможных самобалансировок</div>
      <Slider
        range
        min={0}
        max={12}
        value={[value.selfBalancingCount.gte, value.selfBalancingCount.lte]}
        onChange={([gte, lte]): void =>
          onChange({
            ...value,
            selfBalancingCount: { gte, lte },
          } as HexagramSearchFiltersState)
        }
      />
    </div>
  </div>
);
