import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import * as CommonModel from "../../model/common-model";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "../../../../core/library/extension/validation-combine";
class PublicServForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                if (this.state.PublicService.GenerateId == 0)
                    this.props.create(this.state.PublicService);
                else
                    this.props.edit(this.state.PublicService);
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
        this.validateInputNumberAndMaxLength = (name, value, required, valueCompare) => {
            let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ PublicService: this.inputInteraction.onReceiveTarget(event.target, this.state.PublicService) }, doValidation);
        };
        this.selectEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            // set ServiceId base on selected branch
            if (name == "BranchId") {
                let serviceIdSegments = this.state.PublicService.Id.split("-");
                if (serviceIdSegments[0] != "") {
                    serviceIdSegments[0] = "";
                    this.state.PublicService.Id = serviceIdSegments.join("-");
                }
                this.state.PublicService.Id = value.concat(this.state.PublicService.Id);
            }
            this.setState({ PublicService: this.selectInteraction.onReceiveTarget(event.target, this.state.PublicService) }, doValidation);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.selectInteraction = new UserInteraction.SelectInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("Cost", effectForAllValues);
        this.errors.Add("UnitId", effectForAllValues);
        this.errors.Add("BranchId", effectForAllValues);
        this.errors.Add("ServiceTypeId", effectForAllValues);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
            PublicService: {
                Id: "",
                GenerateId: 0,
                Name: "",
                Cost: 0,
                Description: "",
                ServiceTypeId: 0,
                ServiceTypeName: "",
                UnitId: 0,
                UnitName: "",
                BranchId: 0,
                BranchName: ""
            },
            Branches: new Array(),
            ServiceUnits: new Array(),
            ServiceTypes: new Array(),
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getService();
    }
    componentWillReceiveProps(nextProps) {
        let serviceCreateResult = nextProps.serviceCreateResult.target;
        if (serviceCreateResult.Success) {
            toast("Tạo dịch vụ mới thành công!");
            // this.props.closeModal();
        }
        let serviceEditResult = nextProps.serviceEditResult.target;
        if (serviceEditResult.Success) {
            toast("Cập nhật dịch vụ thành công!");
            // this.props.closeModal();
        }
        let result = nextProps.serviceResult.target;
        if (result.Success)
            this.setResponseState(result.Data);
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            LoadSucceed: true,
            PublicService: {
                Id: dataResponse.Id,
                GenerateId: dataResponse.GenerateId,
                Name: dataResponse.Name,
                Cost: dataResponse.Cost,
                Description: dataResponse.Description || "",
                ServiceTypeId: dataResponse.ServiceTypeId,
                ServiceTypeName: dataResponse.ServiceTypeName,
                UnitId: dataResponse.UnitId,
                UnitName: dataResponse.UnitName,
                BranchId: dataResponse.BranchId,
                BranchName: dataResponse.BranchName
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            ServiceUnits: this.setResponseStateForServiceUnit(dataResponse.Units),
            ServiceTypes: this.setResponseStateForServiceType(dataResponse.ServiceTypes),
            Errors: this.errors
        }, () => {
            if (this.state.PublicService.GenerateId > 0) {
                this.setState({ IsValid: true });
                this.setInitialErrors(true);
            }
        });
    }
    setResponseStateForBranch(branchesResponse) {
        let branches = new Array();
        if (branchesResponse) {
            branchesResponse.map((branch, i) => {
                branches.push(new CommonModel.Branch(branch.Id, branch.Name, branch.ShortName));
            });
        }
        return branches;
    }
    setResponseStateForServiceUnit(serviceUnitsResponse) {
        let serviceUnits = new Array();
        if (serviceUnitsResponse) {
            serviceUnitsResponse.map((serviceUnit, i) => {
                serviceUnits.push(new CommonModel.ServiceType(serviceUnit.Id, serviceUnit.Name));
            });
        }
        return serviceUnits;
    }
    setResponseStateForServiceType(serviceTypesResponse) {
        let serviceTypes = new Array();
        if (serviceTypesResponse) {
            serviceTypesResponse.map((serviceType, i) => {
                serviceTypes.push(new CommonModel.ServiceType(serviceType.Id, serviceType.Name));
            });
        }
        return serviceTypes;
    }
    loadBranches() {
        if (this.state.LoadSucceed) {
            return (this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (React.createElement("option", { value: branch.Id, key: branch.Id, "data-short-name": branch.ShortName }, branch.Name));
                }) : null);
        }
    }
    loadServiceUnits() {
        if (this.state.LoadSucceed) {
            return (this.state.ServiceUnits.length ?
                this.state.ServiceUnits.map((serviceUnit, i) => {
                    return (React.createElement("option", { value: serviceUnit.Id, key: serviceUnit.Id }, serviceUnit.Name));
                }) : null);
        }
    }
    loadServiceTypes() {
        if (this.state.LoadSucceed) {
            return (this.state.ServiceTypes.length ?
                this.state.ServiceTypes.map((serviceType, i) => {
                    return (React.createElement("option", { value: serviceType.Id, key: serviceType.Id }, serviceType.Name));
                }) : null);
        }
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ibox-content" },
                React.createElement("form", { method: "post", className: "form-horizontal", onSubmit: this.onSave },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.PublicService.Id }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Chi nh\u00E1nh"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", Object.assign({ className: "form-control m-b", name: "BranchId" }, this.state.PublicService.GenerateId > 0 && { "disabled": true }, { onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.PublicService.BranchId }), this.loadBranches()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "\u0110\u01A1n v\u1ECB"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", { className: "form-control m-b", name: "UnitId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.PublicService.UnitId }, this.loadServiceUnits()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Lo\u1EA1i d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", { className: "form-control m-b", name: "ServiceTypeId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.PublicService.ServiceTypeId }, this.loadServiceTypes()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u00EAn d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.PublicService.Name }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Gi\u00E1 d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Cost", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 8), value: this.state.PublicService.Cost }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00F4 t\u1EA3"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("textarea", { className: "form-control", name: "Description" /*cols={80}*/, rows: 10, onInput: e => this.inputEvent(e), value: this.state.PublicService.Description }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "col-sm-12 text-center" },
                            React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u")))))));
    }
}
function mapStateToProps(state) {
    return {
        serviceResult: state.PublicServReducer,
        serviceEditResult: state.PublicServEditReducer,
        serviceCreateResult: state.PublicServCreateReducer
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    let serviceAction = new FetchAction.PublicServAction();
    let serviceEditAction = new PostAction.PublicServEditAction();
    let serviceCreateAction = new PostAction.PublicServCreateAction();
    return {
        getService: () => dispatch(serviceAction.getService(ownProps.serviceId)),
        edit: (entry) => dispatch(serviceEditAction.editService(entry)),
        create: (entry) => dispatch(serviceCreateAction.createNewService(entry))
    };
}
const connectedPublicService = connect(mapStateToProps, mapDispatchToProps)(PublicServForm);
export { connectedPublicService as PublicServivceForm };
// export default connect( mapStateToProps, mapDispatchToProps)(this.PublicServivceForm);
//# sourceMappingURL=service-form.js.map