import { createContext } from 'react';
import React from 'react';

type PickerContext = {
  utcOffset?: number;
  timezone?: string;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export const PickerContext = createContext<PickerContext>({});
