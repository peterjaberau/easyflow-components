import { LayoutAutoChange } from '../../LayoutAutoChange';
import { FC } from 'react';
import { MarketShareAgentProps } from './interface';
import { MarketShareAgentPC } from './pc';
import { MarketShareAgentMobile } from './mobile';
import React from 'react';

export const MarketShareAgent: FC<MarketShareAgentProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<MarketShareAgentPC {...props} />}
      mobilePage={<MarketShareAgentMobile {...props} />}
    />
  );
};

MarketShareAgent.displayName = 'MarketShareAgent';
