/** @jsxImportSource @emotion/react */
import { forwardRef, useContext } from 'react';
import { TrProps } from './interface';
import { applyBoxStyle, deleteCssProps } from '../theme';
import { TableContext } from './table-context';
import { applyBgHoverStyle, applyNormalStyle, applySelectedStyle } from './style';
import React from 'react';

export const Tr = forwardRef<HTMLTableRowElement, TrProps>((props, ref) => {
  const { hoverable, selected, ...otherProps } = props;
  const context = useContext(TableContext);

  return (
    <tr
      css={[
        applyNormalStyle(),
        applyBgHoverStyle(hoverable ?? context?.hoverable),
        applySelectedStyle(selected),
        applyBoxStyle(props),
      ]}
      ref={ref}
      {...deleteCssProps(otherProps)}
    />
  );
});

Tr.displayName = 'Tr';
