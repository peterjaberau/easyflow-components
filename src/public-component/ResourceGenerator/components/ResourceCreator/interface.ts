import { ResourceType } from '../../../publicTypes';
import { ResourceCreatorPage } from '../../interface';

export interface ResourceCreatorProps {
  resourceID?: string;
  resourceType?: ResourceType;
  onBack: (page: ResourceCreatorPage) => void;
}
