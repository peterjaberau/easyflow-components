import { GraphQLBasicAuth } from '../../../../../publicTypes';
import { Control } from 'react-hook-form';

export interface BasicAuthPanelProps {
  auth?: GraphQLBasicAuth;
  control: Control;
}
