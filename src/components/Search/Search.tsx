import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Collapse, Button } from 'antd';
import * as db from '../../core/nominals/possible-chains-data.json';
import { HexagramSelect } from '../HexagramSelect';
import { Suits } from '../../core/types';
import s from './Search.module.sass';

export type SearchProps = {
  className?: string;
  setValue: (value: string) => void;
};

export const Search = memo<SearchProps>(({ className, setValue }) => {
  const [exclude, setExclude] = useState<string[]>([]);
  const [include, setInclude] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);

  const onSearch = (): void => {
    const chains = Object.keys(db);
    const result = chains.filter((chain) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { selfBalancing } = db[chain] as { selfBalancing: Array<Record<Suits, string>> };
      if (!selfBalancing || selfBalancing.length > 1) return false;
      const set = [...new Set(selfBalancing.reduce((acc, item) => [...acc, ...Object.values(item)], []))];
      if (exclude.some((e) => set.includes(e))) return false;
      if (include.every((e) => set.includes(e))) return true;
      return false;
    });
    setSearch(result);
  };

  return (
    <div className={cn(s.root, className)}>
      <Collapse defaultActiveKey="1" ghost>
        <Collapse.Panel className={s.panel} key="1" header="Гексаграммы">
          <HexagramSelect disabled={exclude} value={include} onChange={setInclude} />
          <HexagramSelect disabled={include} value={exclude} onChange={setExclude} />
        </Collapse.Panel>
      </Collapse>
      <Button onClick={onSearch}>Искать</Button>
      {search.map((item) => (
        <div className={s.item} role="presentation" onClick={(): void => setValue(item)} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
});

Search.displayName = 'Search';
