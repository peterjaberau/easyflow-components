/** @jsxImportSource @emotion/react */
import usePrevious from './usePrevious';
import { CountProps } from './interface';
import { deleteCssProps, globalColor, illaPrefix } from '../theme';
import { applyBadgeNumberOrText, applyBadgeScale } from './style';
import { Key } from 'react';
import React from 'react';

const defaultColor = globalColor(`--${illaPrefix}-red-03`);
export function Count(props: CountProps) {
  const { count, color = defaultColor, hasChildren, ...restProps } = props;
  const oldCount = usePrevious(count);
  const isChanged = count !== oldCount;

  return (
    <span
      css={applyBadgeNumberOrText(color, hasChildren ?? false, (count as string).length)}
      {...deleteCssProps(restProps)}
    >
      <span key={count as Key} css={applyBadgeScale(isChanged)}>
        {count}
      </span>
    </span>
  );
}
