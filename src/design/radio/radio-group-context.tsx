/** @jsxImportSource @emotion/react */
import { ChangeEvent, createContext } from 'react';
import { RadioGroupContextProps } from './interface';
import React from 'react';

interface extraProps {
  onChangeValue?: (value: any, event: ChangeEvent) => void;
}

export const RadioGroupContext = createContext<(RadioGroupContextProps<any> & extraProps) | undefined>(undefined);

RadioGroupContext.displayName = 'RadioGroupContext';
