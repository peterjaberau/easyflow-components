/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { PenIcon } from '../../../../../design/react';
import { showLabelStyle } from './style';
import React from 'react';

interface ShowLabelProps {
  value: string;
}
const ShowLabel: FC<ShowLabelProps> = ({ value }) => {
  return (
    <div css={showLabelStyle}>
      <span>{value}</span>
      <PenIcon size="16px" />
    </div>
  );
};

export default ShowLabel;
