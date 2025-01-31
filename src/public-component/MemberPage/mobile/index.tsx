/** @jsxImportSource @emotion/react */
import { InviteMemberMobile } from '../../InviteModal';
import { ILLA_MIXPANEL_EVENT_TYPE, MixpanelTrackContext } from '../../MixpanelUtils';
import { MemberInfo, SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE, USER_ROLE, USER_STATUS } from '../../publicTypes';
import { useUpgradeDrawer, useUpgradeModal } from '../../UpgradeModal';
import { UsageCard } from '../../UsageCard';
import { getCurrentTeamInfo, getCurrentUser, getPlanUtils, teamActions } from '../../UserData';
import { canManageInvite, canManagePayment, showInviteModal } from '../../UserRoleUtils';
import { COPY_STATUS, copyToClipboard, isCloudVersion } from '../../utils';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useMessage } from '../../../design/react';
import { fetchCurrentUserTeamsInfo } from '../services';
import React from 'react';
import { MobileMemberList } from './List';
import { inviteBtnStyle, mobileMemberContainerStyle, mobileTitleStyle, usageCardContainerStyle } from './style';

export const MobileMemberPage: FC = () => {
  const { t } = useTranslation();
  const currentTeamInfo: any = useSelector(getCurrentTeamInfo)!;
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const dispatch = useDispatch();
  const teamInfo: any = useSelector(getCurrentTeamInfo)!;
  const currentUserInfo = useSelector(getCurrentUser)!;
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER;
  const upgradeModal = useUpgradeModal();
  const upgradeDrawer = useUpgradeDrawer();
  const message = useMessage();
  const { track } = useContext(MixpanelTrackContext);
  const showInviteButton = showInviteModal(teamInfo);

  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  );

  const handleClickInviteButton = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: 'invite_entry',
      },
      'both',
    );
    if (!isCloudVersion || teamInfo?.totalTeamLicense?.teamLicenseAllPaid) {
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
  }, [teamInfo?.totalTeamLicense?.balance, teamInfo?.totalTeamLicense?.teamLicenseAllPaid, upgradeModal, track]);
  const currentTeamLicense = currentTeamInfo.currentTeamLicense;
  const openDrawer = () => {
    upgradeDrawer('member_page_manage_seats', {
      defaultConfig: {
        subscribeInfo: {
          quantity: currentTeamLicense.cancelAtPeriodEnd ? 1 : currentTeamLicense.volume,
          cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
          plan: currentTeamLicense.plan ?? SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
          cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
        },
        onSubscribeCallback: () => {
          setTimeout(async () => {
            const response = await fetchCurrentUserTeamsInfo();
            dispatch(teamActions.updateTeamItemsReducer(response.data));
          }, 500);
        },
      },
    });
  };

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
    <div css={mobileMemberContainerStyle}>
      <h1 css={mobileTitleStyle}>{t('user_management.page.member')}</h1>
      {isCloudVersion && hasPaymentManagementPermission ? (
        <div css={usageCardContainerStyle}>
          <UsageCard
            type="License"
            current={currentTeamInfo.totalTeamLicense.volume - currentTeamInfo.totalTeamLicense.balance}
            total={currentTeamInfo.totalTeamLicense.volume}
            buttonColorScheme="grayBlue"
            buttonVariant="outline"
            actionDes={
              currentTeamInfo.currentTeamLicense?.cycle === SUBSCRIPTION_CYCLE.YEARLY
                ? t(`billing.license_price_new.yearly`, { price: '$200' })
                : t(`billing.license_price_new.monthly`, { price: '$20' })
            }
            isMobile
            onClick={openDrawer}
          />
        </div>
      ) : null}
      <MobileMemberList />
      {showInviteModal(teamInfo) && (
        <Button css={inviteBtnStyle} fullWidth colorScheme="techPurple" onClick={handleClickInviteButton}>
          {t('homepage.workspace.invite')}
        </Button>
      )}
      {inviteModalVisible && (
        <InviteMemberMobile
          itemID={teamInfo.id}
          redirectURL=""
          onClose={() => setInviteModalVisible(false)}
          canInvite={canManageInvite(
            currentTeamInfo.myRole,
            currentTeamInfo.permission.allowEditorManageTeamMember,
            currentTeamInfo.permission.allowViewerManageTeamMember,
          )}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={isCloudVersion ? teamInfo.totalTeamLicense.balance : Infinity}
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
    </div>
  );
};

MobileMemberPage.displayName = 'MemberListMobile';

export default MobileMemberPage;
