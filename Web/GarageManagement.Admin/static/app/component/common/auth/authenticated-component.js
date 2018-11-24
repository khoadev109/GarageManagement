import React from 'react';
import LoginStore from '../../../scene/login/stores/login-store';
import { Redirect } from "react-router-dom";
export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {
        static willTransitionTo(transition) {
            if (!LoginStore.isLoggedIn()) {
                transition.redirect('/login', {}, { 'nextPath': transition.path });
            }
        }
        constructor(props) {
            super(props);
            this.initializeState();
        }
        initializeState() {
            this.state = this._getLoginState();
        }
        _getLoginState() {
            return {
                userLoggedIn: LoginStore.isLoggedIn(),
                user: LoginStore.user,
                jwt: LoginStore.jwt
            };
        }
        componentDidMount() {
            this.changeListener = this._onChange.bind(this);
            LoginStore.addChangeListener(this.changeListener);
        }
        _onChange() {
            this.setState(this._getLoginState());
        }
        componentWillUnmount() {
            LoginStore.removeChangeListener(this.changeListener);
        }
        render() {
            if (!this.state.userLoggedIn)
                return React.createElement(Redirect, { to: "/login" });
            return (React.createElement(ComposedComponent, Object.assign({}, this.props, { user: this.state.user, jwt: this.state.jwt, userLoggedIn: this.state.userLoggedIn })));
        }
    };
};
//# sourceMappingURL=authenticated-component.js.map