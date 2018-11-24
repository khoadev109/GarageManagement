import React from "react";
import StateResponse from "../state/response-state-handler";
import { IServiceUnit } from "../state/service-unit-state";
import { IFormProps, CombinedProps, ServiceUnitFormMapping } from "../redux-mapping/service-unit-form-mapping";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    ServiceUnit: IServiceUnit
}

class ServiceUnitForm extends GeneralFormComponent<CombinedProps, FormState, IServiceUnit> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            ServiceUnit: {
                Id: 0,
                Name: ""
            }
        }
    }
    
    onSave(event: any) {
        this.onCreateOrUpdate<IServiceUnit>(event, this.state.ServiceUnit.Id, this.state.ServiceUnit);
    }

    reloadServiceUnits() {
        if (this.props.reloadServiceUnits)
            this.props.reloadServiceUnits();
    }

    componentDidMount() {
        this.props.getServiceUnit();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.serviceUnitCreateResult.target, nextProps.serviceUnitCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.serviceUnitEditResult.target, nextProps.serviceUnitEditResult.target);
        this.setDetailServiceUnitResponseFromServer(nextProps);
    }
    
    setDetailServiceUnitResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.serviceUnitResult.target;
        const isChanged = this.isPropsChanged(this.props.serviceUnitResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailServiceUnitResponse(
                newResult.Data, 
                () => {
                    if (this.state.ServiceUnit.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }
    
    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            ServiceUnit: this.inputInteraction.onBindTarget(event.target, this.state.ServiceUnit) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <TextboxReadOnlyWithLabelHorizontal labelText="Mã loại dịch vụ" name="Id"
                                                            value={this.state.ServiceUnit.Id} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Tên loại dịch vụ" 
                                                    value={this.state.ServiceUnit.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new ServiceUnitFormMapping().connectComponent(ServiceUnitForm);
export { connectedComponent as ServiceUnitForm };
