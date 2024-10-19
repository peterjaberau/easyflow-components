/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { TriggerContext } from './interface';
import { TriggerProviderContext } from './trigger-context';
import React from 'react';

export const TriggerProvider: FC<TriggerContext> = (props) => {
  const { renderInBody, zIndex } = props;

  return (
    <TriggerProviderContext.Provider value={{ renderInBody, zIndex }}>{props.children}</TriggerProviderContext.Provider>
  );
};

TriggerProvider.displayName = 'TriggerProvider';
