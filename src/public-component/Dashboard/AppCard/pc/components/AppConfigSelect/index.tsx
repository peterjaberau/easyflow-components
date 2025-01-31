/** @jsxImportSource @emotion/react */
import { useUpgradeModal } from '../../../../../UpgradeModal';
import { UpgradeTag } from '../../../../../UpgradeTag';
import { getCurrentTeamInfo, getPlanUtils } from '../../../../../UserData';
import { canUseUpgradeFeature } from '../../../../../UserRoleUtils';
import { isCloudVersion } from '../../../../../utils';
import { FC, ReactNode, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DownIcon, SuccessIcon, Trigger, UpIcon } from '../../../../../../design/react';
import { AppListContext } from '../../context';
import { AppConfigSelectProps } from './interface';
import { optionContentStyle, optionItemStyle, pointerStyle, publicButtonWithTagStyle, valueLabelStyle } from './style';
import React from 'react';

export const AppConfigSelect: FC<AppConfigSelectProps> = (props) => {
  const { canEditApp, appId, isPublic, isDeployed } = props;
  const { t } = useTranslation();
  const { updateAppConfig } = useContext(AppListContext);

  const teamInfo: any = useSelector(getCurrentTeamInfo);

  const upgradeModal = useUpgradeModal();

  const [popupVisible, setPopupVisible] = useState<boolean>();

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  );

  const options: { label: ReactNode; value: boolean }[] = useMemo(() => {
    return [
      {
        label: t('new_dashboard.access.private'),
        value: false,
      },
      {
        label: (
          <div css={publicButtonWithTagStyle}>
            <span>{t('new_dashboard.access.public')}</span>
            {!canUseBillingFeature && <UpgradeTag />}
          </div>
        ),
        value: true,
      },
    ];
  }, [t, canUseBillingFeature]);

  const onClickChangePublic = (isPublic: boolean) => {
    return () => {
      if (isCloudVersion && !canUseBillingFeature) {
        upgradeModal({
          modalType: 'upgrade',
          from: 'app_card_public',
        });
        return;
      }
      onVisibleChange(false);
      updateAppConfig(appId, { public: isPublic });
    };
  };

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible);
    }
  };

  if (!canEditApp || !isDeployed) {
    return (
      <div css={valueLabelStyle}>{isPublic ? t('new_dashboard.access.public') : t('new_dashboard.access.private')}</div>
    );
  }

  return (
    <Trigger
      trigger="click"
      colorScheme="white"
      position="bottom-start"
      withoutPadding
      showArrow={false}
      popupVisible={popupVisible}
      onVisibleChange={onVisibleChange}
      content={
        <div css={optionContentStyle}>
          {options.map((option, index) => {
            return (
              <div css={optionItemStyle} key={index} onClick={onClickChangePublic(option.value)}>
                {option.label}
                {option.value === isPublic && <SuccessIcon />}
              </div>
            );
          })}
        </div>
      }
    >
      <div css={[valueLabelStyle, pointerStyle]}>
        {isPublic ? t('new_dashboard.access.public') : t('new_dashboard.access.private')}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  );
};

AppConfigSelect.displayName = 'AppConfigSelect';
