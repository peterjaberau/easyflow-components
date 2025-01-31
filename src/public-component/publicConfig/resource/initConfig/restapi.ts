import { RestApiAuth, RestApiResource } from '../../../publicTypes';

export const RestApiResourceInit: RestApiResource<RestApiAuth> = {
  baseUrl: '',
  urlParams: [
    {
      key: '',
      value: '',
    },
  ],
  headers: [
    {
      key: '',
      value: '',
    },
  ],
  cookies: [
    {
      key: '',
      value: '',
    },
  ],
  authentication: 'none',
  selfSignedCert: false,
  certs: {
    caCert: '',
    clientKey: '',
    clientCert: '',
    mode: 'verify-full',
  },
  authContent: {},
};
