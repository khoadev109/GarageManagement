import React from "react";
import StateResponse from "../state/response-state-handler";
import { IServiceType } from "../state/service-type-state";
import { IFormProps, CombinedProps, ServiceTypeFormMapping } from "../redux-mapping/service-type-form-mapping";
import { TextboxWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    ServiceType: IServiceType,
    Parent: Array<IServiceType>
}

class ServiceTypeForm extends GeneralFormComponent<CombinedProps, FormState, IServiceType> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            ServiceType: {
                Id: 0,
                Name: "",
                ParentId: 0,
                ParentName: ""
            },
            Parent: new Array<IServiceType>()
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<IServiceType>(event, this.state.ServiceType.Id, this.state.ServiceType);
    }

    reloadServiceTypes() {
        if (this.props.reloadServiceTypes)
            this.props.reloadServiceTypes();
    }
    
    componentDidMount() {
        this.props.getServiceType();
        this.props.getParentServiceTypes();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.serviceTypeCreateResult.target, nextProps.serviceTypeCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.serviceTypeEditResult.target, nextProps.serviceTypeEditResult.target);
        this.setDetailServiceTypeResponseFromServer(nextProps);
        this.setParentServiceTypesResponseFromServer(nextProps);
    }

    setDetailServiceTypeResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.serviceTypeResult.target;
        const isChanged = this.isPropsChanged(this.props.serviceTypeResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailServiceTypeResponse(
                newResult.Data, 
                () => {
                    if (this.state.ServiceType.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    setParentServiceTypesResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.parentServiceTypeResult.target;
        const isChanged = this.isPropsChanged(this.props.parentServiceTypeResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setParentServiceTypesResponse(newResult.Data);
        }
    }

    renderParentServiceTypes() {
        return (
            this.state.Parent.length ?
            this.state.Parent.map((parent, i) => { 
                return (<option value={parent.Id} key={parent.Id}>{parent.Name}</option>) 
            }) : null
        )
    }

    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            ServiceType: this.inputInteraction.onBindTarget(event.target, this.state.ServiceType) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    selectEvent(event: any) {
        this.setState({
            ServiceType: this.selectInteraction.onBindTarget(event.target, this.state.ServiceType) 
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                         <TextboxWithLabelHorizontal name="Name" labelText="Tên loại dịch vụ" 
                                                     value={this.state.ServiceType.Name} isRequired={true}
                                                     event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <SelectWithLabelHorizontal labelText="Danh mục cha" name="ParentId" 
                                                    value={this.state.ServiceType.ParentId}
                                                    loadDataFunc={this.renderParentServiceTypes} 
                                                    event={this.selectEvent.bind(this)} />
                         <Hr />
                         <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new ServiceTypeFormMapping().connectComponent(ServiceTypeForm);
export { connectedComponent as ServiceTypeForm };
