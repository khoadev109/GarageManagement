import React from "react";
import { connect } from "react-redux";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import * as CommonModel from "../../model/common-model";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "../../../../core/library/extension/validation-combine";
class AccessaryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                if (this.state.Accessary.GenerateId == 0)
                    this.props.create(this.state.Accessary);
                else
                    this.props.edit(this.state.Accessary);
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
            this.setState({ Accessary: this.inputInteraction.onReceiveTarget(event.target, this.state.Accessary) }, doValidation);
        };
        this.selectEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            // set ServiceId base on selected branch
            if (name == "BranchId") {
                let accessaryIdSegments = this.state.Accessary.Id.split("-");
                if (accessaryIdSegments[0] != "") {
                    accessaryIdSegments[0] = "";
                    this.state.Accessary.Id = accessaryIdSegments.join("-");
                }
                this.state.Accessary.Id = value.concat(this.state.Accessary.Id);
            }
            this.setState({ Accessary: this.selectInteraction.onReceiveTarget(event.target, this.state.Accessary) }, doValidation);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.selectInteraction = new UserInteraction.SelectInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("Price", effectForAllValues);
        this.errors.Add("CostGoodSold", effectForAllValues);
        this.errors.Add("UnitId", effectForAllValues);
        this.errors.Add("BranchId", effectForAllValues);
        this.errors.Add("CategoryId", effectForAllValues);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
            Accessary: {
                Id: "",
                GenerateId: 0,
                Name: "",
                Image: "",
                BarCode: "",
                Price: 0,
                CostGoodSold: 0,
                OutOfStock: false,
                Description: "",
                CategoryId: 0,
                CategoryName: "",
                UnitId: 0,
                UnitName: "",
                BranchId: 0,
                BranchName: ""
            },
            Branches: new Array(),
            AccessariesUnits: new Array(),
            Categories: new Array(),
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getAccessary();
    }
    componentWillReceiveProps(nextProps) {
        let accessaryCreateAction = nextProps.accessaryCreateResult.target;
        if (accessaryCreateAction.Success) {
            alert("Tạo phụ tùng mới thành công!");
            // this.props.closeModal();
        }
        let accessaryEditResult = nextProps.accessaryEditResult.target;
        if (accessaryEditResult.Success) {
            alert("Cập nhật phụ tùng thành công!");
            // this.props.closeModal();
        }
        let result = nextProps.accessaryResult.target;
        if (result.Success)
            this.setResponseState(result.Data);
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: dataResponse.GenerateId > 0,
            LoadSucceed: true,
            Accessary: {
                Id: dataResponse.Id,
                GenerateId: dataResponse.GenerateId,
                Name: dataResponse.Name,
                Image: dataResponse.Image,
                BarCode: dataResponse.BarCode,
                Price: dataResponse.Price,
                CostGoodSold: dataResponse.CostGoodSold,
                OutOfStock: dataResponse.OutOfStock,
                Description: dataResponse.Description || "",
                CategoryId: dataResponse.CategoryId,
                CategoryName: dataResponse.CategoryName,
                UnitId: dataResponse.UnitId,
                UnitName: dataResponse.UnitName,
                BranchId: dataResponse.BranchId,
                BranchName: dataResponse.BranchName
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            AccessariesUnits: this.setResponseStateForAccessaryUnit(dataResponse.Units),
            Categories: this.setResponseStateForCategory(dataResponse.Categories),
            Errors: this.errors
        }, () => {
            if (this.state.Accessary.GenerateId > 0) {
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
    setResponseStateForAccessaryUnit(accessaryUnitsResponse) {
        let accessaryUnits = new Array();
        if (accessaryUnitsResponse) {
            accessaryUnitsResponse.map((accessaryUnit, i) => {
                accessaryUnits.push(new CommonModel.AccessaryUnit(accessaryUnit.Id, accessaryUnit.Name));
            });
        }
        return accessaryUnits;
    }
    setResponseStateForCategory(categoriesResponse) {
        let categories = new Array();
        if (categoriesResponse) {
            categoriesResponse.map((category, i) => {
                categories.push(new CommonModel.Category(category.Id, category.Name));
            });
        }
        return categories;
    }
    loadBranches() {
        if (this.state.LoadSucceed) {
            return (this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (React.createElement("option", { value: branch.Id, key: branch.Id, "data-short-name": branch.ShortName }, branch.Name));
                }) : null);
        }
    }
    loadAccessaryUnits() {
        if (this.state.LoadSucceed) {
            return (this.state.AccessariesUnits.length ?
                this.state.AccessariesUnits.map((accessaryUnit, i) => {
                    return (React.createElement("option", { value: accessaryUnit.Id, key: accessaryUnit.Id }, accessaryUnit.Name));
                }) : null);
        }
    }
    loadCategories() {
        if (this.state.LoadSucceed) {
            return (this.state.Categories.length ?
                this.state.Categories.map((category, i) => {
                    return (React.createElement("option", { value: category.Id, key: category.Id }, category.Name));
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
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 ph\u1EE5 t\u00F9ng"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.Accessary.Id }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Chi nh\u00E1nh"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", Object.assign({ className: "form-control m-b", name: "BranchId" }, this.state.Accessary.GenerateId > 0 && { "disabled": true }, { onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Accessary.BranchId }), this.loadBranches()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Danh m\u1EE5c"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", { className: "form-control m-b", name: "CategoryId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Accessary.CategoryId }, this.loadCategories()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u00EAn ph\u1EE5 t\u00F9ng"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Accessary.Name }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "\u0110\u01A1n v\u1ECB"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("select", { className: "form-control m-b", name: "UnitId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Accessary.UnitId }, this.loadAccessaryUnits()))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Gi\u00E1"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "Price", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 8), value: this.state.Accessary.Price }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Gi\u00E1 t\u1ED1t nh\u1EA5t"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("input", { type: "text", className: "form-control", name: "CostGoodSold", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 8), value: this.state.Accessary.CostGoodSold }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00F4 t\u1EA3"),
                        React.createElement("div", { className: "col-sm-9" },
                            React.createElement("textarea", { className: "form-control", name: "Description" /*cols={80}*/, rows: 10, onInput: e => this.inputEvent(e), value: this.state.Accessary.Description }))),
                    React.createElement("div", { className: "hr-line-dashed" }),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "col-sm-12 text-center" },
                            React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u")))))));
    }
}
function mapStateToProps(state) {
    return {
        accessaryResult: state.AccessaryReducer,
        accessaryEditResult: state.AccessaryEditReducer,
        accessaryCreateResult: state.AccessaryCreateReducer
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    let accessaryAction = new FetchAction.AccessaryAction();
    let accessaryEditAction = new PostAction.AccessaryEditAction();
    let accessaryCreateAction = new PostAction.AccessaryCreateAction();
    return {
        getAccessary: () => dispatch(accessaryAction.getAccessary(ownProps.accessaryId)),
        edit: (entry) => dispatch(accessaryEditAction.editAccessary(entry)),
        create: (entry) => dispatch(accessaryCreateAction.createNewAccessary(entry))
    };
}
const connectedAccessary = connect(mapStateToProps, mapDispatchToProps)(AccessaryForm);
export { connectedAccessary as AccessaryForm };
//# sourceMappingURL=accessary-form.js.map