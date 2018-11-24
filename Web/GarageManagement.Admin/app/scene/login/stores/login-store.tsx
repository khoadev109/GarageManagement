import BaseStore from './base-store';
import { ActionType } from "../action/action-type";
import { Cookie } from "../../../core/library/cookie";
import * as Cons from "../../../core/library/constants";

class LoginStore extends BaseStore {

  constructor(public _user: any = null, public _jwt: any = null) {
    super(_user, _jwt);
    this.initialStore();
    this.subscribe(() => this._registerToActions.bind(this));    
  }

  initialStore(){
    let savedJwt = Cookie.getCookie(Cons.AUTH_COOKIE_NAME);
    if(savedJwt != ""){
      this._jwt = savedJwt;
      this._user = this._jwt;
    }
    else{
      this._jwt = "";
      this._user = null;
    }
  }

  _registerToActions(action) {
    switch(action.actionType) {
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
    };
  }

  public get user() {
    return this._user;
  }

  public get jwt() {
    return this._jwt;
  }

  public isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
