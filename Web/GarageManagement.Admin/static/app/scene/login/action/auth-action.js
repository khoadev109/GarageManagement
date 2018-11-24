import { ActionType } from "./action-type";
import * as AuthService from "../services/auth-service";
export class LoginAction {
    loginUser(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            if (entry.UserName == 'admin' && entry.Password == 'garage2018') {
                var result = { access_token: 'abcXYZ123' };
                dispatch(this.success(result));
            }
            else {
                dispatch(this.failure(new Error("Tên đăng nhập hoặc mật khẩu không chính xác")));
            }
            // let service = new AuthService.LoginService();
            // service.execute(entry).then(
            //   result => dispatch(this.success(result)),
            //   error => dispatch(this.failure(error))
            // );
        };
    }
    request(entry) {
        return { type: ActionType.LOGIN_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LOGIN_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LOGIN_ERROR, error };
    }
}
export class LogoutAction {
    logoutUser() {
        return (dispatch) => {
            dispatch(this.request());
            let service = new AuthService.LogoutService();
            service.execute().then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request() {
        return { type: ActionType.LOGOUT_REQUEST };
    }
    success(result) {
        return { type: ActionType.LOGOUT_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LOGOUT_ERROR, error };
    }
}
//# sourceMappingURL=auth-action.js.map