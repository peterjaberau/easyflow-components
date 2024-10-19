/** @jsxImportSource @emotion/react */
import { createContext } from 'react';
import React from 'react';
import { CollapseContextProps } from './interface';

export const CollapseContext = createContext<CollapseContextProps>({} as CollapseContextProps);

CollapseContext.displayName = 'CollapseContext';
