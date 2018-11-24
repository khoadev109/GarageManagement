import React from "react";
import { connect } from "react-redux";
import { LogoutAction } from "../login/action/authentication-action";
import { Cookie } from "../../core/library/cookie";
import * as Constants from "../../core/library/constants";

class Header extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        this.props.logout();
    }

    componentWillReceiveProps(nextProps: any){
        let result = nextProps.logoutResult.target;
        if (result != this.props.logoutResult.target){
            Cookie.deleteCookie(Constants.AUTH_COOKIE_NAME);
            location.href = "/";
        }
    }

    render() {
        return (
            <div id="header" className="row border-bottom header-margin white-bg">
                <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: "0"}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:void(0);"><i className="fa fa-bars"></i> </a>
                        {/* <form role="search" className="navbar-form-custom" method="post" action="search_results.html">
                            <div className="form-group">
                                <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search"/>
                            </div>
                        </form> */}
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <span className="m-r-sm text-muted welcome-message">Admin</span>
                        </li>
                        {/* <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-envelope"></i>  <span className="label label-warning">16</span>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src="assets/img/a7.jpg"/>
                                        </a>
                                        <div className="media-body">
                                            <small className="pull-right">46h ago</small>
                                            <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br/>
                                            <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src="assets/img/a4.jpg"/>
                                        </a>
                                        <div className="media-body ">
                                            <small className="pull-right text-navy">5h ago</small>
                                            <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br/>
                                            <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src="assets/img/profile.jpg"/>
                                        </a>
                                        <div className="media-body ">
                                            <small className="pull-right">23h ago</small>
                                            <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br/>
                                            <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="mailbox.html">
                                            <i className="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell"></i>  <span className="label label-primary">8</span>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="mailbox.html">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="profile.html">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                            <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="grid_options.html">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="notifications.html">
                                            <strong>See All Alerts</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>       */}
                        <li>
                            <a href="javascript:void(0);" onClick={this.onLogout}>
                                <i className="fa fa-sign-out"></i> Đăng xuất
                            </a>
                        </li>
                    </ul>        
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state: any){
    return {
        logoutResult: state.LogoutReducer
    }
}

function mapDispatchToProps(dispatch: any) {
    let authAction = new LogoutAction();

    return {
        logout: () => dispatch(authAction.post())
    }
}

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedHeader as Header }