import React, { FC, useMemo } from 'react';
import cn from 'clsx';
import { Slider, Divider } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { HexagramChooser } from '../HexagramChooser';
import { ChainItemChooser } from '../ChainItemChooser';
import { Solitaire } from '../../core/Solitaire';
import s from './HexagramSearchFilters.sass';

export type HexagramSearchFiltersProps = {
  className?: string;
  chain: string;
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
  stableCards: string[];
  potential: { gte: number; lte: number };
  selfBalancingCount: { gte: number; lte: number };
};

export const HexagramSearchFilters: FC<HexagramSearchFiltersProps> = ({ className, chain, value = {}, onChange }) => {
  const chainAdv = useMemo(() => new Solitaire(chain).chainAdvanced.split(' '), [chain]);
  return (
    <div className={cn(s.root, className)}>
      <div>
        <div>
          Не перемещать выбранные карты
          <ClearOutlined
            className={s.reset}
            onClick={(): void => onChange({ ...value, stableCards: [] } as HexagramSearchFiltersState)}
          />
        </div>
        <ChainItemChooser
          chain={chainAdv}
          value={value.stableCards}
          onChange={(v): void => onChange({ ...value, stableCards: v } as HexagramSearchFiltersState)}
        />
      </div>
      <Divider />
      <div>
        <div>
          Включая гексаграммы
          <ClearOutlined
            className={s.reset}
            onClick={(): void =>
              onChange({ ...value, include: { ...(value.include || {}), values: [] } } as HexagramSearchFiltersState)
            }
          />
        </div>
        <HexagramChooser
          value={value.include?.values}
          onChange={(v): void =>
            onChange({ ...value, include: { ...(value.include || {}), values: v } } as HexagramSearchFiltersState)
          }
        />
        <div>
          <div>Кол-во</div>
          <div>{[value.include.count.gte, value.include.count.lte].join(' - ')}</div>
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
      <Divider />
      <div>
        <div>
          Исключая гексаграммы
          <ClearOutlined
            className={s.reset}
            onClick={(): void =>
              onChange({ ...value, exclude: { ...(value.exclude || {}), values: [] } } as HexagramSearchFiltersState)
            }
          />
        </div>
        <HexagramChooser
          value={value?.exclude?.values}
          onChange={(v): void =>
            onChange({ ...value, exclude: { ...(value.exclude || {}), values: v } } as HexagramSearchFiltersState)
          }
        />
        <div>
          <div>Кол-во</div>
          <div>{[value.exclude.count.gte, value.exclude.count.lte].join(' - ')}</div>
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
      <Divider />
      <div>
        <div>Энергопотенциал</div>
        <div>{[value.potential.gte, value.potential.lte].join(' - ')}</div>
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
      <Divider />
      <div>
        <div>Кол-во возможных самобалансировок</div>
        <div>{[value.selfBalancingCount.gte, value.selfBalancingCount.lte].join(' - ')}</div>
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
};
