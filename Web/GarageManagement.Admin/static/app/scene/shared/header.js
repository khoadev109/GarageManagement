import * as React from "react";
import { connect } from "react-redux";
import { LogoutAction } from "../login/action/auth-action";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout() {
        this.props.logout();
    }
    componentWillReceiveProps(nextProps) {
        let result = nextProps.logoutResult.target;
        if (!!result) {
            localStorage.removeItem('jwt');
            location.href = "/";
        }
    }
    render() {
        return (React.createElement("div", { id: "header", className: "row border-bottom header-margin white-bg" },
            React.createElement("nav", { className: "navbar navbar-static-top", role: "navigation", style: { marginBottom: "0" } },
                React.createElement("div", { className: "navbar-header" },
                    React.createElement("a", { className: "navbar-minimalize minimalize-styl-2 btn btn-primary ", href: "#" },
                        React.createElement("i", { className: "fa fa-bars" }),
                        " ")),
                React.createElement("ul", { className: "nav navbar-top-links navbar-right" },
                    React.createElement("li", null,
                        React.createElement("span", { className: "m-r-sm text-muted welcome-message" }, "Admin")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "javascript:void(0);" },
                            React.createElement("i", { className: "fa fa-sign-out", onClick: this.onLogout }),
                            " \u0110\u0103ng xu\u1EA5t"))))));
    }
}
function mapStateToProps(state) {
    return {
        logoutResult: state.LogoutReducer
    };
}
function mapDispatchToProps(dispatch) {
    let authAction = new LogoutAction();
    return {
        logout: () => dispatch(authAction.logoutUser())
    };
}
const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedHeader as Header };
//# sourceMappingURL=header.js.map