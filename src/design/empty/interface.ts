import { ReactNode, HTMLAttributes } from 'react';
import React from 'react';
import { BoxProps } from '../theme';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement>, BoxProps {
  description?: ReactNode;
  divideSize?: string;
  paddingVertical?: string;
  icon?: ReactNode;
  imgSrc?: string;
}
