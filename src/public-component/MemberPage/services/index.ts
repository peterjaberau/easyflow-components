import { authCloudRequest } from '../../ILLANet';
import { TeamInfo } from '../../publicTypes';

export const fetchCurrentUserTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: '/teams/my',
    method: 'GET',
  });
};
