import { SVGAttributes } from 'react';
import React from 'react';
import { BoxProps } from '../theme';
import { SerializedStyles } from '@emotion/react';

export interface IconProps extends SVGAttributes<SVGElement>, BoxProps {
  size?: string;
  spin?: boolean;
  containerStyle?: SerializedStyles;
}
