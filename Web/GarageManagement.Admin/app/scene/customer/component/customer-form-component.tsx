import React from "react";
import GeneralState from "../../../core/state/general-state";
import FormState from "../../../core/state/form-state";
import StateResponse from "../state/response-state-handler";
import ToastHelper from "../../../component/common-helper/toast-helper";
import { ICustomer } from "../state/customer-state";
import { IFormProps, CombinedProps, CustomerFormMapping } from "../redux-mapping/customer-form-mapping";
import { CarForm } from "../../car/component/car-form-component";
import { GeneralFormComponent } from "../../../core/component/base-form-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { 
    TextboxWithLabelHorizontal, 
    TextboxReadOnlyWithLabelHorizontal 
} from "../../../component/control/textbox-component";
import * as Locale from "core/locale/component/locale";

interface FormState {
    IsValid?: boolean,
    HeaderTabs: Array<FormState.Tab>,
    ContentTabs: Array<FormState.Tab>,
    Customer: ICustomer,
    Branches: Array<GeneralState.Branch>,
    CustomerTypes: Array<GeneralState.CustomerType>,
    Provinces: Array<any>,
    Districts: Array<any>,
    Wards: Array<any>
}

class CustomerForm extends GeneralFormComponent<CombinedProps, FormState, ICustomer> {
    private provinceState: boolean;

    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("Phone", effectForAllValues);
        this.errors.add("Email", true);
        this.errors.add("BranchId", effectForAllValues);
        this.errors.add("CustomerTypeId", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            Customer: this.initCustomer(),
            HeaderTabs: this.initHeaderTabs(),
            ContentTabs: this.initContentTabs(),
            Branches: [],
            CustomerTypes: [],
            Provinces: [],
            Districts: [],
            Wards: []
        }
    }

    initCustomer() {
        const customer: ICustomer = {
            Id: "",
            GenerateId: 0,
            CustomerExchangeId: 0,
            Name: "",
            Phone: "",
            Fax: "",
            Email: "",
            Website: "",
            Address: "",
            Province: "",
            District: "",
            Ward: "",
            TaxCode: "",
            BankAccount: "",
            BankName: "",
            IsSupplier: false,
            IsOwner: false,
            BranchId: "",
            BranchName: "",
            CustomerTypeId: 0,
            CustomerTypeName: "",
            ContactName: "",
            ContactPhone: "",
            ContactPosition: ""
        };
        return customer;
    }
    
    initHeaderTabs() {
        return new Array<FormState.Tab>(
            new FormState.Tab("Customer", "active"),
            new FormState.Tab("Car", "")
        );
    }

    initContentTabs() {
        return new Array<FormState.Tab>(
            new FormState.Tab("Customer", "tab-pane active"),
            new FormState.Tab("Car", "tab-pane")
        );
    }

    closeModal() {
        if (this.props.closeModal)
            this.props.closeModal();
    }

    reloadCarFormInfo(customerId: string) {
        const carFormComponent: any = this.refs["carFormReference"];
        if (carFormComponent) {
            this.switchTab("Car");
            carFormComponent.wrappedInstance.loadOwnedCarsFromParent(customerId);
        }
    }

    onSave(event: any): any {
        this.onCreateOrUpdate(event, this.state.Customer.GenerateId, this.state.Customer);
    }

    componentDidMount() {
        this.props.getCustomer();
        this.props.getProvince();
        this.props.getDistrict();
        this.props.getWard();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(
            this.props.customerCreateResult.target, 
            nextProps.customerCreateResult.target,
            null,
            () => {
                const errorMessage = nextProps.customerCreateResult.target.Message[0].ErrorMessage;
                this.showErrorFromServerWhenCreateOrEditCustomer(errorMessage);
            });
        this.handleResponseFromServerForEditAction(
            this.props.customerEditResult.target, 
            nextProps.customerEditResult.target,
            null,
            () => {
                const errorMessage = nextProps.customerEditResult.target.Message[0].ErrorMessage;
                this.showErrorFromServerWhenCreateOrEditCustomer(errorMessage);
            });
        this.setDetailCustomerResponseFromServer(nextProps);
        this.setLocaleResponseFromServer(nextProps);
    }

    setDetailCustomerResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.customerResult.target;
        const isChanged = this.isPropsChanged(this.props.customerResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailCustomerResponse(
                newResult.Data, 
                () => {
                    if (this.state.Customer.GenerateId > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    setLocaleResponseFromServer(nextProps: IFormProps) {
        const provinceResult = nextProps.provinceResult.target;
        if (this.isPropsChanged(this.props.provinceResult.target, provinceResult))
            this.setState({ Provinces: provinceResult });

            const districtResult = nextProps.districtResult.target;
        if (this.isPropsChanged(this.props.districtResult.target, districtResult))
            this.setState({ Districts: districtResult });

            const wardResult = nextProps.wardResult.target;
        if (this.isPropsChanged(this.props.wardResult.target, wardResult))
            this.setState({ Wards: wardResult });
    }

    showErrorFromServerWhenCreateOrEditCustomer(errorMessage: string) {
        if (errorMessage === "Existed Customer Name") {
            ToastHelper.notifyError("Đã tồn tại tên khách hàng này trong hệ thống. Vui lòng nhập tên khác");
        } else if (errorMessage === "Existed Customer Email") {
            ToastHelper.notifyError("Đã tồn tại email này trong hệ thống. Vui lòng nhập email khác.");
        } else {
            ToastHelper.notifyError(errorMessage);
        }
    }
    
    renderBranches() {
        return (
            this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (<option value={branch.Id} key={branch.Id} data-short-name={branch.ShortName}>{branch.Name}</option>)
                }) : null
        )
    }

    renderCustomerTypes() {
        return (
            this.state.CustomerTypes.length ?
                this.state.CustomerTypes.map((customerType, i) => {
                    return (<option value={customerType.Id} key={customerType.Id}>{customerType.Name}</option>)
                }) : null
        )
    }

    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Customer: this.inputInteraction.onBindTarget(event.target, this.state.Customer) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setCarIdBaseOnSelectedBranch(event.target);

        this.setState({
            Customer: this.selectInteraction.onBindTarget(event.target, this.state.Customer) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    setCarIdBaseOnSelectedBranch(target: any) {
        if (target.name == "BranchId") {
            const customerIdSegments: Array<string> = this.state.Customer.Id.split("-");
            if (customerIdSegments[0] != "") {
                customerIdSegments[0] = "";
                this.state.Customer.Id = customerIdSegments.join("-");
            }
            const shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Customer.Id = shortName.concat(this.state.Customer.Id);
        }
    }

    setClassTabHeader(tabName: string) {
        const header = this.state.HeaderTabs.find(x => x.Name === tabName);
        return header.Class;
    }

    setClassTabContent(tabName: string) {
        const content = this.state.ContentTabs.find(x => x.Name === tabName);
        return content.Class;
    }
    
    switchTab(tabName: string) {
        this.setState({ 
            HeaderTabs: this.setTabHeaderActive(tabName),
            ContentTabs: this.setTabContentActive(tabName)
        });
    }

    setTabHeaderActive(tabName: string) {
        const headerTabs = this.initHeaderTabs();
        headerTabs.forEach((tab: FormState.Tab) => {
            if (tab.Name == tabName) 
                tab.Class = "active";
        });
        return headerTabs;
    }

    setTabContentActive(tabName: string) {
        const contentTabs = this.initContentTabs();
        contentTabs.forEach((tab: FormState.Tab) => {
            if (tab.Name == tabName) 
                tab.Class = tab.Class.concat(" active");
        });
        return contentTabs;
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
                        <li className={this.setClassTabHeader("Customer")} onClick={this.switchTab.bind(this, "Customer")}>
                            <a>Khách hàng</a>
                        </li>
                        <li className={this.setClassTabHeader("Car")} onClick={this.switchTab.bind(this, "Car")}>
                            <a>Xe</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="customer-tab" className={this.setClassTabContent("Customer")}>
                            <div className="panel-body">
                                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                                    <TextboxReadOnlyWithLabelHorizontal labelText="Mã khách hàng" name="Id"
                                                                        value={this.state.Customer.Id} />

                                    <SelectWithLabelHorizontal labelText="Chi nhánh" name="BranchId" 
                                                    disabled={this.state.Customer.GenerateId > 0} 
                                                    value={this.state.Customer.BranchId}
                                                    loadDataFunc={this.renderBranches} 
                                                    event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                                    <Hr />
                                    <SelectWithLabelHorizontal labelText="Nhóm khách hàng" name="CustomerTypeId" 
                                                    value={this.state.Customer.CustomerTypeId}
                                                    loadDataFunc={this.renderCustomerTypes} 
                                                    event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Name" labelText="Họ và tên" 
                                                    value={this.state.Customer.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Phone" labelText="Điện thoại"
                                                    value={this.state.Customer.Phone} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, true, 10))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Fax" labelText="Fax"
                                                    value={this.state.Customer.Fax}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateNumberForInput(name, value))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Email" labelText="Email"
                                                    value={this.state.Customer.Email}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateEmailForInput(name, value))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Address" labelText="Địa chỉ"
                                                    value={this.state.Customer.Address}
                                                    event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <SelectWithLabelHorizontal name="Province" labelText="Tỉnh thành"
                                                    value={this.state.Customer.Province}
                                                    loadDataFunc={() => Locale.renderProvince(this.state.Provinces)}
                                                    event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <SelectWithLabelHorizontal name="District" labelText="Quận / Huyện"
                                                    value={this.state.Customer.District}
                                                    loadDataFunc={Locale.renderDistrict.bind(this, this.state.Districts, this.state.Customer.Province)}
                                                    event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <SelectWithLabelHorizontal name="Ward" labelText="Phường / Xã"
                                                    value={this.state.Customer.Ward}
                                                    loadDataFunc={() => {
                                                        return !this.provinceState && Locale.renderWard(this.state.Wards, this.state.Customer.District) || null;
                                                    }}
                                                    event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="TaxCode" labelText="Mã số thuế"
                                                    value={this.state.Customer.TaxCode}
                                                    event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, false, 20))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="BankAccount" labelText="Số tài khoản"
                                                    value={this.state.Customer.BankAccount}
                                                    event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, false, 20))} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="BankName" labelText="Ngân hàng"
                                                    value={this.state.Customer.BankName}
                                                    event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Website" labelText="Website"
                                                    value={this.state.Customer.Website}
                                                    event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <SubmitCenter disabled={!this.state.IsValid} />
                                </form>
                            </div>
                        </div>
                        <div id="car-tab" className={this.setClassTabContent("Car")} {...this.showCarWhenExistCustomer()}>
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

const connectedComponent = new CustomerFormMapping().connectComponent(CustomerForm);
export { connectedComponent as CustomerForm };
