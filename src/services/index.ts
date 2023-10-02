import {AuthenService} from './api/authen/authen-api';
import {CCCDService} from './api/cccd/cccd-api';
import {UserService} from './api/user/user-api';

const userService = new UserService();
const authenService = new AuthenService();
const cccdService = new CCCDService();

export {userService, authenService, cccdService};
