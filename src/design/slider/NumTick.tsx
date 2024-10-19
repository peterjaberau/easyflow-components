/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { SliderNumTick } from './interface';
import { applyNumTick } from './style';
import React from 'react';

export const NumTick: FC<SliderNumTick> = (props) => {
  const { left, disabled, value } = props;

  return (
    <div css={applyNumTick(left, disabled)} data-value={value}>
      {value}
    </div>
  );
};
