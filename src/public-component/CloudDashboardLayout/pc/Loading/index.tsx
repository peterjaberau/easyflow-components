/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { leftContainerStyle, pcLayoutContainerStyle } from '../style';
import { rightAnimationStyle } from './style';
import React from 'react';

export const PCDashboardLoading: FC = () => {
  return (
    <div css={pcLayoutContainerStyle}>
      <aside css={leftContainerStyle}></aside>
      <aside css={rightAnimationStyle}></aside>
    </div>
  );
};
