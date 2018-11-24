import * as React from "react";
import Sub from "./sub";
import { Aside } from "./aside";
import { Header } from "./header";
import AuthenticatedComponent from "../../component/common/auth/authenticated-component";
export default AuthenticatedComponent(class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Aside, null),
            React.createElement(Header, null),
            React.createElement(Sub, null)));
    }
});
//# sourceMappingURL=layout.js.map