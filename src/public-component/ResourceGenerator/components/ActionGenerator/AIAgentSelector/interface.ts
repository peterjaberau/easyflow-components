import { ActionType, Agent } from '../../../../publicTypes';
import { ActionCreatorPage } from '../interface';

export type HandleCreateAgentActionFunc = (
  item: Agent,
  successCallback?: () => void,
  loadingCallback?: (loading: boolean) => void,
) => void;
export interface ActionResourceSelectorProps {
  actionType: ActionType;
  canBack?: boolean;
  onBack: (page: ActionCreatorPage) => void;
  handleCreateAction: HandleCreateAgentActionFunc;
  onCreateAction: () => void;
}
