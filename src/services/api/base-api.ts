import axios, {
  AxiosRequestConfig,
  AxiosResponseHeaders,
  Method,
  RawAxiosResponseHeaders,
} from 'axios';
import {HTTP_STATUS} from './http-status';
import get from 'lodash.get';
import {CONSTANTS} from '~values/contants';
import { localServices } from '~services/local-services';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

export interface PropsParams extends AxiosRequestConfig {
  url: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  method: Method;
  dataBody: any;
  timeout?: number;
  params?: any;
}
class BaseAPI {
  public requestAPI = async (props: PropsParams) => {
    const {url, method, dataBody, headers, params = {}} = props;
    const accessToken = localServices.token.accessToken;
    headers.Authorization = `Bearer ${accessToken}`;
    // if (method === 'PUT' || method === 'DELETE') {
    headers['Content-Type'] = 'application/json';
    // } else {
    //   headers['Content-Type'] = 'multipart/form-data';
    // }

    let config: {
      method: Method;
      url: string;
      headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
      baseURL: string;
      data?: any;
      params?: any;
    } = {
      params,
      method,
      url,
      headers,
      baseURL: CONSTANTS.BASE_URL,
    };
    if (dataBody) {
      config = {
        ...config,
        data: dataBody,
      };
    }
    try {
      const response = await axios(config);
      return get(response, 'data');
    } catch (error) {
      throw await this.handleError(error);
    }
  };

  public get = (
    url: string,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {},
    params?: any,
  ) => {
    return this.requestAPI({
      url,
      method: METHOD_GET,
      dataBody: null,
      headers,
      params,
    });
  };

  public post = (
    url: string,
    dataBody: any,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {},
  ) => {
    return this.requestAPI({
      url,
      method: METHOD_POST,
      dataBody,
      headers,
    });
  };

  public put = (
    url: string,
    dataBody: any,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {},
  ) => {
    return this.requestAPI({
      url,
      method: METHOD_PUT,
      dataBody,
      headers,
    });
  };

  public delete = (
    url: string,
    dataBody: any,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {},
  ) => {
    return this.requestAPI({
      url,
      method: METHOD_DELETE,
      dataBody,
      headers,
    });
  };

  handleError = async (error: any) => {
    let result;
    let data;
    const {response} = error;
    if (response) {
      data = await response.data;
      switch (response.status) {
        case HTTP_STATUS.notFound.code:
          result = {...HTTP_STATUS.notFound, data};
          break;
        case HTTP_STATUS.forbidden.code:
          result = {...HTTP_STATUS.forbidden, data};
          break;
        case HTTP_STATUS.unauthorized.code:
          // appModel.authenticate.setIsAuthenticated(false);
          await localServices.clearToken();
          // localServices.clearToken()
          return {...HTTP_STATUS.unauthorized, data};
        case HTTP_STATUS.badRequest.code:
          result = {...HTTP_STATUS.badRequest, data};
          break;
        case HTTP_STATUS.upgradeRequired.code:
          result = {...HTTP_STATUS.upgradeRequired, data};
          break;
        case HTTP_STATUS.notAcceptable.code:
          return {...HTTP_STATUS.notAcceptable};
        default:
          result = {message: 'server error', data};
          break;
      }
    } else {
      result = {message: error.message, data};
    }
    return result;
  };
}

const instance = new BaseAPI();
export {instance as BaseAPI};
