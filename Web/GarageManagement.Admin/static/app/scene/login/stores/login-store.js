import BaseStore from './base-store';
import { ActionType } from "../action/action-type";
class LoginStore extends BaseStore {
    constructor(_user = null, _jwt = null) {
        super(_user, _jwt);
        this._user = _user;
        this._jwt = _jwt;
        this.initialStore();
        this.subscribe(() => this._registerToActions.bind(this));
    }
    initialStore() {
        let savedJwt = localStorage.getItem('jwt');
        if (savedJwt != "") {
            this._jwt = savedJwt;
            this._user = this._jwt;
        }
        else {
            this._jwt = "";
            this._user = null;
        }
    }
    _registerToActions(action) {
        switch (action.actionType) {
            case ActionType.LOGIN_SUCCESS:
                this._jwt = action.jwt;
                //this._user = jwt_decode(this._jwt);
                this._user = this._jwt;
                this.emitChange();
                break;
            case ActionType.LOGOUT_SUCCESS:
                this._user = null;
                this.emitChange();
                break;
            default:
                break;
        }
        ;
    }
    get user() {
        return this._user;
    }
    get jwt() {
        return this._jwt;
    }
    isLoggedIn() {
        return !!this._user;
    }
}
export default new LoginStore();
//# sourceMappingURL=login-store.js.map