/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { css } from '@emotion/react';
import React from 'react';
import { LoadingProps } from './interface';
import { applyLoadingStyle } from './style';
import { applyBoxStyle, deleteCssProps } from '../theme';
import { LoadingIcon } from '../icon';

export const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { colorScheme = 'gray', size = 'medium', ...restProps } = props;
  return (
    <LoadingIcon
      spin={true}
      css={css(applyLoadingStyle(colorScheme, size), applyBoxStyle(props))}
      {...deleteCssProps(restProps)}
    />
  );
});

Loading.displayName = 'Loading';
