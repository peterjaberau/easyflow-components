import { RestApiAuth } from '../../../../publicTypes';
import { Control } from 'react-hook-form';

export interface RestApiAuthPanelProps {
  auth?: RestApiAuth;
  control: Control;
}
