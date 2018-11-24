import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { AsideAction } from "../aside/action";
import { LogoutAction } from "../../login/action/authentication-action";
import AppCommon from "../../../core/component/base-component";
import {
    ActiveParentLink,
    IsParentGeneralCategory,
    IsParentServiceAdvisor,
    IsParentCustomerCare,
    IsParentSetting
} from "core/router";
import { Cookie } from "../../../core/library/cookie";
import { IGarage } from "../../garage/state/garage-state";
import * as Constants from "../../../core/library/constants";
import * as FetchAction from "../../garage/action/fetch-action";

interface IAsideState {
    IsOpenGeneralCategory: boolean,
    IsOpenServiceAdvisor: boolean,
    IsOpenWareHouse: boolean,
    IsOpenCustomerCare: boolean,
    IsOpenSetting: boolean,
    Garage: IGarage
}

class Aside extends AppCommon.BaseComponent<any, IAsideState> {
    
    constructor(props: any, state: IAsideState) {
        super(props, state);
        this.onLogout = this.onLogout.bind(this);
    }

    initState() {
        this.state = {
            IsOpenGeneralCategory: false,
            IsOpenServiceAdvisor: false,
            IsOpenWareHouse: false,
            IsOpenCustomerCare: false,
            IsOpenSetting: false,
            Garage: {
                Id: 0,
                Website: "",
                ExpireDate: "",
                Name: "",
                ShortName: "",
                Address: "",
                District: "",
                Ward: "",
                Phone: "",
                Logo: "",
                SmsPhoneNumber: false,
                EmailSchedule: false
            }
        };
    }

    onLogout() {
        this.props.logout();
    }

    bindActiveClassForHeaderParentLink(isActive: boolean) {
        if (isActive) {
            let activeClass = [];
            activeClass.push("active");
            return activeClass.join(" ");
        }
        return "";
    }

    bindCollapseClassForContentParentLink(isActive: boolean) {
        if (isActive) {
            let navUlClass = ["nav nav-second-level"];
            navUlClass.push("in");
            return navUlClass.join(" ");
        }
        return "nav nav-second-level";
    }

    openOrCollapseParentLink(parentName: string) {
        this.props.setActiveParentLink(parentName);
    }

    componentDidMount() {
        this.props.getInfoGarage();

        if (IsParentGeneralCategory(this.props.location.pathname))
            this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory);

        if (IsParentServiceAdvisor(this.props.location.pathname))
            this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor);

        if (IsParentCustomerCare(this.props.location.pathname))
            this.openOrCollapseParentLink(ActiveParentLink.CustomerCare);

        if (IsParentSetting(this.props.location.pathname))
            this.openOrCollapseParentLink(ActiveParentLink.Setting);
    }

    componentWillReceiveProps(nextProps: any) {
        let activeParentLinkResult = nextProps.activeSettingResult.target;
        if (activeParentLinkResult) {
            if (activeParentLinkResult.parentName == ActiveParentLink.GeneralCategory)
                this.setState({ IsOpenGeneralCategory: activeParentLinkResult.active });

            if (activeParentLinkResult.parentName == ActiveParentLink.ServiceAdvisor)
                this.setState({ IsOpenServiceAdvisor: activeParentLinkResult.active });

            if (activeParentLinkResult.parentName == ActiveParentLink.WareHouse)
                this.setState({ IsOpenWareHouse: activeParentLinkResult.active });

            if (activeParentLinkResult.parentName == ActiveParentLink.CustomerCare)
                this.setState({ IsOpenCustomerCare: activeParentLinkResult.active });

            if (activeParentLinkResult.parentName == ActiveParentLink.Setting)
                this.setState({ IsOpenSetting: activeParentLinkResult.active });
        }

        let logoutActionResult = nextProps.logoutResult.target;
        if (logoutActionResult != this.props.logoutResult.target) {
            Cookie.deleteCookie(Constants.AUTH_COOKIE_NAME);
            location.href = "/";
        }

        let getInformationResult = nextProps.garageInformationResult.target;
        if (getInformationResult.Success) {
            this.setResponseState(getInformationResult.Data);
        }
    }

    setResponseState(dataResponse: any) {
        this.setState({
            IsOpenGeneralCategory: false,
            IsOpenServiceAdvisor: false,
            IsOpenWareHouse: false,
            IsOpenCustomerCare: false,
            IsOpenSetting: false,
            Garage: {
                Id: dataResponse.Id,
                Website: dataResponse.Website,
                ExpireDate: dataResponse.ExpireDate,
                Name: dataResponse.Name,
                ShortName: dataResponse.ShortName,
                Address: dataResponse.Address,
                District: dataResponse.District,
                Ward: dataResponse.Ward,
                Phone: dataResponse.Phone,
                Logo: dataResponse.Logo,
                SmsPhoneNumber: dataResponse.SmsPhoneNumber,
                EmailSchedule: dataResponse.EmailSchedule
            }
        });
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element text-center"> <span>
                                <img alt="image" className="img-circle" height="60" width="60" src={this.state.Garage.Logo} />
                            </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                    <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{this.state.Garage.Name}</strong>
                                    </span> <span className="text-muted text-xs block">Admin<b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    {/* <li><a href="profile.html">Hồ sơ</a></li> */}
                                    <li><a href="contacts.html">Liên hệ</a></li>
                                    <li><a href="mailbox.html">Hộp thư</a></li>
                                    <li className="divider"></li>
                                    <li><a href="javascript:void(0);" onClick={this.onLogout}>Đăng xuất</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                <span>
                                    <img alt="image" className="img-circle" height="60" width="60" src={this.state.Garage.Logo} />
                                </span>
                                <div>
                                    <strong className="font-bold">{this.state.Garage.ShortName}</strong>
                                </div>
                            </div>
                        </li>
                        <li className={this.bindActiveClassForHeaderParentLink(this.state.IsOpenGeneralCategory)}>
                            <a href="javascript:void(0);">
                                <i className="fa fa-bar-chart-o"></i>
                                <span className="nav-label">Dùng chung</span>
                                <span className="fa arrow"></span>
                            </a>
                            <ul className={this.bindCollapseClassForContentParentLink(this.state.IsOpenGeneralCategory)}>
                                <li>
                                    <NavLink to="/admin/manufacturers" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Hãng xe</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/models" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Dòng xe</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/years" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Năm sản xuất</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/service-types" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Loại dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/public-service" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Công dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/public-service-unit" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Đơn vị tính - Dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/customer-types" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Nhóm khách hàng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/customers" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Khách hàng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/suppliers" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Nhà cung cấp</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/employees" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Nhân viên</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/categories" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Danh mục phụ tùng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/accessaries" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Phụ tùng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/accessaries-unit" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.GeneralCategory) }}>Đơn vị tính - Phụ tùng</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.bindActiveClassForHeaderParentLink(this.state.IsOpenServiceAdvisor)}>
                            <a href="mailbox.html"><i className="fa fa-envelope"></i> <span className="nav-label">Cố vấn dịch vụ </span><span className="fa arrow"></span></a>
                            <ul className={this.bindCollapseClassForContentParentLink(this.state.IsOpenServiceAdvisor)}>
                                <li>
                                    <NavLink to="/admin/create-quote" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor) }}>Tạo báo giá</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/waiting-quotes/1" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor) }}>Báo giá chờ xử lý</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/receipts-bill/" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor) }}>Phiếu thu</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/payslip-bill/" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor) }}>Phiếu chi</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/bills" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.ServiceAdvisor) }}>Tra cứu thu / chi</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.bindActiveClassForHeaderParentLink(this.state.IsOpenCustomerCare)}>
                            <a href="#"><i className="fa fa-edit"></i> <span className="nav-label">Chăm sóc khách hàng</span><span className="fa arrow"></span></a>
                            <ul className={this.bindCollapseClassForContentParentLink(this.state.IsOpenCustomerCare)}>
                                <li>
                                    <NavLink to="/admin/lookup-maitaining-service-quotation/maitaining-service" replace={true} activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.CustomerCare) }}>Xe đang làm dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/lookup-transaction-history-quotation/transaction-history" replace={true} activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.CustomerCare) }}>Lịch sử giao dịch</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/lookup-maintenance-expire-quotation/maintenance-expire" replace={true} activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.CustomerCare) }}>Xe sắp hết hạn bảo dưỡng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/setup-auto-remind" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.CustomerCare) }}>Thiết lập nhắc nhở bão dưỡng tự động</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/revenue-sales" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.CustomerCare) }}>Doanh số bán hàng</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.bindActiveClassForHeaderParentLink(this.state.IsOpenSetting)}>
                            <a href="#"><i className="fa fa-desktop"></i> <span className="nav-label">Thiết lập</span> <span className="fa arrow"></span></a>
                            <ul className={this.bindCollapseClassForContentParentLink(this.state.IsOpenSetting)}>
                                <li>
                                    <NavLink exact to="/admin" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Bảng tin</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/settings" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Thiết lập Garage</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/print-template" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Quản lý mẫu in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/members" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Quản lý người dùng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/branches" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Quản lý chi nhánh</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/history" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Lịch sử thao tác</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/role-right-module" activeClassName="active"
                                        onClick={() => { this.openOrCollapseParentLink(ActiveParentLink.Setting) }}>Phân quyền</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        logoutResult: state.LogoutReducer,
        activeSettingResult: state.AsideReducer,
        garageInformationResult: state.GarageInformationReducer
    }
}

function mapDispatchToProps(dispatch: any, { params }) {
    let logOutAction = new LogoutAction();
    let activeAction = new AsideAction();
    let garageInfoAction = new FetchAction.GarageInformationAction();

    return {
        getInfoGarage: (entry: any) => dispatch(garageInfoAction.fetch(entry)),
        logout: () => dispatch(logOutAction.post()),
        setActiveParentLink: (parentName: string, active?: boolean) => dispatch(activeAction.setActiveLinkAction({ parentName, active }))
    }
}

const connectedAside = withRouter<any>(connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(Aside));
export { connectedAside as Aside }
