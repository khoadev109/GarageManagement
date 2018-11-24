import React from "react";
import LoginStore from "../stores/login-store";
import AppCommon from "../../../core/component/base-component";
import { IAuthenticationState } from "../state/authentication-state";
import { Redirect } from "react-router-dom";

export default class AuthenticationApp extends AppCommon.BaseComponent<any, IAuthenticationState> {
  changeListener: any;

  static willTransitionTo(transition) {
    if (!LoginStore.isLoggedIn()) {
      transition.redirect('/login', {}, { 'nextPath': transition.path });
    }
  }

  initState() {
    this.state = this.getLoginState();
  }

  getLoginState() {
    return {
      UserLoggedIn: LoginStore.isLoggedIn(),
      User: LoginStore.user,
      Jwt: LoginStore.jwt
    };
  }

  onChange() {
    this.setState(this.getLoginState());
  }

  componentDidMount() {
    this.changeListener = this.onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }
  
  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
      const redirectUrl = this.state.UserLoggedIn ? "/admin" : "/login";
      return <Redirect to={redirectUrl} />
  }
}
