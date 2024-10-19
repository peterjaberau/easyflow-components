import { GoogleSheetAuthStatus, GoogleSheetResource } from '../../../publicTypes';

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: 'serviceAccount',
  opts: {
    privateKey: '',
    status: GoogleSheetAuthStatus.Initial,
  },
};
