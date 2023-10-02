import {BaseAPI} from '../base-api';
import {USER} from '../api-url';

export type TLogin = {
  phone: string;
  password: string;
};

class UserService {
  login = async (body: TLogin) => {
    const res = await BaseAPI.post(USER.LOGIN, body);
    return res;
  };
}
export {UserService};
