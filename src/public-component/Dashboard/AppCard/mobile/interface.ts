import { APP_TYPE, EditorInfo } from '../../../publicTypes';
import { ActivityInfo } from '../../../publicTypes';

export interface MobileCardItemProps {
  appName: string;
  appID: string;
  appDeployed: boolean;
  publishedToMarketplace: boolean;
  appActivity: ActivityInfo;
  description?: string;
  editorInfo?: EditorInfo[];
  showLaunchButton?: boolean;
  appType?: APP_TYPE;
  cardType: 'app' | 'flow';
}
