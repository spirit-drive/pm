import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Dropdown, Tooltip } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown/dropdown';
import { Icon } from '../Icon';
import { BaseChainsMenu, BaseChainsMenuProps } from './BaseChainsMenu';
import s from './BaseChains.module.sass';

export type BaseChainsProps = BaseChainsMenuProps & {
  className?: string;
};

const trigger: DropDownProps['trigger'] = ['click'];

export const BaseChains = memo<BaseChainsProps>(({ className, onChoose }) => (
  <Tooltip title="Рецепты">
    <div className={cn(s.root, className)} role="presentation" onClick={(e): void => e.stopPropagation()}>
      <Dropdown trigger={trigger} overlay={<BaseChainsMenu onChoose={onChoose} />}>
        <Button size="small">
          <Icon type="openedBook" />
        </Button>
      </Dropdown>
    </div>
  </Tooltip>
));

BaseChains.displayName = 'BaseChains';
