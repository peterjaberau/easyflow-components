import { ImgHTMLAttributes, ReactNode } from 'react';
import { BoxProps } from '../theme';

export interface ImageProps extends ImgHTMLAttributes<HTMLDivElement>, BoxProps {
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  fallback?: ReactNode;
  fallbackSrc?: string;
  radius?: string;
}
