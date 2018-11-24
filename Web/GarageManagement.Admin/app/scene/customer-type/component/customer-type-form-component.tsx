import React from "react";
import StateResponse from "../state/response-state-handler";
import { ICustomerType } from "../state/customer-type-state";
import { IFormProps, CombinedProps, CustomerTypeFormMapping } from "../redux-mapping/customer-type-form-mapping";
import { TextareaWithLabelHorizontal } from "../../../component/control/textarea-component";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    CustomerType: ICustomerType
}

class CustomerTypeForm extends GeneralFormComponent<CombinedProps, FormState, ICustomerType> {
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
    }
    
    initState() {
        this.state = {
            IsValid: false,
            CustomerType: {
                Id: 0,
                Name: "",
                Description: "",
            }
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<ICustomerType>(event, this.state.CustomerType.Id, this.state.CustomerType);
    }

    reloadCustomerTypes() {
        if (this.props.reloadCustomerTypes)
            this.props.reloadCustomerTypes();
    }

    componentDidMount() {
        this.props.getCustomerType();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.customerTypeCreateResult.target, nextProps.customerTypeCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.customerTypeEditResult.target, nextProps.customerTypeEditResult.target);
        this.setDetailCustomerTypeResponseFromServer(nextProps);
    }

    setDetailCustomerTypeResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.customerTypeResult.target;
        const isChanged = this.isPropsChanged(this.props.customerTypeResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailCustomerTypeResponse(
                newResult.Data, 
                () => {
                    if (this.state.CustomerType.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }
    
    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            CustomerType: this.inputInteraction.onBindTarget(event.target, this.state.CustomerType) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <TextboxReadOnlyWithLabelHorizontal labelText="Mã loại khách hàng" name="Id"
                                                            value={this.state.CustomerType.Id} /> 
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Tên loại khách hàng" 
                                                    value={this.state.CustomerType.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <TextareaWithLabelHorizontal name="Description" labelText="Mô tả" 
                                                     value={this.state.CustomerType.Description}
                                                     event={this.inputEvent.bind(this)} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new CustomerTypeFormMapping().connectComponent(CustomerTypeForm);
export { connectedComponent as CustomerTypeForm };
