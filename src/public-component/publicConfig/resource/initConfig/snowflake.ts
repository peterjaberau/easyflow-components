import {
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeKeyAuthenticationType,
  SnowflakeResource,
} from '../../../publicTypes';

export const snowflakeKeyAuthenticationTypeInitial: SnowflakeKeyAuthenticationType = {
  username: '',
  privateKey: '',
};

export const snowflakeBasicAuthenticationTypeInitial: SnowflakeBasicAuthenticationType = {
  username: '',
  password: '',
};

export const snowflakeResourceInitial: SnowflakeResource<SnowflakeAuthenticationType> = {
  accountName: '',
  warehouse: '',
  database: '',
  schema: 'PUBLIC',
  role: 'PUBLIC',
  authentication: 'basic',
  authContent: snowflakeBasicAuthenticationTypeInitial,
};
