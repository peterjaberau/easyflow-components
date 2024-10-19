import { ResourceType } from '../../../../publicTypes';
import { ReactNode } from 'react';

export interface ConfigElementProviderProps {
  children: ReactNode;
  resourceID?: string;
  resourceType: ResourceType;
}
