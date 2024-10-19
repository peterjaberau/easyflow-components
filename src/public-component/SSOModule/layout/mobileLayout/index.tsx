/** @jsxImportSource @emotion/react */
import { ILLA_MIXPANEL_EVENT_TYPE, MixpanelTrackContext } from '../../../MixpanelUtils';
import { DOC_PREFIX } from '../../../publicConfig';
import { TextLink } from '../../../TextLink';
import { isCloudVersion } from '../../../utils';
import { FC, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { LayoutProps } from '../interface';
import { contentStyle, layoutStyle, policyStyle } from './style';
import React from 'react';

export const MobileUserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const { track } = useContext(MixpanelTrackContext);

  const handleLinkOpenClick = (link: string) => {
    if (isCloudVersion) {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: /privacy/.test(link) ? 'privacy' : 'terms',
      });
      window.open(DOC_PREFIX + link, '_blank');
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <div css={layoutStyle}>
      <div css={contentStyle}>{children}</div>
      <div css={policyStyle}>
        <Trans
          i18nKey="page.user.policy"
          t={t}
          components={[
            <TextLink
              key="TextLink"
              onClick={() => {
                handleLinkOpenClick('/privacy-policy');
              }}
            />,
            <TextLink
              key="TextLink"
              onClick={() => {
                handleLinkOpenClick('/terms-of-service');
              }}
            />,
          ]}
        />
      </div>
    </div>
  );
};

MobileUserLayout.displayName = 'MobileUserLayout';
