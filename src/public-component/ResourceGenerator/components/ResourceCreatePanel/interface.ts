import { ResourceType } from '../../../publicTypes';

export interface ResourceCreatePanelProps {
  resourceType: ResourceType;
  resourceID?: string;
  handleOnClickBack: () => void;
}
