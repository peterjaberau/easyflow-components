/** @jsxImportSource @emotion/react */
import { forwardRef, useContext } from 'react';
import React from 'react';
import { BreadcrumbItemProps } from './interface';
import { applyItemStyle, itemFinalStyle } from './style';
import { applyBoxStyle, deleteCssProps } from '../theme';
import { Dropdown } from '../dropdown';
import { DownIcon } from '../icon';
import { BreadcrumbContext } from './breadcrumb-context';

export const BreadcrumbItem = forwardRef<HTMLDivElement, BreadcrumbItemProps>((props, ref) => {
  const { dropList, dropdownProps, children, last, href, onClick, blockRouterChange, ...restProps } = props;

  const breadcrumbContext = useContext(BreadcrumbContext);
  const finalBlockRouterChange = blockRouterChange ?? breadcrumbContext?.blockRouterChange ?? false;

  return (
    <Dropdown position="bottom-start" dropList={dropList} {...dropdownProps}>
      <a
        css={[
          last ? itemFinalStyle : applyItemStyle(href !== undefined || onClick !== undefined),
          applyBoxStyle(props),
        ]}
        href={finalBlockRouterChange ? undefined : href}
        onClick={(event) => {
          onClick?.(event);
          breadcrumbContext?.onClickPath?.(href ?? '', last ?? false);
        }}
        {...deleteCssProps(restProps)}
      >
        {children}
        {dropList && <DownIcon ml="2px" />}
      </a>
    </Dropdown>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
