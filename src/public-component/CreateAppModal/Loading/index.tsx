/** @jsxImportSource @emotion/react */
import { Loading } from '../../../design/react';
import { loadingStyle } from './style';
import React from 'react';

export const CreateLoading = () => (
  <div css={loadingStyle}>
    <Loading colorScheme="techPurple" />
  </div>
);
