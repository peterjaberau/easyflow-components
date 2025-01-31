/** @jsxImportSource @emotion/react */
import { LayoutAutoChange } from '../../LayoutAutoChange';
import { FC } from 'react';
import { MarketShareAppProps } from './interface';
import { MarketShareAppMobile } from './mobile';
import { MarketShareAppPC } from './pc';
import React from 'react';

export const MarketShareApp: FC<MarketShareAppProps> = (props) => {
  return (
    <LayoutAutoChange desktopPage={<MarketShareAppPC {...props} />} mobilePage={<MarketShareAppMobile {...props} />} />
  );
};

MarketShareApp.displayName = 'MarketShareApp';
