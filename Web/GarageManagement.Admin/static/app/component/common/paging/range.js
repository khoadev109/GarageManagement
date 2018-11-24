import * as React from "react";
export class DisplayingPageRange extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "dataTables_info", role: "status", "aria-live": "polite" },
            "Hi\u1EC3n th\u1ECB ",
            this.props.FromItem,
            " - ",
            this.props.ToItem,
            " trong ",
            this.props.TotalItems));
    }
}
//# sourceMappingURL=range.js.map