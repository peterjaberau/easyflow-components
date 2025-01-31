import { builderRequest } from '../../ILLANet';
import { Resource, ResourceContent } from '../../publicTypes';

export const requestUpdateResource = async (teamID: string, resourceID: string, data: unknown) => {
  const url = `/resources/${resourceID}`;
  return await builderRequest<Resource<ResourceContent>>(
    {
      url,
      method: 'PUT',
      data,
    },
    {
      teamID,
    },
  );
};

export const requestCreateResource = async (teamID: string, data: unknown) => {
  return await builderRequest<Resource<ResourceContent>>(
    {
      url: '/resources',
      method: 'POST',
      data,
    },
    {
      teamID,
    },
  );
};
