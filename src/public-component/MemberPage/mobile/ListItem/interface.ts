import { USER_ROLE, USER_STATUS } from '../../../publicTypes';

export interface ListItemProps {
  nickName: string;
  userID: string;
  teamMemberID: string;
  email: string;
  status: USER_STATUS;
  userRole: USER_ROLE;
  avatarURL?: string;
  currentUserID: string;
  currentUserRole: USER_ROLE;
  currentTeamID: string;
}
