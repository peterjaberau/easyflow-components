/** @jsxImportSource @emotion/react */
import { RedisResourceInitial } from '../../../../publicConfig';
import { RedisResource, Resource } from '../../../../publicTypes';
import { TextLink } from '../../../../TextLink';
import { isCloudVersion } from '../../../../utils';
import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, Button, Divider, Input, getColor } from '../../../../../design/react';
import { ResourceGeneratorContext } from '../../../provider';
import React from 'react';
import { isContainLocalPath, validateNotEmpty } from '../../../utils';
import { ControlledElement } from '../../ControlledElement';
import { ControlledType } from '../../ControlledElement/interface';
import { hostInputContainer } from '../../ControlledElement/style';
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  labelContainer,
  optionLabelStyle,
} from '../style';
import { RedisLikeConfigElementProps } from './interface';

function parseDatabaseConnectionString(
  connectionString: string,
): Omit<RedisResource, 'ssl' | 'databaseIndex'> | undefined {
  const regex = /^redis:\/\/(.*):(.*)@(.*?)(?::(\d+))?$/;
  const match = connectionString.match(regex);

  if (!match || match.length !== 5) {
    return undefined;
  }

  const [, databaseUsername, databasePassword, host, port] = match;

  return {
    databaseUsername,
    databasePassword,
    host,
    port: port ?? 80,
  } as any;
}

const checkIsValidConnectionString = (connectionString: string) => {
  const pattern = /^redis:\/\/(.*):(.*)@(.*?)(?::(\d+))?$/;
  return pattern.test(connectionString);
};

const RedisConfigElement: FC<RedisLikeConfigElementProps> = (props) => {
  const { resourceID, resourceType } = props;
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const { getResourceByID } = useContext(ResourceGeneratorContext);
  const findResource = getResourceByID(resourceID);

  let content: RedisResource;
  if (findResource === undefined) {
    content = RedisResourceInitial;
  } else {
    content = (findResource as Resource<RedisResource>).content;
  }

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const userNameOrPassword = useMemo(() => {
    return {
      title: t('editor.action.resource.db.label.username_password'),
      controlledType: ['input', 'password'] as ControlledType[],
      name: ['databaseUsername', 'databasePassword'],
      defaultValue: [content.databaseUsername, content.databasePassword],
      placeholders: [
        t('editor.action.resource.db.placeholder.username'),
        t('editor.action.resource.db.placeholder.password'),
      ],
    };
  }, [content.databasePassword, content.databaseUsername, t]);

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? '');
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert);
      }
      return true;
    },
    [showAlert],
  );

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t('editor.action.resource.db.label.name')}
          control={control}
          defaultValue={findResource?.resourceName ?? ''}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[t('editor.action.resource.db.placeholder.name')]}
          name="resourceName"
          tips={t('editor.action.resource.restapi.tip.name')}
        />
        <Divider direction="horizontal" ml="24px" mr="24px" mt="8px" mb="8px" w="unset" />
        <div css={optionLabelStyle}>{t('editor.action.resource.db.title.general_option')}</div>
        <Controller
          control={control}
          defaultValue=""
          rules={{
            required: false,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <div css={configItem}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor('grayBlue', '02'))}>
                  {t('editor.action.form.option.neon.connection_string')}
                </span>
              </div>
              <div css={hostInputContainer}>
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  error={!checkIsValidConnectionString(value) && value !== ''}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="redis://myuser:mypassword@localhost:6379"
                />
                <Button
                  disabled={!checkIsValidConnectionString(value)}
                  onClick={() => {
                    const db = parseDatabaseConnectionString(value);
                    if (db !== undefined) {
                      setValue('host', db.host);
                      setValue('port', db.port);
                      setValue('databaseUsername', db.databaseUsername);
                      setValue('databasePassword', db.databasePassword);
                      onChange('');
                    }
                  }}
                  colorScheme="techPurple"
                  h="32px"
                >
                  {t('editor.action.form.option.neon.parse')}
                </Button>
              </div>
            </div>
          )}
          name="connectionString"
        />
        <ControlledElement
          defaultValue={[content.host, content.port]}
          title={t('editor.action.resource.db.label.hostname_port')}
          control={control}
          rules={[
            {
              required: true,
              validate: handleHostValidate,
            },
            {
              required: true,
            },
          ]}
          isRequired
          controlledType={['input', 'number']}
          name={['host', 'port']}
          placeholders={[t('editor.action.resource.db.placeholder.hostname'), '6379']}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
        />
        {showAlert && (
          <ControlledElement
            defaultValue=""
            name=""
            title=""
            controlledType="none"
            control={control}
            tips={
              <Alert
                title={t('editor.action.form.tips.connect_to_local.title.tips')}
                closable={false}
                content={
                  isCloudVersion ? (
                    <Trans
                      i18nKey="editor.action.form.tips.connect_to_local.cloud"
                      t={t}
                      components={[
                        <TextLink
                          key="editor.action.form.tips.connect_to_local.cloud"
                          onClick={() => {
                            window.open('https://www.illacloud.com/docs/illa-cli', '_blank');
                          }}
                        />,
                      ]}
                    />
                  ) : (
                    t('editor.action.form.tips.connect_to_local.selfhost')
                  )
                }
              />
            }
          />
        )}
        {resourceType === 'redis' && (
          <ControlledElement
            title={t('editor.action.resource.db.label.database_index')}
            defaultValue={content.databaseIndex}
            name="databaseIndex"
            placeholders={[t('editor.action.resource.db.placeholder.database_index')]}
            controlledType="number"
            control={control}
          />
        )}
        <ControlledElement
          title={userNameOrPassword.title}
          controlledType={userNameOrPassword.controlledType}
          control={control}
          defaultValue={userNameOrPassword.defaultValue}
          name={userNameOrPassword.name}
          placeholders={userNameOrPassword.placeholders}
        />
        {isCloudVersion && (
          <>
            <div css={configItemTip}>{t('editor.action.resource.db.tip.username_password')}</div>
            <div css={connectType}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor('grayBlue', '02'))}>
                  {t('editor.action.resource.db.label.connect_type')}
                </span>
              </div>
              <span css={connectTypeStyle}>{t('editor.action.resource.db.tip.connect_type')}</span>
            </div>
          </>
        )}
        <Divider direction="horizontal" ml="24px" mr="24px" mt="8px" mb="8px" w="unset" />
        <div css={optionLabelStyle}>{t('editor.action.resource.db.title.advanced_option')}</div>
        <ControlledElement
          title={t('editor.action.resource.db.label.ssl_options')}
          control={control}
          defaultValue={content.ssl}
          controlledType="switch"
          name="ssl"
          contentLabel={t('editor.action.resource.db.tip.ssl_options')}
        />
      </div>
    </>
  );
};

RedisConfigElement.displayName = 'RedisConfigElement';
export default RedisConfigElement;
