import { ResourceType } from '../../../publicTypes';

export interface ResourceTypeSelectorProps {
  onSelect: (item: ResourceType) => void;
  filterResourceType?: (item: ResourceType) => boolean;
}
