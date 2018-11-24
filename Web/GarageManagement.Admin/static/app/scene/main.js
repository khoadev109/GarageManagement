import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AuthenticatedApp from '../component/common/auth/authenticated';
import { Login } from "../scene/login/component/index";
import Layout from "./shared/layout";
const Main = () => (React.createElement(Switch, null,
    React.createElement(Route, { exact: true, path: "/", component: AuthenticatedApp }),
    React.createElement(Route, { path: "/admin", component: Layout }),
    React.createElement(Route, { exact: true, path: "/login", component: Login })));
export default Main;
//# sourceMappingURL=main.js.map