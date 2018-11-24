import React from "react";
import LoginStore from "../stores/login-store";
import ToastHelper from "../../../component/common-helper/toast-helper";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { IAccount } from "../state/account-state";
import { LoginAction } from "../action/authentication-action";
import { TextboxFormGroupWrapper } from "../../../component/control/textbox-component";
import { Submit } from "../../../component/control/submit-component";
import { Cookie } from "core/library/cookie";
import * as Constants from "core/library/constants";
import * as BaseForm from "core/component/base-form-component";
import { Encoding } from "core/library/encoding";

export interface IFormProps {
    loginResult: any;
}

export interface IFormDispatchProps {
    login(entry: any): any;
    closeModal?: any;
    create?(entry: any): any;
    edit?(entry: any): any;
}

export interface CombinedProps extends IFormProps, IFormDispatchProps { }

interface FormState {
    IsValid?: boolean;
    Account: IAccount;
    FailLoginMessage: string;
};

class LoginForm extends BaseForm.BaseFormComponent<CombinedProps, FormState, IAccount> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("UserName", effectForAllValues);
        this.errors.add("Password", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            Account: {
                UserName: "",
                Password: "",
                GrantType: "password"
            },
            FailLoginMessage: ""
        };
    }

    onSave(event: any) {
        event.preventDefault();

        if (this.state.IsValid)
            this.props.login(this.state.Account);
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        const loginResult = nextProps.loginResult.target;        
        const isLoginResultChanged = this.isPropsChanged(this.props.loginResult.target, loginResult);

        if (isLoginResultChanged) {
            if (this.isSuccessResponseFromServer(loginResult)) {
                var savedJwt = Cookie.getCookie(Constants.AUTH_COOKIE_NAME);

                if (savedJwt !== loginResult.access_token) {
                    ToastHelper.notifySuccess("Đăng nhập thành công!");
                    Cookie.setCookie(Constants.AUTH_COOKIE_NAME, loginResult.access_token, loginResult.expires_in);
                    location.href = "/";
                }
            } else {
                const error = nextProps.loginResult.error;
                if (error) {
                    this.setState({ FailLoginMessage: error.message });
                }
            }
        }
    }
    
    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            Account: this.inputInteraction.onBindTarget(event.target, this.state.Account) 
        }, 
        this.triggerValidation(event, validationFunc));
    }

    render() {
        if (!LoginStore.isLoggedIn()) {
            return (
                <React.Fragment>
                    <div className="loginColumns animated fadeInDown">
                        <div className="row">
                            <div className="col-md-6">
                                <h2 className="font-bold">Chào mừng đến với Garage Auto</h2>
                                <p>Khách hàng, Dịch vụ, Bảo trì</p>
                            </div>
                            <div className="col-md-6">
                                <div className="ibox-content">
                                    <form className="m-t" role="form" action="index.html" onSubmit={this.onSave}> 
                                        <TextboxFormGroupWrapper name="UserName" value={this.state.Account.UserName} 
                                                                 event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                        <TextboxFormGroupWrapper name="Password" value={this.state.Account.Password} 
                                                                 event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                        <div className="form-group" style={{ display: this.state.FailLoginMessage && "" }}>
                                            <span className="has-error">
                                                {this.state.FailLoginMessage}
                                            </span>
                                        </div>
                                        <Submit class="btn btn-primary block full-width m-b" text="Đăng nhập" />

                                        <a href="#"><small>Quên mật khẩu?</small></a>
                                    </form>
                                    <p className="m-t">
                                        <small>Garage Auto &copy; 2018</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                            Viện Auto
                        </div>
                            <div className="col-md-6 text-right">
                                <small>Bản quyền Quản lý Garage © 2018</small>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return <Redirect to="/admin" />
        }
    }
}

class ReduxMapping {
    public mapStateToProps(state: any): IFormProps {
        return {
            loginResult: state.LoginReducer
        }
    }

    public mapDispatchToProps(dispatch: any): IFormDispatchProps {
        const authenticationAction = new LoginAction();

        return {
            login: (entry: any) => dispatch(authenticationAction.post({
                UserName: entry.UserName,
                Password: new Encoding.EncodingVigenere().Encrypt(entry.Password),
                GrantType: entry.grant_type
            }))
        }
    }
}

const mapping = new ReduxMapping();
const connectedComponent = connect(mapping.mapStateToProps, mapping.mapDispatchToProps)(LoginForm);
export { connectedComponent as LoginForm };
