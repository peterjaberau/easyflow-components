import { MarketAIAgent } from '../../../../../../MarketAgent';
import { Agent } from '../../../../../../publicTypes';
import { CSSProperties } from 'react';

export interface MarketListItemProps {
  item: MarketAIAgent;
  onSelected: (item: Agent) => void;
  style?: CSSProperties;
}
