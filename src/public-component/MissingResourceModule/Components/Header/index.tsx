/** @jsxImportSource @emotion/react */
import IconHotSpot from '../../../IconHotSpot';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../../../../design/react';
import { headerContainerStyle, headerStyle } from './style';
import React from 'react';

export const MissingResourceHeader: FC<{ handleCloseModal: () => void }> = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  return (
    <div css={headerContainerStyle}>
      <h3 css={headerStyle}>{t('editor.action.panel.titlemissing_resource.missing_resources')}</h3>
      <IconHotSpot onClick={handleCloseModal}>
        <CloseIcon />
      </IconHotSpot>
    </div>
  );
};
