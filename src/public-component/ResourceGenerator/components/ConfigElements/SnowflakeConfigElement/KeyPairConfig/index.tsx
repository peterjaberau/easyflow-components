/** @jsxImportSource @emotion/react */
import { SnowflakeKeyAuthenticationType } from '../../../../../publicTypes';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { validateNotEmpty } from '../../../../utils';
import { ControlledElement } from '../../../ControlledElement';
import React from 'react';

export const KeyPairConfig: FC<
  SnowflakeKeyAuthenticationType & {
    control: Control;
  }
> = (props) => {
  const { username, privateKey, control } = props;
  const { t } = useTranslation();

  return (
    <>
      <ControlledElement
        controlledType="input"
        control={control}
        isRequired
        rules={[
          {
            validate: validateNotEmpty,
          },
        ]}
        title={t('editor.action.resource.db.label.username')}
        name="username"
        defaultValue={username}
        placeholders={[t('editor.action.resource.db.placeholder.snowflake_username')]}
      />
      <ControlledElement
        controlledType="textarea"
        control={control}
        isRequired
        rules={[
          {
            validate: validateNotEmpty,
          },
        ]}
        title={t('editor.action.resource.db.label.private_key')}
        name="privateKey"
        defaultValue={privateKey}
        placeholders={[t('editor.action.resource.db.placeholder.snowflake_private_key')]}
      />
    </>
  );
};

KeyPairConfig.displayName = 'KeyPairConfig';
