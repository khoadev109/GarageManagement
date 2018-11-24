import React from "react";
import LoginStore from "../stores/login-store";
import AppCommon from "../../../core/component/base-component";
import { IAuthenticationState } from "../state/authentication-state";
import { Redirect } from "react-router-dom";

export default (ComposedComponent) => {
  return class AuthenticationComponent extends AppCommon.BaseComponent<any, IAuthenticationState> {
    changeListener: any;

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect("/login", {}, { "nextPath": transition.path });
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

    componentDidMount() {
      this.changeListener = this.onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    onChange() {
      this.setState(this.getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }
    
    render() {
      if (!this.state.UserLoggedIn)
        return <Redirect to="/login" />

      return (
        <ComposedComponent
          {...this.props}
          User={this.state.User}
          Jwt={this.state.Jwt}
          UserLoggedIn={this.state.UserLoggedIn} />
      )
    }
  }
}
