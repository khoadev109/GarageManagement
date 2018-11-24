import React from "react";
import StateResponse from "../state/response-state-handler";
import { ICategory } from "../state/category-state";
import { IFormProps, CombinedProps, CategoryFormMapping } from "../redux-mapping/category-form-mapping";
import { TextboxWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "../../../core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    Category: ICategory,
    Parent: Array<ICategory>
}

class CategoryForm extends GeneralFormComponent<CombinedProps, FormState, ICategory> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("ParentId", effectForAllValues);
        this.errors.add("ParentName", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            Category: {
                Id: this.props.categoryId,
                Name: "",
                ParentId: 0,
                ParentName: ""
            },
            Parent: new Array<ICategory>()
        };
    }

    onSave(event: any) {
        this.onCreateOrUpdate(event, this.state.Category.Id, this.state.Category);
    }
    
    reloadCategories() {
        if (this.props.reloadCategories)
            this.props.reloadCategories();
    }

    componentDidMount() {
        this.props.getCategory();
        this.props.getParentCategories();
    }   
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.categoryCreateResult.target, nextProps.categoryCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.categoryEditResult.target, nextProps.categoryEditResult.target);
        this.setDetailCategoryResponseFromServer(nextProps);
        this.setParentCategoriesResponseFromServer(nextProps);
    }

    setDetailCategoryResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.categoryResult.target;
        const isChanged = this.isPropsChanged(this.props.categoryResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailCategoryResponse(
                newResult.Data, 
                () => {
                    if (this.state.Category.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    setParentCategoriesResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.parentCategoriesResult.target;
        const isChanged = this.isPropsChanged(this.props.parentCategoriesResult.target, newResult);
        
        if (isChanged && newResult.Success)
            StateResponse.setParentCategoriesResponse(newResult.Data);
    }
    
    renderParentCategories() {
        return (
            this.state.Parent.length ?
                this.state.Parent.map((parent, i) => {
                    return (
                        <option value={parent.Id} key={parent.Id}>
                            {parent.Name}
                        </option>
                    )
                }) : null
        )
    }
    
    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Category: this.inputInteraction.onBindTarget(event.target, this.state.Category) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({
            Category: this.selectInteraction.onBindTarget(event.target, this.state.Category) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={e => this.onSave(e)}>
                        <TextboxWithLabelHorizontal isRequired={true} labelText="Tên danh mục" 
                                                    name="Name" value={this.state.Category.Name}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr/>
                        <SelectWithLabelHorizontal labelText="Danh mục cha" 
                                                   name="ParentId" value={this.state.Category.ParentId}
                                                   event={this.selectEvent.bind(this)} 
                                                   loadDataFunc={this.renderParentCategories} />
                        <Hr/>
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new CategoryFormMapping().connectComponent(CategoryForm);
export { connectedComponent as CategoryForm };
