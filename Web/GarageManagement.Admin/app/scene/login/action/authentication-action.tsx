import { ActionType as AT } from "./action-type";
import { IAccount } from "../state/account-state";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as AuthenticationService from "../service/authentication-service";

export class LoginAction extends BaseAction implements IPostAction {
    
    requestAction = AT.LOGIN_REQUEST;
    successAction = AT.LOGIN_SUCCESS;    
    errorAction = AT.LOGIN_ERROR;
    
    post(entry: IAccount) {
        this.dispatching(entry, new AuthenticationService.LoginService());
    }
}

export class LogoutAction extends BaseAction implements IPostAction {
    
    requestAction = AT.LOGOUT_REQUEST;
    successAction = AT.LOGOUT_SUCCESS;    
    errorAction = AT.LOGOUT_ERROR;
    
    post(entry?: any) {
        this.dispatching(entry, new AuthenticationService.LogoutService());
    }
}
