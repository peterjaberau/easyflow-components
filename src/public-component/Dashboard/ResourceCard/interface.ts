import { ResourceType } from '../../publicTypes';

export interface CardProps {
  resourceType: ResourceType;
  resourceName: string;
  dbName?: string;
  onEditResource?: (resourceID: string) => void;
  onDeleteResource?: (resourceID: string) => Promise<unknown>;
  resourceID: string;
}
