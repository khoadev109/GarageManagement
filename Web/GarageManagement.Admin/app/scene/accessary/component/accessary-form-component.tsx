import React from "react";
import GeneralState from "core/state/general-state";
import StateResponse from "../state/response-state-handler";
import { IAccessary } from "../state/accessary-state";
import { IFormProps, CombinedProps, AccessaryFormMapping } from "../redux-mapping/accessary-form-mapping";
import { CheckboxWithLabelHorizontal } from "component/control/checkbox-component";
import { TextboxWithLabelHorizontal } from "component/control/textbox-component";
import { TextareaWithLabelHorizontal } from "component/control/textarea-component";
import { SelectWithLabelHorizontal } from "component/control/select-component";
import { SubmitCenter } from "component/control/submit-component";
import { Hr } from "component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    Accessary: IAccessary,
    Branches: Array<GeneralState.Branch>,
    Categories: Array<GeneralState.Category>,
    AccessaryUnits: Array<GeneralState.AccessaryUnit>
}

class AccessaryForm extends GeneralFormComponent<CombinedProps, FormState, IAccessary> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("Price", effectForAllValues);
        this.errors.add("CostGoodSold", effectForAllValues);
        this.errors.add("UnitId", effectForAllValues);
        this.errors.add("BranchId", effectForAllValues);
        this.errors.add("CategoryId", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
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
                BranchId: "",
                BranchName: "",
                IsInputAccessaryId: false
            },
            Branches: new Array<GeneralState.Branch>(),
            Categories: new Array<GeneralState.Category>(),
            AccessaryUnits: new Array<GeneralState.AccessaryUnit>()
        };
    }

    onSave(event: any) {
        this.onCreateOrUpdate<IAccessary>(event, this.state.Accessary.GenerateId, this.state.Accessary);
    }

    reloadAccessaries(accessaryId?: string) {
        if (this.props.reloadAccessaries)
            this.props.reloadAccessaries(accessaryId);
    }

    componentDidMount() {
        this.props.getAccessary();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.accessaryCreateResult.target, nextProps.accessaryCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.accessaryEditResult.target, nextProps.accessaryEditResult.target);
        this.setDetailAccessaryResponseFromServer(nextProps);
    }
    
    setDetailAccessaryResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.accessaryResult.target;
        const isChanged = this.isPropsChanged(this.props.accessaryResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailAccessaryResponse(
                newResult.Data, 
                () => {
                    if (this.state.Accessary.GenerateId > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    renderBranches() {
        return (
            this.state.Branches.length ? 
            this.state.Branches.map((branch, index) => { 
                return (
                    <option value={branch.Id} key={index} data-short-name={branch.ShortName}>
                        {branch.Name}
                    </option>
                ) 
            }) : null
        )
    }

    renderAccessaryUnits() {
        return (
            this.state.AccessaryUnits.length ? 
            this.state.AccessaryUnits.map((accessaryUnit, i) => { 
                return (
                    <option value={accessaryUnit.Id} key={accessaryUnit.Id}>
                        {accessaryUnit.Name}
                    </option>
                ) 
            }) : null
        )
    }

    renderCategories() {
        return (
            this.state.Categories.length ? 
            this.state.Categories.map((category, i) => { 
                return (
                    <option value={category.Id} key={category.Id}>
                        {category.Name}
                    </option>
                ) 
            }) : null
        )
    }
    
    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Accessary: this.inputInteraction.onBindTarget(event.target, this.state.Accessary) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setAccessaryIdBaseOnSelectedBranch(event.target);

        this.setState({
            Accessary: this.selectInteraction.onBindTarget(event.target, this.state.Accessary) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }

    setAccessaryIdBaseOnSelectedBranch(target: any) {
        if (!this.state.Accessary.IsInputAccessaryId && name == "BranchId") {
            const accessaryIdSegments = this.state.Accessary.Id.split("-");
            if (accessaryIdSegments[0] != "") {
                accessaryIdSegments[0] = "";
                this.state.Accessary.Id = accessaryIdSegments.join("-");
            }

            var shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Accessary.Id = shortName.concat(this.state.Accessary.Id);
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <CheckboxWithLabelHorizontal name="IsInputAccessaryId" labelText="Nhập mã phụ tùng"
                                                     checked={this.state.Accessary.IsInputAccessaryId}
                                                     event={this.inputEvent.bind(this)} style={{paddingLeft: 10}} />
                        
                        <TextboxWithLabelHorizontal name="Id" labelText="Mã phụ tùng" 
                                                    disabled={!this.state.Accessary.IsInputAccessaryId}
                                                    value={this.state.Accessary.Id}
                                                    event={this.inputEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal labelText="Danh mục" name="CategoryId" 
                                                   value={this.state.Accessary.CategoryId}
                                                   loadDataFunc={this.renderCategories} 
                                                   event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Tên phụ tùng" 
                                                    value={this.state.Accessary.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <SelectWithLabelHorizontal labelText="Đơn vị" name="UnitId" 
                                                    value={this.state.Accessary.UnitId}
                                                    loadDataFunc={this.renderAccessaryUnits} 
                                                    event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Price" labelText="Giá" 
                                                    value={this.state.Accessary.Price}
                                                    event={this.inputEvent.bind(this, 
                                                    (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), true, 8)} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="CostGoodSold" labelText="Giá tốt nhất" 
                                                    value={this.state.Accessary.CostGoodSold} isRequired={true}
                                                    event={this.inputEvent.bind(this,  
                                                    (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), true, 8)} />
                        <Hr />
                        <TextareaWithLabelHorizontal name="Description" labelText="Mô tả" 
                                                     value={this.state.Accessary.Description}
                                                     event={this.inputEvent.bind(this)} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>                        
            </React.Fragment>
        );
    }
}

const connectedComponent = new AccessaryFormMapping().connectComponent(AccessaryForm);
export { connectedComponent as AccessaryForm };
