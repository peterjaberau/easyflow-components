import { USER_ROLE } from '../../../publicTypes';

export interface InviteByEmailProps {
  defaultInviteUserRole: USER_ROLE;
  defaultBalance: number;
  teamID: string;
  currentUserRole: USER_ROLE;
  onBalanceChange: (balance: number) => void;
  onInvitedChange: (invitedUsers: InvitedUser[]) => void;
  redirectURL: string;
  excludeUserRole: USER_ROLE[];
  itemID: string;
}

export interface InvitedUser {
  email: string;
  teamMemberID: string;
  userRole: USER_ROLE;
}
