import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { DropDownProps } from 'antd/lib/dropdown/dropdown';
import s from './BaseChains.module.sass';
import { BaseChainsMenu, BaseChainsMenuProps } from './BaseChainsMenu';

export type BaseChainsProps = BaseChainsMenuProps & {
  className?: string;
};

const trigger: DropDownProps['trigger'] = ['click'];

export const BaseChains = memo<BaseChainsProps>(({ className, onChoose }) => (
  <div role="presentation" onClick={(e): void => e.stopPropagation()}>
    <Dropdown trigger={trigger} overlay={<BaseChainsMenu onChoose={onChoose} />}>
      <Button size="small" className={cn(s.root, className)}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  </div>
));

BaseChains.displayName = 'BaseChains';
