import React from "react";
import { connect } from "react-redux";

import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import * as BaseComponent from "core/component/component";
import * as LocaleAction from "../../../../core/locale/action/fetch-action";

import { ICustomer } from "../../model/customer-model";
import { Branch } from "../../model/common-model";
import { CustomerType } from "../../model/common-model";
import { initializeCustomer } from "../../model/initialization";
import { setResponseStateForCustomer } from "../../model/response-state-transform";

import * as ToastHelper from "component/common/toast/toast";
import { Dictionary } from "core/library/dictionary";
import { FormInteraction } from "core/library/interaction/form-interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "core/library/extension/validation/validation-combine";
import { CarForm } from "../../../car/component/container/car-form";
import * as Locale from "core/locale/component/locale";

class Tab { constructor(public Name: string, public Class: string) { } }

interface ICustomerState {
    IsValid?: boolean,
    HeaderTabs: Array<Tab>,
    ContentTabs: Array<Tab>,
    Customer: ICustomer,
    Branches: Array<Branch>,
    CustomerTypes: Array<CustomerType>,
    Provinces: Array<any>,
    Districts: Array<any>,
    Wards: Array<any>,
    Errors: Dictionary.IKeyedCollection<boolean>
}

class CustomerForm extends React.Component<any, ICustomerState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private readonly errors: Dictionary.IKeyedCollection<boolean>;
    private readonly inputInteraction: FormInteraction.InputInteraction<ICustomer>;
    private readonly selectInteraction: FormInteraction.SelectInteraction<ICustomer>;
    private provinceState: boolean;

    constructor(props: any) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<ICustomer>();
        this.selectInteraction = new FormInteraction.SelectInteraction<ICustomer>();

        this.setInitialErrors(false);
        this.initializeState();
    }

    setInitialErrors(effectForAllValues: boolean) {
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("Phone", effectForAllValues);
        this.errors.Add("Email", true);
        this.errors.Add("BranchId", effectForAllValues);
        this.errors.Add("CustomerTypeId", effectForAllValues);
    }

    initializeState() {
        this.state = {
            IsValid: false,
            Customer: initializeCustomer(),
            HeaderTabs: this.initializeHeaderTabs(true),
            ContentTabs: this.initializeContentTabs(true),
            Branches: new Array<Branch>(),
            CustomerTypes: new Array<CustomerType>(),
            Provinces: Array<any>(),
            Districts: Array<any>(),
            Wards: Array<any>(),
            Errors: this.errors
        }
    }
    
    initializeHeaderTabs(activeFirstTab: boolean = false) {
        let firstTabClass = activeFirstTab ? "active" : "";

        return new Array<Tab>(
            new Tab("Customer", firstTabClass),
            new Tab("Car", "")
        );
    }

    initializeContentTabs(activeFirstTab: boolean = false) {
        let defaultClass = "tab-pane";
        let firstTabClass = activeFirstTab ? defaultClass.concat(" active"): defaultClass; 

        return new Array<Tab>(
            new Tab("Customer", firstTabClass),
            new Tab("Car", defaultClass)
        );
    }

    closeModal() {
        if (this.props.closeModal)
            this.props.closeModal();
    }

    onSave = (event: any) : any => {
        event.preventDefault();

        if (this.state.IsValid) {
            if (this.state.Customer.GenerateId == 0)
                this.props.create(this.state.Customer);
            else
                this.props.edit(this.state.Customer);
        }
    }

    componentDidMount() {
        this.props.getCustomer();
        this.props.getProvince();
        this.props.getDistrict();
        this.props.getWard();
    }

    componentWillReceiveProps(nextProps) {
        this.setResponseStateForCustomerCreate(nextProps);
        this.setResponseStateForCustomerEdit(nextProps);
        this.setResultForSpecifyCustomer(nextProps);
        this.setResultForLocale(nextProps);
    }
    
    setResponseStateForCustomerCreate(nextProps) {
        let customerCreateResult = nextProps.customerCreateResult.target;
        if (customerCreateResult != this.props.customerCreateResult.target) {
            if (customerCreateResult.Success) {                
                ToastHelper.notificationSuccess("Tạo mới khách hàng thành công!");

                this.setState({ Customer: setResponseStateForCustomer(customerCreateResult.Data) });
                this.reloadCarFormInfo(customerCreateResult.Data.Id);
            }
            else {
                if (customerCreateResult.Message)
                    this.showErrorFromServerWhenCreateOrEditCustomer(customerCreateResult.Message[0].ErrorMessage);
            }
        }
    }

    setResponseStateForCustomerEdit(nextProps) {
        let customerEditResult = nextProps.customerEditResult.target;
        if (customerEditResult != this.props.customerEditResult.target) {
            if (customerEditResult.Success) {                
                ToastHelper.notificationSuccess("Cập nhật khách hàng thành công!");

                this.setState({ Customer: setResponseStateForCustomer(customerEditResult.Data) });
                this.reloadCarFormInfo(customerEditResult.Data.Id);
            }
            else {
                if (customerEditResult.Message)
                    this.showErrorFromServerWhenCreateOrEditCustomer(customerEditResult.Message[0].ErrorMessage);
            }
        }
    }

    reloadCarFormInfo(customerId: string) {
        let carFormComponent: any = this.refs["carFormReference"];
        if (carFormComponent) {
            this.switchTab("Car");
            carFormComponent.wrappedInstance.loadOwnedCarsFromParent(customerId);
        }
    }

    showErrorFromServerWhenCreateOrEditCustomer(errorMessage: string) {
        if (errorMessage == "Existed Customer Name") {
            alert("Đã tồn tại tên khách hàng này trong hệ thống. Vui lòng nhập tên khác");
        } else if (errorMessage == "Existed Customer Email") {
            alert("Đã tồn tại email này trong hệ thống. Vui lòng nhập email khác.");
        } else {
            alert(errorMessage);
        }
    }
    
    setResultForLocale(nextProps) {
        let provinceResult = nextProps.provinceResult.target;
        if (provinceResult != this.props.provinceResult.target)
            this.setState({ Provinces: provinceResult });

        let districtResult = nextProps.districtResult.target;
        if (districtResult != this.props.districtResult.target)
            this.setState({ Districts: districtResult });

        let wardResult = nextProps.wardResult.target;
        if (wardResult != this.props.wardResult.target)
            this.setState({ Wards: wardResult });
    }

    setResultForSpecifyCustomer(nextProps) {
        let customerResult = nextProps.customerResult.target;
        if (customerResult != this.props.customerResult.target && customerResult.Success) {
            let dataResponse = customerResult.Data;

            this.setState({
                Customer: setResponseStateForCustomer(dataResponse),
                Branches: this.setResultForBranch(dataResponse.Branches),
                CustomerTypes: this.setResultForCustomerType(dataResponse.CustomerTypes),
                Errors: this.errors
            },
            () => {
                if (this.state.Customer.GenerateId > 0) {
                    this.setState({ IsValid: true });
                    this.setInitialErrors(true);
                }
            });
        }
    }

    setResultForBranch(branchesResponse) {
        let branches = new Array<Branch>();
        if (branchesResponse)
            branchesResponse.map((branch, i) => { branches.push(new Branch(branch.Id, branch.Name, branch.ShortName)); })
        return branches;
    }

    setResultForCustomerType(customerTypesResponse) {
        let customerTypes = new Array<CustomerType>();
        if (customerTypesResponse)
            customerTypesResponse.map((customerType, i) => { customerTypes.push(new CustomerType(customerType.Id, customerType.Name)); })
        return customerTypes;
    }

    loadBranches() {
        return (
            this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (<option value={branch.Id} key={branch.Id} data-short-name={branch.ShortName}>{branch.Name}</option>)
                }) : null
        )
    }

    loadCustomerTypes() {
        return (
            this.state.CustomerTypes.length ?
                this.state.CustomerTypes.map((customerType, i) => {
                    return (<option value={customerType.Id} key={customerType.Id}>{customerType.Name}</option>)
                }) : null
        )
    }
    
    checkValidOnEveryChange(name: string, valid: boolean) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }

    validateSelectRequired = (name: string, value: any) => {
        let isValid = this.selectInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputRequired = (name: string, value: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputNumber = (name: string, value: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidation.NumberValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputEmail = (name: string, value: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidation.EmailValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputNumberAndMaxLength = (name: string, value: any, required: boolean, valueCompare: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
        this.checkValidOnEveryChange(name, isValid);
    }

    inputEvent = (event: any, validation?: (name: string, value: any, required: boolean, valueCompare: any) => void,
        required?: boolean, valueToCompare?: any) => {

        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;

        this.setState({ Customer: this.inputInteraction.onReceiveTarget(event.target, this.state.Customer) }, doValidation);
    }
    
    selectEvent = (event: any, validation?: (name: string, value: any, required: boolean, valueCompare: any) => void,
        required?: boolean, valueToCompare?: any) => {

        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;

        this.setCarIdBaseOnSelectedBranch(event.target);

        this.setState({ Customer: this.selectInteraction.onReceiveTarget(event.target, this.state.Customer) }, doValidation);
    }
    
    setCarIdBaseOnSelectedBranch(target: any) {
        if (target.name == "BranchId") {
            let customerIdSegments: Array<string> = this.state.Customer.Id.split("-");
            if (customerIdSegments[0] != "") {
                customerIdSegments[0] = "";
                this.state.Customer.Id = customerIdSegments.join("-");
            }
            var shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Customer.Id = shortName.concat(this.state.Customer.Id);
        }
    }

    setHeaderTabClass(tabName: string) {
        let tab: Tab = this.state.HeaderTabs.find(x => x.Name == tabName);
        return tab ? tab.Class : "";
    }

    setContentTabClass(tabName: string) {
        let tab: Tab = this.state.ContentTabs.find(x => x.Name == tabName);
        return tab ? tab.Class : "";
    }

    switchTab(tabName: string) {
        this.setState({ 
            HeaderTabs: this.setActiveHeaderTab(tabName),
            ContentTabs: this.setActiveContentTab(tabName)
        });
    }

    setActiveHeaderTab(tabName: string) {
        let newTabsSet: Array<Tab> = this.initializeHeaderTabs();
        newTabsSet.forEach((tab: Tab) => {
            if (tab.Name == tabName) 
                tab.Class = "active";
        });
        return newTabsSet;
    }

    setActiveContentTab(tabName: string) {
        let newTabsSet: Array<Tab> = this.initializeContentTabs();
        newTabsSet.forEach((tab: Tab) => {
            if (tab.Name == tabName) 
                tab.Class = tab.Class.concat(" active");
        });
        return newTabsSet;
    }

    showCarWhenExistCustomer() {
        return this.state.Customer.Id == "" ? { "display": "none" } : {};
    }
    
    renderCarForm() {
        return <CarForm ref={"carFormReference"} isCreateNewCustomer={this.props.customerId == ""} 
                        branchId={this.state.Customer.BranchId}
                        customerExchangeId={this.state.Customer.CustomerExchangeId}
                        customerName={this.state.Customer.Name} selectedOwnedCarId={this.props.selectedOwnedCarId}
                        closeModal={this.props.closeModal} customerId={this.props.customerId} 
                        reloadCustomers={this.props.reloadCustomers}
                        reloadCustomerInfoFromQuotation={this.props.reloadCustomerInfoFromQuotation} />
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="tabs-container">
                    <ul className="nav nav-tabs">
                        <li className={this.setHeaderTabClass("Customer")} onClick={() => this.switchTab("Customer")}>
                            <a>Khách hàng</a>
                        </li>
                        <li className={this.setHeaderTabClass("Car")} onClick={() => this.switchTab("Car")}>
                            <a>Xe</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="customer-tab" className={this.setContentTabClass("Customer")}>
                            <div className="panel-body">
                                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                                    <div className="form-group" style={{ display: "none" }}>
                                        <label className="col-sm-3 control-label">Mã khách hàng</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" readOnly value={this.state.Customer.Id} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label required">Nhóm khách hàng</label>
                                        <div className="col-sm-9">
                                            <select className="form-control m-b" name="CustomerTypeId"
                                                onChange={e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value))}
                                                value={this.state.Customer.CustomerTypeId}>

                                                {this.loadCustomerTypes()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label required">Họ và tên</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Name"
                                                onInput={e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value))}
                                                value={this.state.Customer.Name} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label required">Điện thoại</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Phone"
                                                onInput={e => this.inputEvent(e,
                                                    (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 10)}
                                                value={this.state.Customer.Phone} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Fax</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Fax"
                                                onInput={e => this.inputEvent(e)} value={this.state.Customer.Fax} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Email"
                                                onInput={e => this.inputEvent(e, (name, value) => this.validateInputEmail(name, value))}
                                                value={this.state.Customer.Email} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Địa chỉ</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Address"
                                                   onInput={e => this.inputEvent(e)} value={this.state.Customer.Address} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Tỉnh thành</label>
                                        <div className="col-sm-9">
                                        <select className="form-control m-b" name="Province"
                                                onChange={e => this.selectEvent(e)} value={this.state.Customer.Province}>
                                            <option value="">Chọn Tỉnh thành</option>
                                            {Locale.renderProvince(this.state.Provinces)}
                                        </select>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Quận / Huyện</label>
                                        <div className="col-sm-9">
                                        <select className="form-control m-b" name="District"
                                            onChange={e => this.selectEvent(e)}
                                            value={this.state.Customer.District}>
                                            <option value="">Chọn Quận/Huyện</option>
                                            {Locale.renderDistrict(this.state.Districts, this.state.Customer.Province)}
                                        </select>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Phường / Xã</label>
                                        <div className="col-sm-9">
                                        <select className="form-control m-b" name="Ward"
                                            onChange={e => this.selectEvent(e)}
                                            value={this.state.Customer.Ward}>
                                            <option value="">Chọn Phường/Xã</option>
                                            { !this.provinceState && Locale.renderWard(this.state.Wards, this.state.Customer.District) || null }
                                        </select>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Mã số thuế</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="TaxCode"
                                                onInput={e => this.inputEvent(e,
                                                    (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10)}
                                                value={this.state.Customer.TaxCode} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Số tài khoản</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="BankAccount"
                                                onInput={e => this.inputEvent(e,
                                                    (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10)}
                                                value={this.state.Customer.BankAccount} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Ngân hàng</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="BankName"
                                                onInput={e => this.inputEvent(e)} value={this.state.Customer.BankName} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Website</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="Website"
                                                onInput={e => this.inputEvent(e)} value={this.state.Customer.Website} />
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group">
                                        <div className="col-sm-12 text-center">
                                            <button className="btn btn-primary" disabled={!this.state.IsValid} type="submit">Lưu</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="car-tab" className={this.setContentTabClass("Car")} {...this.showCarWhenExistCustomer()}>
                            <div className="panel-body">
                                {this.renderCarForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        customerId: ownProps.customerId,
        selectedOwnedCarId: ownProps.selectedOwnedCarId,
        customerResult: state.CustomerReducer,
        customerEditResult: state.CustomerEditReducer,
        customerCreateResult: state.CustomerCreateReducer,
        provinceResult: state.ProvincesReducer,
        districtResult: state.DistrictsReducer,
        wardResult: state.WardsReducer
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    let specifyCustomerAction = new FetchAction.CustomerAction();
    let customerEditAction = new PostAction.CustomerEditAction();
    let customerCreateAction = new PostAction.CustomerCreateAction();
    let provinceAction = new LocaleAction.ProvinceAction();
    let districtAction = new LocaleAction.DistrictAction();
    let wardAction = new LocaleAction.WardAction();

    return {
        closeModal: ownProps.closeModal,
        reloadCustomers: ownProps.reloadCustomers,
        reloadCustomerInfoFromQuotation: ownProps.reloadCustomerInfoFromQuotation,
        getCustomer: () => dispatch(specifyCustomerAction.fetch(ownProps.customerId)),
        create: (entry: any) => dispatch(customerCreateAction.post(entry)),
        edit: (entry: any) => dispatch(customerEditAction.post(entry)),
        getProvince: (entry: any) => dispatch(provinceAction.fetch(entry)),
        getDistrict: (entry: any) => dispatch(districtAction.fetch(entry)),
        getWard: (entry: any) => dispatch(wardAction.fetch(entry))
    }
}

const connectedCustomer = connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
export { connectedCustomer as CustomerForm };
