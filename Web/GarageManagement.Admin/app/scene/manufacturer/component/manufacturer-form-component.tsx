import React from "react";
import StateResponse from "../state/response-state-handler";
import { IManufacturer } from "../state/manufacturer-state";
import { IFormProps, CombinedProps, ManufacturerFormMapping } from "../redux-mapping/manufacturer-form-mapping";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { TextareaWithLabelHorizontal } from "../../../component/control/textarea-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    Manufacturer: IManufacturer
}

class ManufacturerForm extends GeneralFormComponent<CombinedProps, FormState, IManufacturer> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
    }

    initState() {
       this.state = {
            IsValid: false,
            Manufacturer: {
                Id: 0,
                Name: "",
                Description: ""
            }
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<IManufacturer>(event, this.state.Manufacturer.Id, this.state.Manufacturer);
    }

    closePopup() {
        if (this.props.closeModal)
            this.props.closeModal();
    }

    reloadManufacturers() {
        if (this.props.reloadManufacturers)
            this.props.reloadManufacturers();
    }

    componentDidMount() {
        this.props.getManufacturer();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.manufacturerCreateResult.target, nextProps.manufacturerCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.manufacturerEditResult.target, nextProps.manufacturerEditResult.target);
        this.setDetailManufacturerResponseFromServer(nextProps);
    }

    setDetailManufacturerResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.manufacturerResult.target;
        const isChanged = this.isPropsChanged(this.props.manufacturerResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailManufacturerResponse(
                newResult.Data, 
                () => {
                    if (this.state.Manufacturer.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            Manufacturer: this.inputInteraction.onBindTarget(event.target, this.state.Manufacturer) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                    <TextboxReadOnlyWithLabelHorizontal labelText="Mã hãng xe" name="Id"
                                                        value={this.state.Manufacturer.Id} />
                    <Hr />
                    <TextboxWithLabelHorizontal name="Name" labelText="Tên hãng xe" 
                                                value={this.state.Manufacturer.Name} isRequired={true}
                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                    <Hr />
                    <TextareaWithLabelHorizontal name="Description" labelText="Mô tả" 
                                                 value={this.state.Manufacturer.Description}
                                                 event={this.inputEvent.bind(this)} />
                    <Hr />
                    <SubmitCenter disabled={!this.state.IsValid} />
                </form>
            </div>                        
            </React.Fragment>
        );
    }
}

const connectedComponent = new ManufacturerFormMapping().connectComponent(ManufacturerForm);
export { connectedComponent as ManufacturerForm };
