/** @jsxImportSource @emotion/react */
import { forwardRef, useContext } from 'react';
import React from 'react';
import { Image } from '../image';
import { EmptyIcon } from '../icon';
import { ConfigProviderContext, ConfigProviderProps, def } from '../config-provider';
import { applyDescriptionStyle, applyEmptyContainerStyle } from './style';
import { EmptyProps } from './interface';
import { applyBoxStyle, deleteCssProps, globalColor, illaPrefix } from '../theme';

export const Empty = forwardRef<HTMLDivElement, EmptyProps>((props, ref) => {
  const configProviderProps = useContext<ConfigProviderProps>(ConfigProviderContext);
  const locale = configProviderProps?.locale?.empty ?? def.empty;

  const {
    icon = <EmptyIcon size="48px" color={globalColor(`--${illaPrefix}-grayBlue-04`)} />,
    imgSrc,
    divideSize = '16px',
    paddingVertical = '23px',
    description = locale['noData'],
    ...rest
  } = props;

  return (
    <div ref={ref} css={[applyEmptyContainerStyle(paddingVertical), applyBoxStyle(props)]} {...deleteCssProps(rest)}>
      <div>{imgSrc ? <Image src={imgSrc} objectFit="contain" width="48px" height="48px" /> : icon}</div>
      <div css={applyDescriptionStyle(divideSize)}>{description}</div>
    </div>
  );
});

Empty.displayName = 'Empty';
