/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { PasswordProps } from './interface';
import { Input } from './input';
import { useMergeValue } from '../system';
import { EyeOffIcon, EyeOnIcon } from '../icon';
import { getColor } from '../theme';
import React from 'react';

export const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const { visibilityToggle = true, visibility, defaultVisibility, onVisibilityChange, ...otherProps } = props;

  const [finalVisibility, setFinalVisibility] = useMergeValue(false, {
    defaultValue: defaultVisibility,
    value: visibility,
  });

  return (
    <Input
      type={finalVisibility ? 'text' : 'password'}
      ref={ref}
      suffix={
        visibilityToggle ? (
          finalVisibility ? (
            <EyeOnIcon
              c={getColor('grayBlue', '05')}
              onClick={() => {
                if (visibility === undefined) {
                  setFinalVisibility(false);
                }
                onVisibilityChange?.(false);
              }}
            />
          ) : (
            <EyeOffIcon
              c={getColor('grayBlue', '05')}
              onClick={() => {
                if (visibility === undefined) {
                  setFinalVisibility(true);
                }
                onVisibilityChange?.(true);
              }}
            />
          )
        ) : undefined
      }
      {...otherProps}
    />
  );
});

Password.displayName = 'Password';
