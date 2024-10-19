import { createContext } from 'react';
import React from 'react';

export interface BreadcrumbContextProps {
  onClickPath?: (path: string, last: boolean) => void;
  blockRouterChange?: boolean;
}

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({});
