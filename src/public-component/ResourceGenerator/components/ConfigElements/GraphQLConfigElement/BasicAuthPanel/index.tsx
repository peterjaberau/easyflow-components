/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { validateNotEmpty } from '../../../../utils';
import { ControlledElement } from '../../../ControlledElement';
import { BasicAuthPanelProps } from './interface';
import React from 'react';

export const BasicAuthPanel: FC<BasicAuthPanelProps> = (props) => {
  const { control, auth } = props;
  const { t } = useTranslation();

  return (
    <>
      <ControlledElement
        title={t('editor.action.resource.restapi.label.basic_auth_username')}
        defaultValue={auth?.username ?? ''}
        name="username"
        controlledType="input"
        control={control}
        isRequired
        rules={[
          {
            validate: validateNotEmpty,
          },
        ]}
      />
      <ControlledElement
        title={t('editor.action.resource.restapi.label.basic_auth_password')}
        defaultValue={auth?.password ?? ''}
        name="password"
        controlledType="password"
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
      />
    </>
  );
};

BasicAuthPanel.displayName = 'BasicAuthPanel';
