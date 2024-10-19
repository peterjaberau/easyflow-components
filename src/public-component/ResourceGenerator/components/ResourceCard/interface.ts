import { ResourceType } from '../../../publicTypes';

export interface ResourceCardSelectorProps {
  resourceType: ResourceType;
  onSelect?: (item: ResourceType) => void;
}
