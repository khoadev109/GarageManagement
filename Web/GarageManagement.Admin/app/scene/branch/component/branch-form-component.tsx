import React from "react";
import StateResponse from "../state/response-state-handler";
import { IBranch } from "../state/branch-state";
import { IFormProps, CombinedProps, BranchFormMapping } from "../redux-mapping/branch-form-mapping";
import { TextboxReadOnlyWithLabelHorizontal, TextboxWithLabelHorizontal } from "../../../component/control/textbox-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import { GeneralFormComponent } from "core/component/base-form-component";
import * as Locale from "../../../core/locale/component/locale";

interface FormState {
    IsValid?: boolean,
    Branch: IBranch,
    Provinces: Array<any>,
    Districts: Array<any>,
    Wards: Array<any>
}

class BranchForm extends GeneralFormComponent<CombinedProps, FormState, IBranch> {
    provinceState: boolean;

    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Name", effectForAllValues);
        this.errors.add("ShortName", effectForAllValues);
        this.errors.add("Phone", effectForAllValues);
        this.errors.add("Email", effectForAllValues);
        this.errors.add("Address", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: false,
            Branch: {
                Id: "",
                GenerateId: 0,
                Name: "",
                ShortName: "",
                Phone: "",
                Email: "",
                Address: "",
                Province: "",
                District: "",
                Ward: ""
            },
            Provinces: Array<any>(),
            Districts: Array<any>(),
            Wards: Array<any>()
        };
    }

    onSave(event: any): any {
        this.onCreateOrUpdate(event, this.state.Branch.GenerateId, this.state.Branch);
    }

    reloadBranches(branchId: string) {
        if (this.props.reloadBranches)
            this.props.reloadBranches(branchId);
    }

    componentDidMount() {
        this.props.getBranch();
        this.props.getProvince();
        this.props.getDistrict();
        this.props.getWard();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForCreateAction(this.props.branchCreateResult.target, nextProps.branchCreateResult.target);
        this.handleResponseFromServerForEditAction(this.props.branchEditResult.target, nextProps.branchEditResult.target);
        this.setDetailBranchResponseFromServer(nextProps);
        this.setLocaleResponseFromServer(nextProps);
    }
    
    setDetailBranchResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.branchResult.target;
        const isChanged = this.isPropsChanged(this.props.branchResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailBranchResponse(
                newResult.Data, 
                () => {
                    if (this.state.Branch.GenerateId > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }

    setLocaleResponseFromServer(nextProps: IFormProps) {
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

    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Branch: this.inputInteraction.onBindTarget(event.target, this.state.Branch) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    selectEvent(event: any) {
        this.setState({
            Branch: this.selectInteraction.onBindTarget(event.target, this.state.Branch) 
        });

        if (event.target.name == "Province") {
            this.provinceState = true;
        } else {
            this.provinceState = false;
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox-content">
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <TextboxReadOnlyWithLabelHorizontal labelText="Mã chi nhánh" name="Id"
                                                            value={this.state.Branch.Id} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Name" labelText="Tên chi nhánh" 
                                                    value={this.state.Branch.Name} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="ShortName" labelText="Tên viết tắt" 
                                                    value={this.state.Branch.ShortName} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Phone" labelText="Điện thoại" 
                                                    value={this.state.Branch.Phone} isRequired={true}
                                                    event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, true, 10))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Email" labelText="Email" 
                                                    value={this.state.Branch.Email}
                                                    event={this.inputEvent.bind(this, (name, value) => this.validateEmailForInput(name, value))} />
                        <Hr />
                        <TextboxWithLabelHorizontal name="Address" labelText="Địa chỉ" 
                                                    value={this.state.Branch.Address}
                                                    event={this.inputEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal name="Province" labelText="Tỉnh thành"
                                                   value={this.state.Branch.Province}
                                                   loadDataFunc={() => Locale.renderProvince(this.state.Provinces)}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal name="District" labelText="Quận / Huyện"
                                                   value={this.state.Branch.District}
                                                   loadDataFunc={Locale.renderDistrict.bind(this, this.state.Districts, this.state.Branch.Province)}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <SelectWithLabelHorizontal name="Ward" labelText="Phường / Xã"
                                                   value={this.state.Branch.Ward}
                                                   loadDataFunc={() => {
                                                       return !this.provinceState && Locale.renderWard(this.state.Wards, this.state.Branch.District) || null;
                                                   }}
                                                   event={this.selectEvent.bind(this)} />
                        <Hr />
                        <SubmitCenter disabled={!this.state.IsValid} />
                    </form>
                </div>                      
            </React.Fragment>
        );
    }
}

const connectedComponent = new BranchFormMapping().connectComponent(BranchForm);
export { connectedComponent as BranchForm };
