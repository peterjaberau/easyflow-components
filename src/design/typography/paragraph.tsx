/** @jsxImportSource @emotion/react */
import { Children, forwardRef } from 'react';
import { ParagraphProps } from './interface';
import { Base } from './base';
import { applyParagraphContainer } from './paragraph-style';
import { Trigger } from '../trigger';
import { mergedToString } from '../system';
import { applyBoxStyle, deleteCssProps } from '../theme';
import React from 'react';

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  // get props
  const {
    colorScheme = 'blackAlpha',
    ellipsis,
    bold,
    disabled,
    mark,
    underline,
    deleted,
    copyable,
    fs = '14px',
    indent,
    ...otherProps
  } = props;

  const showTooltip = !disabled && (ellipsis == true || (typeof ellipsis == 'object' && ellipsis.tooltip));

  const p = (
    <div
      css={[applyParagraphContainer(indent ?? false), applyBoxStyle(props)]}
      ref={ref}
      {...deleteCssProps(otherProps)}
    >
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
    </div>
  );

  if (showTooltip) {
    return <Trigger content={mergedToString(Children.toArray(props.children))}>{p}</Trigger>;
  } else {
    return p;
  }
});

Paragraph.displayName = 'Paragraph';
