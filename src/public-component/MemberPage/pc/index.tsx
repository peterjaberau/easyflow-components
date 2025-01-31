/** @jsxImportSource @emotion/react */
import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from '../../publicTypes';
import { useUpgradeDrawer } from '../../UpgradeModal';
import { UsageCard } from '../../UsageCard';
import { getCurrentTeamInfo, getPlanUtils, teamActions } from '../../UserData';
import { canManagePayment } from '../../UserRoleUtils';
import { isCloudVersion } from '../../utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserTeamsInfo } from '../services';
import { Header } from './components/Header';
import { PCMemberList } from './components/List';
import { IPcMemberListProps } from './components/interface';
import { cardAndMemberListContainerStyle, memberListWrapperStyle } from './style';
import React from 'react';

export const PCMemberPage: FC<IPcMemberListProps> = (props) => {
  const { afterLeaveTeam } = props;
  const currentTeamInfo: any = useSelector(getCurrentTeamInfo)!;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo.myRole,
    getPlanUtils(currentTeamInfo),
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  );
  const currentTeamLicense = currentTeamInfo.currentTeamLicense;
  const upgradeDrawer = useUpgradeDrawer();
  const openDrawer = () => {
    upgradeDrawer('member_page_manage_seats', {
      defaultConfig: {
        subscribeInfo: {
          quantity: currentTeamLicense.cancelAtPeriodEnd ? 1 : currentTeamLicense.volume,
          cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
          plan: currentTeamLicense?.plan ?? SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
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

  return (
    <div css={memberListWrapperStyle}>
      <Header afterLeaveTeam={afterLeaveTeam} />
      <div css={cardAndMemberListContainerStyle}>
        {isCloudVersion && hasPaymentManagementPermission && (
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
            onClick={openDrawer}
          />
        )}
        <PCMemberList />
      </div>
    </div>
  );
};

PCMemberPage.displayName = 'MemberListPC';

export default PCMemberPage;
