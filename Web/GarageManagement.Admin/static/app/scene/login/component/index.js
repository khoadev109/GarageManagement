import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginAction } from "./../action/auth-action";
import { UserInteraction } from "../../../core/library/extension/interaction";
import { Dictionary } from "../../../core/library/extension/dictionary";
import { FormValidation } from "../../../core/library/extension/validation";
import LoginStore from "./../stores/login-store";
;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ Account: this.inputInteraction.onReceiveTarget(event.target, this.state.Account) }, doValidation);
        };
        this.validateInputRequired = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid)
                this.props.login(this.state.Account);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.initializeState();
        this.setInitialErrors(false);
        this.inputInteraction = new UserInteraction.InputInteraction();
    }
    initializeState() {
        this.state = {
            IsValid: false,
            Account: {
                UserName: "",
                Password: ""
            },
            FailLoginMessage: "",
            Errors: this.errors
        };
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("UserName", false);
        this.errors.Add("Password", false);
    }
    componentWillReceiveProps(nextProps) {
        // let loginResult = nextProps.loginResult.target;
        // if(loginResult.Success)
        //     toast("Đăng nhập thành công!");
        // else
        //     toast("Tài khoản hoặc mật khẩu không đúng!");
        let result = nextProps.loginResult.target;
        if (result.access_token) {
            var savedJwt = localStorage.getItem('jwt');
            if (savedJwt !== result.access_token) {
                toast("Đăng nhập thành công!", { autoClose: 1500 });
                location.href = "/";
                localStorage.setItem('jwt', result.access_token);
            }
        }
        else {
            let error = nextProps.loginResult.error;
            if (error) {
                this.setState({ FailLoginMessage: error.message });
            }
        }
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    render() {
        if (!LoginStore.isLoggedIn()) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "loginColumns animated fadeInDown" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6" },
                            React.createElement("h2", { className: "font-bold" }, "Ch\u00E0o m\u1EEBng \u0111\u1EBFn v\u1EDBi Garage Auto"),
                            React.createElement("p", null, "Kh\u00E1ch h\u00E0ng, D\u1ECBch v\u1EE5, B\u1EA3o tr\u00EC")),
                        React.createElement("div", { className: "col-md-6" },
                            React.createElement("div", { className: "ibox-content" },
                                React.createElement("form", { className: "m-t", role: "form", action: "index.html", onSubmit: this.onSave },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "UserName", placeholder: "Tên đăng nhập", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)) })),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "password", className: "form-control", name: "Password", placeholder: "Mật khẩu", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)) })),
                                    React.createElement("div", { className: "form-group", style: { display: this.state.FailLoginMessage && "" } },
                                        React.createElement("span", { className: "has-error" }, this.state.FailLoginMessage)),
                                    React.createElement("button", { type: "submit", className: "btn btn-primary block full-width m-b" }, "\u0110\u0103ng nh\u1EADp"),
                                    React.createElement("a", { href: "#" },
                                        React.createElement("small", null, "Qu\u00EAn m\u1EADt kh\u1EA9u?"))),
                                React.createElement("p", { className: "m-t" },
                                    React.createElement("small", null, "Garage Auto \u00A9 2018"))))),
                    React.createElement("hr", null),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6" }, "Vi\u1EC7n Auto"),
                        React.createElement("div", { className: "col-md-6 text-right" },
                            React.createElement("small", null, "B\u1EA3n quy\u1EC1n Qu\u1EA3n l\u00FD Garage \u00A9 2018"))))));
        }
        else {
            return React.createElement(Redirect, { to: "/admin" });
        }
    }
}
function mapStateToProps(state) {
    return {
        loginResult: state.LoginReducer
    };
}
function mapDispatchToProps(dispatch) {
    let authAction = new LoginAction();
    return {
        login: (entry) => dispatch(authAction.loginUser(entry))
    };
}
const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLogin as Login };
//# sourceMappingURL=index.js.map