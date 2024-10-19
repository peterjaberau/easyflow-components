import { MARKET_AGENT_SORTED_OPTIONS } from '../../../../../../MarketAgent';
import { Agent } from '../../../../../../publicTypes';

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void;
  search: string;
  sortBy: MARKET_AGENT_SORTED_OPTIONS;
}
