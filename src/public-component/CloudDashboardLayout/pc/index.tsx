/** @jsxImportSource @emotion/react */
import { Avatar } from '../../Avatar';
import { getCurrentUser } from '../../UserData';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { DashBoardLayoutProps } from '../interface';
import React from 'react';
import {
  avatarAndInfoContainerStyle,
  avatarContainerStyle,
  dynamicMenuContainerStyle,
  emailStyle,
  leftBottomContainerStyle,
  leftContainerStyle,
  leftTopContainerStyle,
  nickNameStyle,
  pcLayoutContainerStyle,
  rightContainerStyle,
  tipsContainerStyle,
} from './style';

export const PCCloudDashBoardLayout: FC<DashBoardLayoutProps> = (props) => {
  const { children, dynamicMenu, tipsComponent, bottomComponent } = props;
  const userInfo = useSelector(getCurrentUser);

  return (
    <div css={pcLayoutContainerStyle}>
      <aside css={leftContainerStyle}>
        <div css={leftTopContainerStyle}>
          <div css={avatarAndInfoContainerStyle}>
            <div css={avatarContainerStyle}>
              <Avatar size={64} id={userInfo.userID} name={userInfo.nickname} avatarUrl={userInfo.avatar} />
            </div>
            <span css={nickNameStyle}>{userInfo.nickname}</span>
            <span css={emailStyle}>{userInfo.email}</span>
          </div>
          {dynamicMenu && <div css={dynamicMenuContainerStyle}>{dynamicMenu}</div>}
        </div>
        <div css={leftBottomContainerStyle}>
          {tipsComponent && <div css={tipsContainerStyle}>{tipsComponent}</div>}
          {!!bottomComponent && bottomComponent}
        </div>
      </aside>
      <aside css={rightContainerStyle}>{children}</aside>
    </div>
  );
};
