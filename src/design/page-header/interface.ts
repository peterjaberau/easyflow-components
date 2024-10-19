import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { BreadcrumbProps } from '../breadcrumb';
import { BoxProps } from '../theme';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BoxProps {
  title?: ReactNode;
  subTitle?: ReactNode;
  breadcrumb?: BreadcrumbProps;
  backIcon?: ReactNode | boolean;
  extra?: ReactNode;
  onBack?: (e: MouseEvent) => void;
}
