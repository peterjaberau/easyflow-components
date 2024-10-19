import { ResourceType } from '../../../publicTypes';

export interface ResourceHeaderProps {
  resourceType: ResourceType;
  onClickBack: () => void;
}
