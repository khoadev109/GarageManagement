import React from "react";
import StateResponse from "../state/response-state-handler";
import GeneralState from  "../../../core/state/general-state";
import { IEmployee } from "../state/employee-state";
import { IFormProps, CombinedProps, EmployeeFormMapping } from "../redux-mapping/employee-form-mapping";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { DayPickerWithLabelHorizontal } from "../../../component/control/daypicker-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";
import * as Locale from "../../../core/locale/component/locale";

interface FormState {
    IsValid?: boolean,
    Employee: IEmployee,
    Branches: Array<GeneralState.Branch>,
    Provinces: Array<any>,
    Districts: Array<any>,
    Wards: Array<any>
}

class EmployeeForm extends GeneralFormComponent<CombinedProps, FormState, IEmployee> {
    provinceState: boolean;

    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("Phone", effectForAllValues);
        this.errors.add("Email", true);
        this.errors.add("Address", effectForAllValues);
        this.errors.add("BranchId", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            Employee: {
                Id: "",
                GenerateId: 0,
                Name: "",
                Phone: "",
                Email: "",
                Address: "",
                Province: "",
                District: "",
                Ward: "",
                Birthday: "",
                IdentityCard: "",
                BranchId: "",
                BranchName: ""
            },
            Branches: new Array<GeneralState.Branch>(),
            Provinces: Array<any>(),
            Districts: Array<any>(),
            Wards: Array<any>()
        }
    }

    onSave(event: any) {
        this.onCreateOrUpdate<IEmployee>(event, this.state.Employee.Id, this.state.Employee);
    }

    reloadEmployees(employeeId?: string) {
        if (this.props.reloadEmployees)
            this.props.reloadEmployees(employeeId);
    }
    
    componentDidMount() {
        this.props.getEmployee();
        this.props.getProvince();
        this.props.getDistrict();
        this.props.getWard();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.employeeCreateResult.target, nextProps.employeeCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.employeeEditResult.target, nextProps.employeeEditResult.target);
        this.setDetailEmployeeResponseFromServer(nextProps);
        
        const provinceResult = nextProps.provinceResult.target;
        if (this.isPropsChanged(this.props.provinceResult.target, provinceResult))
            this.setState({ Provinces: provinceResult });

        const districtResult = nextProps.districtResult.target;
        if (this.isPropsChanged(this.props.districtResult.target, districtResult))
            this.setState({ Districts: districtResult });

        const wardResult = nextProps.wardResult.target;
        if (this.isPropsChanged(this.props.wardResult.target, wardResult))
            this.setState({ Wards: wardResult });
    }

    setDetailEmployeeResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.employeeResult.target;
        const isChanged = this.isPropsChanged(this.props.employeeResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailEmployeeResponse(
                newResult.Data, 
                () => {
                    if (this.state.Employee.GenerateId > 0) {
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

    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Employee: this.inputInteraction.onBindTarget(event.target, this.state.Employee) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }

    selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setEmployeeIdBaseOnSelectedBranch(event.target);

        this.setState({
            Employee: this.selectInteraction.onBindTarget(event.target, this.state.Employee) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));

        if (event.target.name == "Province") {
            this.provinceState = true;
        } else {
            this.provinceState = false;
        }
    }

    setEmployeeIdBaseOnSelectedBranch(target: any) {
        if (name == "BranchId") {
            let employeeIdSegments: Array<string> = this.state.Employee.Id.split("-");
            if (employeeIdSegments[0] != "") {
                employeeIdSegments[0] = "";
                this.state.Employee.Id = employeeIdSegments.join("-");
            }
            var shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Employee.Id = shortName.concat(this.state.Employee.Id);
        }
    }

    onChangeBirthday = (daySelected: Date) => {
        this.setState({ Employee: this.dayPickerInteraction.onBind("Birthday", daySelected, this.state.Employee) });
    }

    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <TextboxReadOnlyWithLabelHorizontal labelText="Mã nhân viên" name="Id"
                                                            value={this.state.Employee.Id} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Họ và tên" 
                                                    value={this.state.Employee.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Phone" labelText="Điện thoại" 
                                                    value={this.state.Employee.Phone} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), true, 20)} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Email" labelText="Email" 
                                                    value={this.state.Employee.Email}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateEmailForInput(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Address" labelText="Địa chỉ" 
                                                    value={this.state.Employee.Address} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <SelectWithLabelHorizontal name="Province" labelText="Tỉnh thành"
                                                   value={this.state.Employee.Province}
                                                   loadDataFunc={Locale.renderProvince.bind(this, this.state.Provinces)}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal name="District" labelText="Quận / Huyện"
                                                   value={this.state.Employee.District}
                                                   loadDataFunc={Locale.renderProvince.bind(this, this.state.Districts, this.state.Employee.Province)}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal name="Ward" labelText="Phường / Xã"
                                                   value={this.state.Employee.Ward}
                                                   loadDataFunc={() => {
                                                       return !this.provinceState && Locale.renderWard(this.state.Wards, this.state.Employee.District) || null;
                                                    }}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <DayPickerWithLabelHorizontal name="Birthday" labelText="Ngày sinh" 
                                                      value={this.state.Employee.Birthday}
                                                      dayChangeEvent={this.onChangeBirthday} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="IdentityCard" labelText="CMND" 
                                                    value={this.state.Employee.IdentityCard}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateNumberForInput(name, value))} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

const connectedComponent = new EmployeeFormMapping().connectComponent(EmployeeForm);
export { connectedComponent as EmployeeForm };
