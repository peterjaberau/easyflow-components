/** @jsxImportSource @emotion/react */
import { getCurrentMemberList, getCurrentTeamInfo, getCurrentUserId } from '../../../UserData';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { MobileMemberListItem } from '../ListItem';
import { listContainerStyle } from './style';
import React from 'react';

export const MobileMemberList: FC = () => {
  const userListData = useSelector(getCurrentMemberList);
  const currentTeamInfo: any = useSelector(getCurrentTeamInfo)!;
  const currentUserID = useSelector(getCurrentUserId) as string;
  return (
    <div css={listContainerStyle}>
      {userListData?.map((item) => {
        return (
          <MobileMemberListItem
            key={item.userID}
            nickName={item.nickname}
            userID={item.userID}
            teamMemberID={item.teamMemberID}
            email={item.email}
            status={item.userStatus}
            userRole={item.userRole}
            avatarURL={item.avatar}
            currentUserID={currentUserID}
            currentUserRole={currentTeamInfo.myRole}
            currentTeamID={currentTeamInfo.id}
          />
        );
      })}
    </div>
  );
};
