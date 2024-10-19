import { CurrentUserInfo, Team } from '../publicTypes';

export type RootState = {
  currentUser: CurrentUserInfo;
  team: Team;
};
