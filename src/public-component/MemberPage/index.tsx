/** @jsxImportSource @emotion/react */
import { LayoutAutoChange } from '../LayoutAutoChange';
import { FC } from 'react';
import { IMemberListPageProps } from './interface';
import MobileMemberPage from './mobile';
import PCMemberPage from './pc';
import React from 'react';

export const MemberListPage: FC<IMemberListPageProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<PCMemberPage afterLeaveTeam={props.afterLeaveTeam} />}
      mobilePage={<MobileMemberPage />}
    />
  );
};

MemberListPage.displayName = 'MemberList';

export default MemberListPage;
export { PCMemberList } from './pc/components/List';
