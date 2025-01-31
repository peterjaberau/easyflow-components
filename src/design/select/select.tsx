/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { SelectProps } from './interface';
import { SingleSelect } from './single-select';
import { MultipleSelect } from './multiple-select';
import React from 'react';

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  if (props.multiple) {
    return <MultipleSelect ref={ref} {...props} />;
  } else {
    return <SingleSelect ref={ref} {...props} />;
  }
});

Select.displayName = 'Select';
