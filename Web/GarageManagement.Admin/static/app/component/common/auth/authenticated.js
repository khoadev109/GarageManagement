import React from 'react';
import { Redirect } from "react-router-dom";
import LoginStore from '../../../scene/login/stores/login-store';
export default class AuthenticatedApp extends React.Component {
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
    _onChange() {
        this.setState(this._getLoginState());
    }
    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }
    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }
    render() {
        if (this.state.userLoggedIn) {
            return React.createElement(Redirect, { to: "/admin" });
        }
        return React.createElement(Redirect, { to: "/login" });
    }
}
//# sourceMappingURL=authenticated.js.map