import { TriggerProps } from '../trigger';

export interface PopoverProps extends Omit<TriggerProps, 'withoutPadding'> {
  title?: string;
  hasCloseIcon?: boolean;
}
