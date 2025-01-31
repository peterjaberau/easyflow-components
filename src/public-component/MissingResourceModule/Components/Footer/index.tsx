/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../design/react';
import { MissingResourceFooterProps } from './interface';
import { missingResourceFooterContainerStyle } from './style';
import React from 'react';

export const MissingResourceFooter: FC<MissingResourceFooterProps> = ({
  handleCancelModal,
  handleConfirmModal,
  isSaving,
  canSave,
}) => {
  const { t } = useTranslation();
  return (
    <div css={missingResourceFooterContainerStyle}>
      <Button colorScheme="grayBlue" fullWidth onClick={handleCancelModal}>
        {t('editor.action.panel.button.missing_resource.cancel')}
      </Button>
      <Button colorScheme="black" fullWidth onClick={handleConfirmModal} loading={isSaving} disabled={!canSave}>
        {t('editor.action.panel.button.missing_resource.save')}
      </Button>
    </div>
  );
};
