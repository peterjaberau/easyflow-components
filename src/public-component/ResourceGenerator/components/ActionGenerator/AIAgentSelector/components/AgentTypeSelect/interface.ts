import { MARKET_AGENT_SORTED_OPTIONS } from '../../../../../../MarketAgent';

export interface AgentTypeSelectProps {
  value: MARKET_AGENT_SORTED_OPTIONS;
  options: {
    label: string;
    value: MARKET_AGENT_SORTED_OPTIONS;
  }[];
  onChange: (value: MARKET_AGENT_SORTED_OPTIONS) => void;
}
