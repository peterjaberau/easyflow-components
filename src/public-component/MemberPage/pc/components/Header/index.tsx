/** @jsxImportSource @emotion/react */
import { InviteMemberPC } from '../../../../InviteModal';
import { ILLA_MIXPANEL_EVENT_TYPE, MixpanelTrackContext } from '../../../../MixpanelUtils';
import { MemberInfo, USER_ROLE, USER_STATUS } from '../../../../publicTypes';
import { useUpgradeModal } from '../../../../UpgradeModal';
import { getCurrentTeamInfo, getCurrentUser, teamActions } from '../../../../UserData';
import { canManageInvite, isBiggerThanTargetRole, openInviteModal, showInviteModal } from '../../../../UserRoleUtils';
import { COPY_STATUS, copyToClipboard, isCloudVersion } from '../../../../utils';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useMessage } from '../../../../../design/react';
import { IPcHeaderProps } from './interface';
import { MoreAction } from './moreAction';
import React from 'react';
import { buttonGroup, headerWrapperStyle, titleStyle } from './style';

export const Header: FC<IPcHeaderProps> = (props) => {
  const { t } = useTranslation();
  const { afterLeaveTeam } = props;
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const dispatch = useDispatch();
  const teamInfo: any = useSelector(getCurrentTeamInfo)!;
  const currentUserInfo = useSelector(getCurrentUser)!;
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER;
  const upgradeModal = useUpgradeModal();
  const message = useMessage();
  const { track } = useContext(MixpanelTrackContext);

  const showInviteButton = showInviteModal(teamInfo);

  const handleClickInviteButton = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: 'invite_entry',
      },
      'both',
    );
    if (openInviteModal(teamInfo)) {
      setInviteModalVisible(true);
    } else if (teamInfo?.totalTeamLicense?.balance < 0) {
      upgradeModal({
        modalType: 'add-license',
        from: 'member_page_invite',
      });
    } else {
      upgradeModal({
        modalType: 'upgrade',
        from: 'member_page_invite',
      });
    }
  }, [teamInfo, upgradeModal, track]);

  const handleCopy = useCallback(
    (inviteLink: string) => {
      const flag = copyToClipboard(
        t('user_management.modal.custom_copy_text', {
          inviteLink: inviteLink,
          teamName: teamInfo.name,
          userName: currentUserInfo.nickname,
        }),
      );
      if (flag === COPY_STATUS.EMPTY) {
        message.info({
          content: t('empty_copied_tips'),
        });
      } else {
        message.success({
          content: t('copied'),
        });
      }
    },
    [currentUserInfo.nickname, message, t, teamInfo.name],
  );

  useEffect(() => {
    showInviteButton &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: 'invite_entry',
        },
        'both',
      );
  }, [showInviteButton, track]);

  return (
    <>
      <div css={headerWrapperStyle}>
        <h1 css={titleStyle}>{t('user_management.page.member')}</h1>
        <div css={buttonGroup}>
          {(isCloudVersion ||
            (!isCloudVersion && isBiggerThanTargetRole(USER_ROLE.EDITOR, currentUserRole, false))) && (
            <MoreAction afterLeaveTeam={afterLeaveTeam} />
          )}
          {showInviteButton && (
            <Button w="200px" colorScheme="techPurple" onClick={handleClickInviteButton}>
              {t('user_management.page.invite')}
            </Button>
          )}
        </div>
      </div>
      {inviteModalVisible && (
        <InviteMemberPC
          itemID={teamInfo.id}
          redirectURL=""
          onClose={() => setInviteModalVisible(false)}
          canInvite={canManageInvite(
            teamInfo.myRole,
            teamInfo.permission.allowEditorManageTeamMember,
            teamInfo.permission.allowViewerManageTeamMember,
          )}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={isCloudVersion ? teamInfo?.totalTeamLicense?.balance : Infinity}
          onCopyInviteLink={handleCopy}
          onInviteLinkStateChange={(isInviteLink) => {
            dispatch(
              teamActions.updateTeamMemberPermissionReducer({
                teamID: teamInfo.id,
                newPermission: {
                  ...teamInfo.permission,
                  inviteLinkEnabled: isInviteLink,
                },
              }),
            );
          }}
          teamID={teamInfo.id}
          onBalanceChange={(balance) => {
            dispatch(
              teamActions.updateTeamMemberSubscribeReducer({
                teamID: teamInfo.id,
                subscribeInfo: {
                  ...teamInfo.currentTeamLicense,
                  balance: balance,
                },
              }),
            );
          }}
          onInvitedChange={(userList) => {
            const memberListInfo: MemberInfo[] = userList.map((user) => {
              return {
                ...user,
                userID: '',
                nickname: '',
                avatar: '',
                userStatus: USER_STATUS.PENDING,
                permission: {},
                createdAt: '',
                updatedAt: '',
              };
            });
            dispatch(teamActions.updateInvitedUserReducer(memberListInfo));
          }}
        />
      )}
    </>
  );
};
