import * as React from "react";
import AuthenticationApp from "./login/component/authentication-app";
import { Switch, Route } from "react-router-dom";
import { Login } from "./login/component/login-component";
import Layout from "./shared/layout";

const Main = () => (
    <Switch>
        <Route exact path="/" component={AuthenticationApp} />
        <Route path="/admin" component={Layout} />
        <Route exact path="/login" component={Login} />
    </Switch>
);

export default Main;
