import {action, makeObservable, observable} from 'mobx';
import {authenService} from '~services';
import {TLogin} from '~services/api/authen/authen-api';

class AuthenticateViewModel {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      isLoading: observable,
      singIn: action,
      setLoading: action,
      setIsAuthenticated:action
    });
  }

  setIsAuthenticated = (value: boolean = false) => {
    this.isAuthenticated = value;
  };

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  singIn = async (param: TLogin) => {
    try {
      const res = await authenService.login(param);

      console.log(res);
    } catch (error: any) {}
  };
}
export {AuthenticateViewModel};
