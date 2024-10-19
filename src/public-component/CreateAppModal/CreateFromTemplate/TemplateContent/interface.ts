import { APP_TYPE } from '../../../publicTypes';

export interface ICreateBlankAppProps {
  isInModal: boolean;
  handleCreateBlankApp: (appType: APP_TYPE) => Promise<void>;
  closeModal: () => void;
  handleOpenCreateFromResource: () => void;
}
