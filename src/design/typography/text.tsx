/** @jsxImportSource @emotion/react */
import { Children, forwardRef } from 'react';
import { TextProps } from './interface';
import { Base } from './base';
import { Trigger } from '../trigger';
import { mergedToString } from '../system';
import { applyBoxStyle, deleteCssProps } from '../theme';
import { textStyle } from './text-style';
import React from 'react';

export const Text = forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  // get props
  const {
    colorScheme = 'blackAlpha',
    ellipsis,
    bold,
    disabled,
    mark,
    underline,
    deleted,
    code,
    copyable,
    fs = '14px',
    ...otherProps
  } = props;

  const showTooltip = !disabled && (ellipsis == true || (typeof ellipsis == 'object' && ellipsis.tooltip));
  const base = (
    <Base
      colorScheme={colorScheme}
      ellipsis={ellipsis}
      bold={bold}
      disabled={disabled}
      mark={mark}
      underline={underline}
      deleted={deleted}
      copyable={copyable}
    >
      {props.children}
    </Base>
  );

  const text = code ? (
    <code css={[textStyle, applyBoxStyle(props)]} ref={ref} {...deleteCssProps(otherProps)}>
      {base}
    </code>
  ) : (
    <div css={[textStyle, applyBoxStyle(props)]} ref={ref} {...deleteCssProps(otherProps)}>
      {base}
    </div>
  );

  if (showTooltip) {
    return <Trigger content={mergedToString(Children.toArray(props.children))}>{text}</Trigger>;
  } else {
    return text;
  }
});

Text.displayName = 'Text';
