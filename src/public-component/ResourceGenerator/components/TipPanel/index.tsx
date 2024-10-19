/** @jsxImportSource @emotion/react */
import { getDocLink } from '../../../publicConfig';
import { isCloudVersion } from '../../../utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DocsIcon } from '../../../../design/react';
import { WhiteList } from '../ColumnWhiteList';
import { TipPanelProps } from './interface';
import { linkContainerStyle, tipsPanelContainerStyle } from './style';
import React from 'react';

export const TipPanel: FC<TipPanelProps> = (props) => {
  const { resourceType } = props;

  const docLink = getDocLink('action', resourceType);
  const { t } = useTranslation();
  return (
    <div css={tipsPanelContainerStyle}>
      {docLink && (
        <a href={docLink} css={linkContainerStyle} target="_blank" rel="noreferrer">
          <Button leftIcon={<DocsIcon />} colorScheme="grayBlue" w="100%" type="button">
            {t('editor.inspect.header.action_menu.view_documentation')}
          </Button>
        </a>
      )}
      {isCloudVersion && <WhiteList />}
    </div>
  );
};
