import React from "react";
import GeneralState from "../../../core/state/general-state";
import StateResponse from "../state/response-state-handler";
import { ICarModel } from "../state/car-model-state";
import { IFormProps, CombinedProps, CarModelFormMapping } from "../redux-mapping/car-model-form-mapping";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { TextareaWithLabelHorizontal } from "../../../component/control/textarea-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean;
    CarModel: ICarModel;
    Styles: Array<GeneralState.Style>
    Manufacturers: Array<GeneralState.Manufacturer>;
}

class CarModelForm extends GeneralFormComponent<CombinedProps, FormState, ICarModel> {

    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("StyleId", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            CarModel: {
                Id: 0,
                Name: "",
                Description: "",
                StyleId: 0,
                StyleName: "",
                ManufacturerId: 0,
                ManufacturerName: ""
            },
            Styles: new Array<GeneralState.Style>(),
            Manufacturers: new Array<GeneralState.Manufacturer>()
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<ICarModel>(event, this.state.CarModel.Id, this.state.CarModel);
    }

    reloadCarModels() {
        if (this.props.reloadCarModels)
            this.props.reloadCarModels();
    }

    componentDidMount() {
        this.props.getCarModel();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.carModelCreateResult.target, nextProps.carModelCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.carModelEditResult.target, nextProps.carModelEditResult.target);
        this.setDetailCarModelResponseFromServer(nextProps);
    }

    setDetailCarModelResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.carModelResult.target;
        const isChanged = this.isPropsChanged(this.props.carModelResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailCarModelResponse(
                newResult.Data, 
                () => {
                    if (this.state.CarModel.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }
    
    renderStyles() {
        return (
            this.state.Styles.length ?
                this.state.Styles.map((style, index) => {
                    return (<option value={style.Id} key={style.Id}>{style.Name}</option>)
                }) : null
        )
    }

    renderManufacturers() {
        return (
            this.state.Manufacturers.length ? 
            this.state.Manufacturers.map((manufacturer, index) => { 
                return (<option value={manufacturer.Id} key={manufacturer.Id}>{manufacturer.Name}</option>)
            }) : null
        )
    }

    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            CarModel: this.inputInteraction.onBindTarget(event.target, this.state.CarModel) 
        }, 
        this.triggerValidation(event, validationFunc));
    }

    selectEvent(event: any, validationFunc?: any) {
        this.setState({
            CarModel: this.selectInteraction.onBindTarget(event.target, this.state.CarModel) 
        }, 
        this.triggerValidation(event, validationFunc));
    }

    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <TextboxReadOnlyWithLabelHorizontal labelText="Mã dòng xe" name="Id"
                                                            value={this.state.CarModel.Id} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Tên dòng xe" 
                                                    value={this.state.CarModel.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <SelectWithLabelHorizontal name="ManufacturerId" labelText="Hãng xe"
                                                   value={this.state.CarModel.ManufacturerId}
                                                   loadDataFunc={this.renderManufacturers.bind(this)}
                                                   event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                        <Hr />
                        <SelectWithLabelHorizontal name="StyleId" labelText="Kiểu dáng xe"
                                                   value={this.state.CarModel.StyleId}
                                                   loadDataFunc={this.renderStyles.bind(this)}
                                                   event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                        <Hr />
                        <TextareaWithLabelHorizontal name="Description" labelText="Mô tả" 
                                                     value={this.state.CarModel.Description}
                                                     event={this.inputEvent.bind(this)} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new CarModelFormMapping().connectComponent(CarModelForm);
export { connectedComponent as CarModelForm };
