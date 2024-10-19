import { SUBSCRIPTION_CYCLE } from '../../../publicTypes';
import { COLLAR_TYPE } from '../../interface';

export interface CollarDrawerProps {
  from: string;
  subCycle?: SUBSCRIPTION_CYCLE;
  visible?: boolean;
  onCancel?: () => void;
  afterClose?: () => void;
  onSuccessCallback?: (teamID: string, operationType: COLLAR_TYPE) => void;
}
