import React from "react";
import StateResponse from "../state/response-state-handler";
import { IAccessaryUnit } from "../state/accessary-unit-state";
import { GeneralFormComponent } from "core/component/base-form-component";
import { IFormProps, CombinedProps, AccessaryUnitFormMapping } from "../redux-mapping/accessary-unit-form-mapping";

interface FormState {
    IsValid?: boolean,
    AccessaryUnit: IAccessaryUnit
}

class AccessaryUnitForm extends GeneralFormComponent<CombinedProps, FormState, IAccessaryUnit> {
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
    }

    initState() {
        this.state = { IsValid: false, AccessaryUnit: { Id: 0, Name: "" } };
    }
    
    onSave(event: any) {
        this.onCreateOrUpdate(event, this.state.AccessaryUnit.Id, this.state.AccessaryUnit);
    }

    reloadAccessaryUnits() {
        if (this.props.reloadAccessaryUnits)
            this.props.reloadAccessaryUnits();
    }

    componentDidMount() {
        this.props.getAccessaryUnit();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.accessaryUnitCreateResult.target, nextProps.accessaryUnitCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.accessaryUnitEditResult.target, nextProps.accessaryUnitEditResult.target);
        this.setDetailAccessaryResponseFromServer(nextProps);
    }

    setDetailAccessaryResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.accessaryUnitResult.target;
        const isChanged = this.isPropsChanged(this.props.accessaryUnitResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailAccessaryResponse(
                newResult.Data, 
                () => {
                    if (this.state.AccessaryUnit.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            AccessaryUnit: this.inputInteraction.onBindTarget(event.target, this.state.AccessaryUnit) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    render() {
        return (
            <React.Fragment>
                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                    <div className="form-group">
                        <label className="col-sm-3 control-label required">Tên đơn vị</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" name="Name"
                                    onInput={e => this.inputEvent(e, (name, value) => this.validateRequiredForInput(name, value))}
                                    value={this.state.AccessaryUnit.Name} 
                            />
                        </div>
                    </div>
                    <div className="hr-line-dashed"></div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-primary" disabled={!this.state.IsValid} type="submit">Lưu</button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const connectedComponent = new AccessaryUnitFormMapping().connectComponent(AccessaryUnitForm);
export { connectedComponent as AccessaryUnitForm };
