import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { actionRuntimeAxios, needAuthAxios, notNeedAuthAxios } from './base';
import {
  ACTION_REQUEST_PREFIX,
  AGENT_REQUEST_PREFIX,
  BUILDER_REQUEST_PREFIX,
  BUILDER_WS_REQUEST_PREFIX,
  CLOUD_REQUEST_PREFIX,
  DOMAIN_REQUEST_PREFIX,
  DRIVE_REQUEST_PREFIX,
  MARKETPLACE_AUTH_PRODUCT_REQUEST_PREFIX,
  MARKETPLACE_AUTH_REQUEST_PREFIX,
  MARKETPLACE_HASH_TAG_REQUEST_PREFIX,
  MARKETPLACE_PUBLIC_REQUEST_PREFIX,
  PUBLIC_DRIVE_REQUEST_PREFIX,
  WORKFLOW_REQUEST_PREFIX,
} from './constant';
import { RequestHandlerOptions } from './interface';

const getURLWithPrefix = (url: string | undefined, prefix: string, options?: RequestHandlerOptions) => {
  let finalURL = prefix + url;
  if (options?.teamIdentifier) {
    const teamIdentifier = options.teamIdentifier;
    finalURL = `${prefix}/teams/byIdentifier/${teamIdentifier}` + url;
  } else if (options?.teamID) {
    const teamID = options.teamID;
    finalURL = `${prefix}/teams/${teamID}` + url;
  }
  return finalURL;
};

export const needAuthRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await needAuthAxios.request({
      ...requestConfig,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response;
    }

    throw e;
  }
};

export const notNeedAuthRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await notNeedAuthAxios.request({
      ...requestConfig,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response;
    }

    throw e;
  }
};

export const authCloudRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, CLOUD_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const notNeedAuthCloudRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  const finalURL = getURLWithPrefix(requestConfig.url, CLOUD_REQUEST_PREFIX);
  try {
    return await notNeedAuthRequest({
      ...requestConfig,
      url: finalURL,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response;
    }

    throw e;
  }
};

export const actionBasicRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await actionRuntimeAxios.request({
      ...requestConfig,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response;
    }
    throw e;
  }
};

export const builderRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, BUILDER_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const agentRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, AGENT_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const marketplaceRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, MARKETPLACE_AUTH_PRODUCT_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const marketplaceTeamRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, MARKETPLACE_AUTH_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const publicMarketplaceRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, MARKETPLACE_PUBLIC_REQUEST_PREFIX, options);

  return await notNeedAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const publicHashtagRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, MARKETPLACE_HASH_TAG_REQUEST_PREFIX, options);

  return await notNeedAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const directRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, '', options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const builderWSRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, BUILDER_WS_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const actionRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
  customPrefix?: string,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, customPrefix ? customPrefix : ACTION_REQUEST_PREFIX, options);
  return await actionBasicRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const driveRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, DRIVE_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const publicDriveRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, PUBLIC_DRIVE_REQUEST_PREFIX, options);

  return await notNeedAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const flowRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, WORKFLOW_REQUEST_PREFIX, options);

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export const domainRequest = async <ResponseData = unknown, RequestData = unknown>(
  requestConfig: AxiosRequestConfig<RequestData>,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, DOMAIN_REQUEST_PREFIX);

  return await notNeedAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  });
};

export * from './interface';
export * from './errorFlag';
export * from './utils';
export * from './base';
export * from './constant';
export * from './interceptors/request/auth';
export * from './interceptors/response/errorHandler';
