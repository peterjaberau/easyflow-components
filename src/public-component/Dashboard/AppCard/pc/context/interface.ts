import { AppConfig } from '../../../../publicTypes';

export interface updateConfig extends AppConfig {
  appName?: string;
}
export interface AppListContextInject {
  updateAppConfig: (appID: string, config: Partial<updateConfig>) => Promise<unknown>;
  deleteApp: (appID: string) => Promise<unknown>;
  copyApp: (appID: string) => Promise<unknown>;
}
