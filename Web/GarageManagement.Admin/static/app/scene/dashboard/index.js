import * as React from "react";
import { Footer } from "../shared/footer";
export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: "wrapper wrapper-content" },
                React.createElement("h3", null, "Qu\u1EA3n l\u00FD Garage 2018"),
                " ",
                React.createElement("small", null, "(version 0.1)")),
            React.createElement(Footer, null)));
    }
}
//# sourceMappingURL=index.js.map