import { ResourceType } from '../../../publicTypes';

export interface BaseConfigElementProps {
  resourceID?: string;
}

export interface ConfigElementProps extends BaseConfigElementProps {
  resourceType?: ResourceType;
}
