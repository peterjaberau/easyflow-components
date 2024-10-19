import { AppConfig } from '../../../../../publicTypes';

export interface AppCardActionItemProps {
  appID: string;
  appDeployed: boolean;
  appName: string;
  appConfig: AppConfig;
}
