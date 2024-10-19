import { Agent } from '../../../../../../publicTypes';
import { CSSProperties } from 'react';

export interface TeamListItemProps {
  item: Agent;
  onSelected: (item: Agent) => void;
  style?: CSSProperties;
}
