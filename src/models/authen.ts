import get from 'lodash.get';

export interface IAuthenticate {
  accessToken: string;
  refreshToken: string;
}

export type IDataSignIn = {
  token: IAuthenticate;
};

export type TypeSentOTP = 'SIGNUP' | 'FIND_ACCOUNT' | 'DEACTIVE_ACCOUNT';

export const AuthenticateModel = () => {
  const mapDataGetToken = (data: IDataSignIn) => {
    const {token} = data;
    const dataMap: IAuthenticate = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
    return dataMap;
  };
  return {mapDataGetToken};
};
