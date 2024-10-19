/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { DynamicMenuProps } from './interface';
import { MenuItem } from './menuItem';
import { menuContainerStyle } from './style';
import React from 'react';

export const DynamicMenu: FC<DynamicMenuProps> = (props) => {
  const { config, selectedKey } = props;
  return (
    <div css={menuContainerStyle}>
      {config
        .filter((item) => !item.hidden)
        .map((item) => (
          <MenuItem {...item} key={item.labelKey} isSelected={item.labelKey === selectedKey} />
        ))}
    </div>
  );
};

export * from './interface';
