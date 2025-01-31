import { builderRequest } from '../../ILLANet';
import { AccessType } from '../../publicTypes';

export const getOAuthAccessToken = async (
  teamID: string,
  resourceID: string,
  redirectURL: string,
  accessType: AccessType,
) => {
  return builderRequest<{
    accessToken: string;
  }>(
    {
      method: 'POST',
      url: `/resources/${resourceID}/token`,
      data: {
        accessType,
        redirectURL,
      },
    },
    {
      teamID,
    },
  );
};

export const redirectToGoogleOAuth = async (teamID: string, resourceID: string, accessToken: string) => {
  return builderRequest<{ url: string }>(
    {
      method: 'GET',
      url: `/resources/${resourceID}/oauth2?accessToken=${accessToken}`,
    },
    {
      teamID,
    },
  );
};
