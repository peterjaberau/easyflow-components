import { ClickhouseResource, ClickhouseSSL } from '../../../publicTypes';

export const ClickhouseSSLInitial: ClickhouseSSL = {
  ssl: false,
  selfSigned: false,
  privateKey: '',
  clientCert: '',
  caCert: '',
};

export const ClickhouseResourceInitial: ClickhouseResource = {
  host: '',
  port: '8443',
  databaseName: '',
  username: '',
  password: '',
  ssl: ClickhouseSSLInitial,
};
