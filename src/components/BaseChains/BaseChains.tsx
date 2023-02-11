import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Dropdown, Tooltip } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown/dropdown';
import { Icon } from '../Icon';
import data from './data.json';
import { BaseChainsMenu, BaseChainsMenuProps } from './BaseChainsMenu';
import { ChainData } from './types';
import s from './BaseChains.module.sass';

const enhancedData: ChainData[] = Object.keys(data).map((chain: keyof typeof data) => ({
  chain,
  tag: data[chain].tag,
  selfBalancing: data[chain].hexagrams,
  hexagrams: data[chain].hexagrams,
}));

export type BaseChainsProps = Omit<BaseChainsMenuProps, 'data'> & {
  className?: string;
};

const trigger: DropDownProps['trigger'] = ['click'];

export const BaseChains = memo<BaseChainsProps>(({ className, onChoose }) => (
  <Tooltip title="Рецепты">
    <div className={cn(s.root, className)} role="presentation" onClick={(e): void => e.stopPropagation()}>
      <Dropdown trigger={trigger} overlay={<BaseChainsMenu data={enhancedData} onChoose={onChoose} />}>
        <Button size="small">
          <Icon type="openedBook" />
        </Button>
      </Dropdown>
    </div>
  </Tooltip>
));

BaseChains.displayName = 'BaseChains';
