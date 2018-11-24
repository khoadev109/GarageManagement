import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import { Branch } from "../../model/common-model";
import { CustomerType } from "../../model/common-model";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "../../../../core/library/extension/validation-combine";
class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                if (this.state.Customer.GenerateId == 0)
                    this.props.create(this.state.Customer);
                else
                    this.props.edit(this.state.Customer);
            }
        };
        this.validateSelectRequired = (name, value) => {
            let isValid = this.selectInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputRequired = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputNumber = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.NumberValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputEmail = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.EmailValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputNumberAndMaxLength = (name, value, required, valueCompare) => {
            let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ Customer: this.inputInteraction.onReceiveTarget(event.target, this.state.Customer) }, doValidation);
        };
        this.selectEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            //let shortName = this.getShortName(value, event.target.childNodes);
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            // set CustomerId base on selected branch
            if (name == "BranchId") {
                let customerIdSegments = this.state.Customer.Id.split("-");
                if (customerIdSegments[0] != "") {
                    customerIdSegments[0] = "";
                    this.state.Customer.Id = customerIdSegments.join("-");
                }
                this.state.Customer.Id = value.concat(this.state.Customer.Id);
            }
            this.setState({ Customer: this.selectInteraction.onReceiveTarget(event.target, this.state.Customer) }, doValidation);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.selectInteraction = new UserInteraction.SelectInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("Phone", effectForAllValues);
        this.errors.Add("Email", true);
        this.errors.Add("Address", effectForAllValues);
        this.errors.Add("Province", effectForAllValues);
        this.errors.Add("BranchId", effectForAllValues);
        this.errors.Add("CustomerTypeId", effectForAllValues);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
            Customer: {
                Id: "",
                GenerateId: 0,
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
                CustomerTypeName: ""
            },
            Branches: new Array(),
            CustomerTypes: new Array(),
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getCustomer();
    }
    componentWillReceiveProps(nextProps) {
        let customerCreateResult = nextProps.customerCreateResult.target;
        if (customerCreateResult.Success) {
            toast("Tạo mới khách hàng thành công");
        }
        let customerEditResult = nextProps.customerEditResult.target;
        if (customerEditResult.Success) {
            toast("Cập nhật khách hàng thành công");
        }
        let result = nextProps.customerResult.target;
        if (result.Success) {
            this.setResponseState(result.Data);
        }
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            LoadSucceed: true,
            Customer: {
                Id: dataResponse.Id,
                GenerateId: dataResponse.GenerateId,
                Name: dataResponse.Name,
                Phone: dataResponse.Phone,
                Fax: dataResponse.Fax,
                Email: dataResponse.Email,
                Website: dataResponse.Website,
                Address: dataResponse.Address,
                Province: dataResponse.Province,
                District: dataResponse.District,
                Ward: dataResponse.Ward,
                TaxCode: dataResponse.TaxCode,
                BankAccount: dataResponse.BankAccount,
                BankName: dataResponse.BankName,
                IsSupplier: dataResponse.IsSupplier,
                IsOwner: dataResponse.IsOwner,
                BranchId: dataResponse.BranchId,
                BranchName: dataResponse.BranchName,
                CustomerTypeId: dataResponse.CustomerTypeId,
                CustomerTypeName: dataResponse.CustomerTypeName
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            CustomerTypes: this.setResponseStateForCustomerType(dataResponse.CustomerTypes),
            Errors: this.errors
        }, () => {
            if (this.state.Customer.GenerateId > 0) {
                this.setState({ IsValid: true });
                this.setInitialErrors(true);
            }
        });
    }
    setResponseStateForBranch(branchesResponse) {
        let branches = new Array();
        if (branchesResponse) {
            branchesResponse.map((branch, i) => {
                branches.push(new Branch(branch.Id, branch.Name, branch.ShortName));
            });
        }
        return branches;
    }
    setResponseStateForCustomerType(customerTypesResponse) {
        let customerTypes = new Array();
        if (customerTypesResponse) {
            customerTypesResponse.map((customerType, i) => {
                customerTypes.push(new CustomerType(customerType.Id, customerType.Name));
            });
        }
        return customerTypes;
    }
    loadBranches() {
        if (this.state.LoadSucceed) {
            return (this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (React.createElement("option", { value: branch.Id, key: branch.Id, "data-short-name": branch.ShortName }, branch.Name));
                }) : null);
        }
    }
    loadCustomerTypes() {
        if (this.state.LoadSucceed) {
            return (this.state.CustomerTypes.length ?
                this.state.CustomerTypes.map((customerType, i) => {
                    return (React.createElement("option", { value: customerType.Id, key: customerType.Id }, customerType.Name));
                }) : null);
        }
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    getShortName(selectedValue, target) {
        target.forEach(function (currentElement) {
            if (currentElement.nodeValue == selectedValue) {
                return currentElement.dataset.shortName;
            }
        });
        return "";
    }
    showCarInformation() {
        return (
        // <CarForm />
        React.createElement("div", null, "Th\u00F4ng tin xe"));
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ibox-content" },
                React.createElement("div", { className: "wizard" },
                    React.createElement("div", { className: "steps clearfix" },
                        React.createElement("ul", { role: "tablist" },
                            React.createElement("li", { role: "tab", className: "first current" },
                                React.createElement("a", { id: "form-t-0" /*href="#form-p-0"*/ }, "Kh\u00E1ch h\u00E0ng")),
                            React.createElement("li", { role: "tab", className: "disabled" },
                                React.createElement("a", { id: "form-t-1" /*href="#form-p-1"*/ }, "Xe")))),
                    React.createElement("div", { className: "content clearfix" },
                        React.createElement("fieldset", { id: "form-p-0", role: "tabpanel", className: "body current" },
                            React.createElement("h2", null, "Th\u00F4ng tin kh\u00E1ch h\u00E0ng"),
                            React.createElement("div", { className: "ibox-content" },
                                React.createElement("form", { method: "post", className: "form-horizontal", onSubmit: this.onSave },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 kh\u00E1ch h\u00E0ng"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.Customer.Id }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Chi nh\u00E1nh"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("select", Object.assign({ className: "form-control m-b", name: "BranchId" }, this.state.Customer.GenerateId > 0 && { "disabled": true }, { onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Customer.BranchId }), this.loadBranches()))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Nh\u00F3m kh\u00E1ch h\u00E0ng"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("select", { className: "form-control m-b", name: "CustomerTypeId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Customer.CustomerTypeId }, this.loadCustomerTypes()))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "H\u1ECD v\u00E0 t\u00EAn"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Customer.Name }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "\u0110i\u1EC7n tho\u1EA1i"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Phone", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 20), value: this.state.Customer.Phone }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Fax"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Fax", onInput: e => this.inputEvent(e), value: this.state.Customer.Fax }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Email"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Email", onInput: e => this.inputEvent(e, (name, value) => this.validateInputEmail(name, value)), value: this.state.Customer.Email }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "\u0110\u1ECBa ch\u1EC9"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Address", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Customer.Address }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u1EC9nh th\u00E0nh"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Province", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Customer.Province }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Qu\u1EADn / Huy\u1EC7n"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "District", onInput: e => this.inputEvent(e), value: this.state.Customer.District }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Ph\u01B0\u1EDDng / X\u00E3"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Ward", onInput: e => this.inputEvent(e), value: this.state.Customer.Ward }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 s\u1ED1 thu\u1EBF"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "TaxCode", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10), value: this.state.Customer.TaxCode }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "S\u1ED1 t\u00E0i kho\u1EA3n"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "BankAccount", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10), value: this.state.Customer.BankAccount }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Ng\u00E2n h\u00E0ng"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "BankName", onInput: e => this.inputEvent(e), value: this.state.Customer.BankName }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label" }, "Website"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Website", onInput: e => this.inputEvent(e), value: this.state.Customer.Website }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("div", { className: "col-sm-12 text-center" },
                                            React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u")))))),
                        React.createElement("fieldset", { id: "form-p-1", role: "tabpanel", className: "body", style: { display: "none" } }, this.showCarInformation()))))));
    }
}
const mapStateToProps = (state) => {
    return {
        customerResult: state.CustomerReducer,
        customerEditResult: state.CustomerEditReducer,
        customerCreateResult: state.CustomerCreateReducer
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    let customerAction = new FetchAction.CustomerAction();
    let customerEditAction = new PostAction.CustomerEditAction();
    let customerCreateAction = new PostAction.CustomerCreateAction();
    return {
        getCustomer: () => dispatch(customerAction.getCustomer(ownProps.customerId)),
        create: (entry) => dispatch(customerCreateAction.createNewCustomer(entry)),
        edit: (entry) => dispatch(customerEditAction.editCustomer(entry))
    };
};
const connectedCustomer = connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
export { connectedCustomer as CustomerForm };
//# sourceMappingURL=customer-form.js.map