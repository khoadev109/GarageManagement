import React from "react";
import GeneralState from "../../../core/state/general-state";
import StateResponse from "../state/response-state-handler";
import { IYear } from "../state/year-state";
import { IFormProps, CombinedProps, YearFormMapping } from "../redux-mapping/year-form-mapping";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    Year: IYear,
    CarModels: Array<GeneralState.Model>
}

class YearForm extends GeneralFormComponent<CombinedProps, FormState, IYear> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);        
        this.errors.add("ModelId", effectForAllValues);
    }

    initState() {
       this.state = {
            IsValid: false,
            Year: {
                Id: 0,
                Name: "",
                ModelId: 0,
                ModelName: ""
            },
            CarModels: new Array<GeneralState.Model>()
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<IYear>(event, this.state.Year.Id, this.state.Year);
    }

    reloadYears(yearId?: string) {
        if (this.props.reloadYears)
            this.props.reloadYears(yearId);
    } 

    componentDidMount() {
        this.props.getYear();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.yearCreateResult.target, nextProps.yearCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.yearEditResult.target, nextProps.yearEditResult.target);
        this.setDetailYearResponseFromServer(nextProps);
    }

    setDetailYearResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.yearResult.target;
        const isChanged = this.isPropsChanged(this.props.yearResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailYearResponse(
                newResult.Data, 
                () => {
                    if (this.state.Year.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    renderCarModels() {
        return (
            this.state.CarModels.length ? 
            this.state.CarModels.map((model, i) => { 
                return (
                    <option value={model.Id} key={model.Id} data-short-name={model.Name}>
                        {model.Name}
                    </option>
                ) 
            }) : null
        )
    }

    inputEvent(event: any, validationFunc?: any) {
        this.setState({ 
            Year: this.inputInteraction.onBindTarget(event.target, this.state.Year) 
        }, 
        this.triggerValidation(event, validationFunc));
    }

    selectEvent(event: any, validationFunc?: any) {
        this.setState({
            Year: this.selectInteraction.onBindTarget(event.target, this.state.Year) 
        }, 
        this.triggerValidation(event, validationFunc));
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                    <TextboxReadOnlyWithLabelHorizontal labelText="Mã năm sản xuất" name="Id"
                                                        value={this.state.Year.Id} />
                    <Hr />
                    <SelectWithLabelHorizontal name="BranchId" labelText="Dòng xe"
                                               value={this.state.Year.ModelId}
                                               loadDataFunc={this.renderCarModels.bind(this)}
                                               event={this.selectEvent.bind(this, (name, value) => this.validateRequiredForSelect(name, value))} />
                    <Hr />
                    <TextboxWithLabelHorizontal name="Name" labelText="Tên năm sản xuất" 
                                                value={this.state.Year.Name} isRequired={true}
                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                    <Hr />
                    <SubmitCenter disabled={!this.state.IsValid} />
                </form>
            </div>                        
            </React.Fragment>
        );
    }
}

const connectedComponent = new YearFormMapping().connectComponent(YearForm);
export { connectedComponent as YearForm };
