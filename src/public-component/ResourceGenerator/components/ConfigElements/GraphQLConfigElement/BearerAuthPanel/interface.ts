import { GraphQLBearerAuth } from '../../../../../publicTypes';
import { Control } from 'react-hook-form';

export interface BearerAuthPanelProps {
  auth?: GraphQLBearerAuth;
  control: Control;
}
