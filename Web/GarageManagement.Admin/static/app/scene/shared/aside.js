import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutAction } from "../login/action/auth-action";
class Aside extends React.Component {
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
        return (React.createElement("nav", { className: "navbar-default navbar-static-side", role: "navigation" },
            React.createElement("div", { className: "sidebar-collapse" },
                React.createElement("ul", { className: "nav", id: "side-menu" },
                    React.createElement("li", { className: "nav-header" },
                        React.createElement("div", { className: "dropdown profile-element text-center" },
                            " ",
                            React.createElement("span", null,
                                React.createElement("img", { alt: "image", className: "img-circle", style: { background: "#fff" }, height: "60", width: "60", src: "assets/img/car.ico" })),
                            React.createElement("a", { "data-toggle": "dropdown", className: "dropdown-toggle", href: "#" },
                                React.createElement("span", { className: "clear" },
                                    " ",
                                    React.createElement("span", { className: "block m-t-xs" },
                                        " ",
                                        React.createElement("strong", { className: "font-bold" }, "Vi\u1EC7n Auto")),
                                    " ",
                                    React.createElement("span", { className: "text-muted text-xs block" },
                                        "Admin",
                                        React.createElement("b", { className: "caret" })),
                                    " "),
                                " "),
                            React.createElement("ul", { className: "dropdown-menu animated fadeInRight m-t-xs" },
                                React.createElement("li", null,
                                    React.createElement("a", { href: "contacts.html" }, "Li\u00EAn h\u1EC7")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "mailbox.html" }, "H\u1ED9p th\u01B0")),
                                React.createElement("li", { className: "divider" }),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "javascript:logOut();", onClick: this.onLogout }, "\u0110\u0103ng xu\u1EA5t")))),
                        React.createElement("div", { className: "logo-element" }, "IN+")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#" },
                            React.createElement("i", { className: "fa fa-bar-chart-o" }),
                            " ",
                            React.createElement("span", { className: "nav-label" }, "Danh m\u1EE5c chung"),
                            React.createElement("span", { className: "fa arrow" })),
                        React.createElement("ul", { className: "nav nav-second-level" },
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/insurers" }, "H\u00E3ng b\u1EA3o hi\u1EC3m")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/manufacturers" }, "H\u00E3ng xe")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/models" }, "D\u00F2ng xe")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/years" }, "N\u0103m s\u1EA3n xu\u1EA5t")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/service-types" }, "Lo\u1EA1i d\u1ECBch v\u1EE5")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/public-service" }, "C\u00F4ng d\u1ECBch v\u1EE5")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/customer-types" }, "Lo\u1EA1i kh\u00E1ch h\u00E0ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/customers" }, "Kh\u00E1ch h\u00E0ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/suppliers" }, "Nh\u00E0 cung c\u1EA5p")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/staffs" }, "Nh\u00E2n vi\u00EAn")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/categories" }, "Danh m\u1EE5c ph\u1EE5 t\u00F9ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/accessaries" }, "Ph\u1EE5 t\u00F9ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/receipts" }, "Phi\u1EBFu thu")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/pay-slip" }, "Phi\u1EBFu chi")))),
                    React.createElement("li", null,
                        React.createElement("a", { href: "mailbox.html" },
                            React.createElement("i", { className: "fa fa-envelope" }),
                            " ",
                            React.createElement("span", { className: "nav-label" }, "C\u1ED1 v\u1EA5n d\u1ECBch v\u1EE5 "),
                            React.createElement("span", { className: "fa arrow" })),
                        React.createElement("ul", { className: "nav nav-second-level" },
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/repair-quotes" }, "B\u00E1o gi\u00E1 s\u1EEDa ch\u1EEFa")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/lookup-quotes" }, "Tra c\u1EE9u m\u00E3 b\u00E1o gi\u00E1")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/lookup-customer-info" }, "Tra c\u1EE9u th\u00F4ng tin kh\u00E1ch h\u00E0ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/lookup-commodity" }, "Tra c\u1EE9u h\u00E0ng h\u00F3a")))),
                    React.createElement("li", null,
                        React.createElement("a", { href: "widgets.html" },
                            React.createElement("i", { className: "fa fa-flask" }),
                            " ",
                            React.createElement("span", { className: "nav-label" }, "Kho h\u00E0ng"),
                            " ",
                            React.createElement("span", { className: "fa arrow" })),
                        React.createElement("ul", { className: "nav nav-second-level" },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#" },
                                    "H\u00E0ng h\u00F3a ",
                                    React.createElement("span", { className: "fa arrow" })),
                                React.createElement("ul", { className: "nav nav-third-level" },
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/sales" }, "B\u00E1n h\u00E0ng")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/lookup-code-of-commodity" }, "T\u00ECm ki\u1EBFm m\u00E3 h\u00E0ng")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/lookup-exchange" }, "T\u00ECm ki\u1EBFm giao d\u1ECBch")))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "#" },
                                    "\u0110\u1ED1i t\u00E1c ",
                                    React.createElement("span", { className: "fa arrow" })),
                                React.createElement("ul", { className: "nav nav-third-level" },
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/partner-customers" }, "Kh\u00E1ch h\u00E0ng")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/partner-suppliers" }, "Nh\u00E0 cung c\u1EA5p")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/categories" }, "Danh m\u1EE5c h\u00E0ng h\u00F3a")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/manage-price" }, "Thi\u1EBFt l\u1EADp gi\u00E1")),
                                    React.createElement("li", null,
                                        React.createElement(Link, { to: "/admin/create-category" }, "Th\u00EAm nh\u00F3m h\u00E0ng h\u00F3a")))))),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#" },
                            React.createElement("i", { className: "fa fa-edit" }),
                            " ",
                            React.createElement("span", { className: "nav-label" }, "Ch\u0103m s\u00F3c kh\u00E1ch h\u00E0ng"),
                            React.createElement("span", { className: "fa arrow" })),
                        React.createElement("ul", { className: "nav nav-second-level" },
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/list-repaired" }, "Danh s\u00E1ch \u0111\u00E3 th\u1EF1c hi\u1EC7n s\u1EEDa ch\u1EEFa")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/expiration-of-service" }, "Xe s\u1EAFp h\u1EBFt h\u1EA1n b\u1EA3o d\u01B0\u1EE1ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/setup-auto-remind" }, "Thi\u1EBFt l\u1EADp nh\u1EAFc nh\u1EDF b\u00E3o d\u01B0\u1EE1ng t\u1EF1 \u0111\u1ED9ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/revenue-sales" }, "Doanh s\u1ED1 b\u00E1n h\u00E0ng")))),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#" },
                            React.createElement("i", { className: "fa fa-desktop" }),
                            " ",
                            React.createElement("span", { className: "nav-label" }, "Thi\u1EBFt l\u1EADp"),
                            " ",
                            React.createElement("span", { className: "fa arrow" })),
                        React.createElement("ul", { className: "nav nav-second-level" },
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/settings" }, "Thi\u1EBFt l\u1EADp Garage")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/setting-bill" }, "Qu\u1EA3n l\u00FD m\u1EABu in")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/members" }, "Qu\u1EA3n l\u00FD ng\u01B0\u1EDDi d\u00F9ng")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/branches" }, "Qu\u1EA3n l\u00FD chi nh\u00E1nh")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/history" }, "L\u1ECBch s\u1EED thao t\u00E1c")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: "/admin/delete-history" }, "X\u00F3a l\u1ECBch s\u1EED d\u00F9ng th\u1EED"))))))));
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
const connectedAside = connect(mapStateToProps, mapDispatchToProps)(Aside);
export { connectedAside as Aside };
//# sourceMappingURL=aside.js.map