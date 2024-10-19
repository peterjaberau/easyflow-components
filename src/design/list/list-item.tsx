/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { css } from '@emotion/react';
import { ListItemProps } from './interface';
import React from 'react';
import {
  applyListItemActionsStyle,
  applyListItemContainer,
  applyListItemExtraStyle,
  applyListItemInner,
} from './style';
import { applyBoxStyle, deleteCssProps } from '../theme';

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const { actions, extra, size = 'medium', ...otherProps } = props;
  return (
    <div css={css(applyListItemContainer(size), applyBoxStyle(props))} ref={ref} {...deleteCssProps(otherProps)}>
      <div css={applyListItemInner}>
        {props.children}
        {actions && <div css={applyListItemActionsStyle}>{actions}</div>}
      </div>
      {extra && <div css={applyListItemExtraStyle}>{extra}</div>}
    </div>
  );
});

ListItem.displayName = 'ListItem';
