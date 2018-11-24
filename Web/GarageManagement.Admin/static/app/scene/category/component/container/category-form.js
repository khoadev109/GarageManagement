import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import { Category } from "../../model/category-model";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "../../../../core/library/extension/validation-combine";
class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                if (this.state.Category.Id == -1)
                    this.props.create(this.state.Category);
                else
                    this.props.edit(this.state.Category);
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
            this.setState({ Category: this.inputInteraction.onReceiveTarget(event.target, this.state.Category) }, doValidation);
        };
        this.selectEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ Category: this.selectInteraction.onReceiveTarget(event.target, this.state.Category) }, doValidation);
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.selectInteraction = new UserInteraction.SelectInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("ParentId", effectForAllValues);
        this.errors.Add("ParentName", effectForAllValues);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
            Category: {
                Id: this.props.categoryId,
                Name: "",
                ParentId: 0,
                ParentName: ""
            },
            Parent: new Array(),
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getCategory();
        this.props.getParentCategories();
    }
    componentWillReceiveProps(nextProps) {
        let categoryCreateResult = nextProps.categoryCreateResult.target;
        if (categoryCreateResult.Success) {
            toast("Tạo mới danh mục thành công");
        }
        let categoryEditResult = nextProps.categoryEditResult.target;
        if (categoryEditResult.Success) {
            toast("Cập nhật danh mục thành công");
        }
        let result = nextProps.categoryResult.target;
        if (result.Success) {
            this.setResponseState(result.Data);
        }
        let parentResult = nextProps.parentCategoriesResult.target;
        if (parentResult.Success) {
            this.setResponseStateForParent(parentResult.Data);
        }
    }
    setResponseStateForParent(parentResponse) {
        let parents = new Array();
        if (parentResponse) {
            //parentResponse = parentResponse.filter(x => x.Id != this.state.Category.Id && x.Id != this.state.Category.ParentId)
            parentResponse.map((parent, i) => {
                parents.push(new Category(parent.Id, parent.Name));
            });
        }
        this.setState({
            Parent: parents
        });
    }
    setResponseState(dataResponse) {
        this.setState({
            LoadSucceed: true,
            Category: {
                Id: dataResponse.Id,
                Name: dataResponse.Name,
                ParentId: dataResponse.ParentId,
                ParentName: dataResponse.ParentName
            },
            Errors: this.errors
        }, () => {
            this.setState({ IsValid: true });
            this.setInitialErrors(true);
        });
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    loadParentCategories() {
        return (this.state.Parent.length ?
            this.state.Parent.map((parent, i) => {
                return (React.createElement("option", { value: parent.Id, key: parent.Id }, parent.Name));
            }) : null);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ibox-content" },
                React.createElement("div", { className: "wizard" },
                    React.createElement("div", { className: "steps clearfix" },
                        React.createElement("ul", { role: "tablist" },
                            React.createElement("li", { role: "tab", className: "first current" },
                                React.createElement("a", { id: "form-t-0" }, "Danh m\u1EE5c")))),
                    React.createElement("div", { className: "content clearfix" },
                        React.createElement("fieldset", { id: "form-p-0", role: "tabpanel", className: "body current" },
                            React.createElement("h2", null, "Th\u00F4ng tin danh m\u1EE5c"),
                            React.createElement("div", { className: "ibox-content" },
                                React.createElement("form", { method: "post", className: "form-horizontal", onSubmit: this.onSave },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u00EAn danh m\u1EE5c"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Category.Name }))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { className: "col-sm-3 control-label required" }, "Danh m\u1EE5c cha"),
                                        React.createElement("div", { className: "col-sm-9" },
                                            React.createElement("select", { className: "form-control m-b", name: "ParentId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Category.ParentId }, this.loadParentCategories()))),
                                    React.createElement("div", { className: "hr-line-dashed" }),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("div", { className: "col-sm-12 text-center" },
                                            React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u")))))))))));
    }
}
const mapStateToProps = (state) => {
    return {
        categoryResult: state.CategoryReducer,
        parentCategoriesResult: state.ParentCategoriesReducer,
        categoryEditResult: state.CategoryEditReducer,
        categoryCreateResult: state.CategoryCreateReducer
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    let categoryAction = new FetchAction.CategoryAction();
    let parentCategoriesAction = new FetchAction.ParentCategoriesAction();
    let categoryEditAction = new PostAction.CategoryEditAction();
    let categoryCreateAction = new PostAction.CategoryCreateAction();
    return {
        getCategory: () => dispatch(categoryAction.getCategory(ownProps.categoryId)),
        getParentCategories: () => dispatch(parentCategoriesAction.getParentCategories()),
        create: (entry) => dispatch(categoryCreateAction.createNewCategory(entry)),
        edit: (entry) => dispatch(categoryEditAction.editCategory(entry))
    };
};
const connectedCategory = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
export { connectedCategory as CategoryForm };
//# sourceMappingURL=category-form.js.map