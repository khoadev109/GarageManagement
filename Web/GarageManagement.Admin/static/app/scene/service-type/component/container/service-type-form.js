import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
class ServiceTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                if (this.state.ServiceType.Id == 0)
                    this.props.create(this.state.ServiceType);
                else
                    this.props.edit(this.state.ServiceType);
            }
        };
        this.validateInputRequired = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ ServiceType: this.inputInteraction.onReceiveTarget(event.target, this.state.ServiceType) }, doValidation);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Name", effectForAllValues);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
            ServiceType: {
                Id: 0,
                Name: "",
                Description: "",
            },
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getServiceType();
    }
    componentWillReceiveProps(nextProps) {
        let serviceTypeCreateResult = nextProps.serviceTypeCreateResult.target;
        if (serviceTypeCreateResult.Success) {
            toast("Tạo loại dịch vụ mới thành công!");
            // this.props.closeModal();
        }
        let serviceTypeEditResult = nextProps.serviceTypeEditResult.target;
        if (serviceTypeEditResult.Success) {
            toast("Cập nhật loại dịch vụ thành công!");
            // this.props.closeModal();
        }
        let result = nextProps.serviceTypeResult.target;
        if (result.Success)
            this.setResponseState(result.Data);
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: dataResponse.Id > 0,
            LoadSucceed: true,
            ServiceType: {
                Id: dataResponse.Id,
                Name: dataResponse.Name,
                Description: dataResponse.Description || ""
            },
            Errors: this.errors
        }, () => {
            if (this.state.ServiceType.Id > 0) {
                this.setState({ IsValid: true });
                this.setInitialErrors(true);
            }
        });
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
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 lo\u1EA1i d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.ServiceType.Id }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u00EAn lo\u1EA1i d\u1ECBch v\u1EE5"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.ServiceType.Name }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00F4 t\u1EA3"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Description", onInput: e => this.inputEvent(e), value: this.state.ServiceType.Description }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "col-sm-12 text-center" },
                            React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u")))))));
    }
}
const mapStateToProps = (state) => {
    return {
        serviceTypeResult: state.ServiceTypeReducer,
        serviceTypeEditResult: state.ServiceTypeEditReducer,
        serviceTypeCreateResult: state.ServiceTypeCreateReducer
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    let serviceTypeAction = new FetchAction.ServiceTypeAction();
    let serviceTypeEditAction = new PostAction.ServiceTypeEditAction();
    let serviceTypeCreateAction = new PostAction.ServiceTypeCreateAction();
    return {
        getServiceType: () => dispatch(serviceTypeAction.getServiceType(ownProps.serviceTypeId)),
        create: (entry) => dispatch(serviceTypeCreateAction.createNewServiceType(entry)),
        edit: (entry) => dispatch(serviceTypeEditAction.editServiceType(entry))
    };
};
const connectedServiceType = connect(mapStateToProps, mapDispatchToProps)(ServiceTypeForm);
export { connectedServiceType as ServiceTypeForm };
//# sourceMappingURL=service-type-form.js.map