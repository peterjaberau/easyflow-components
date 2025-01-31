/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyIcon from './emptyIcon.svg?react';
import { emptyContainerStyle, emptyTipsStyle } from './style';
import React from 'react';

export const ListEmptyState: FC = () => {
  const { t } = useTranslation();
  return (
    <div css={emptyContainerStyle}>
      <EmptyIcon />
      <span css={emptyTipsStyle}>{t('dashboard.no-result')}</span>
    </div>
  );
};
