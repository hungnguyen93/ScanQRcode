import {action, makeObservable, observable} from 'mobx';
import {AuthenticateModel} from '~models/authen';
import {authenService} from '~services';
import {localServices} from '~services/local-services';
import {appModel} from '~view-models/app-view-models';

class SignInModel {
  isLoading: boolean = false;
  userName: string = '0703774242';
  passWord: string = 'Admin@1234';
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      passWord: observable,
      userName: observable,
      setLoading: action,
      handleLogin: action,
      changeTextUser: action,
      changeTextPass: action,
    });
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  changeTextUser = (text: string) => {
    this.userName = text;
  };

  changeTextPass = (text: string) => {
    this.passWord = text;
  };

  handleLogin = async () => {
    this.setLoading(true);
    try {
      const param = {phone: this.userName, password: this.passWord};
      this.setLoading(true);
      const res = await authenService.login(param);
      const {mapDataGetToken} = AuthenticateModel();
      const mapData = mapDataGetToken(res.data);
      await localServices.saveToken(mapData);
      appModel.authenticate.setIsAuthenticated(true);
    } catch (error) {
      console.log('handleLogin', error);
    } finally {
      this.setLoading(false);
    }
  };
}

export {SignInModel};
