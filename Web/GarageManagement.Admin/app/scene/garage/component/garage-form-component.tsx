import React from "react";
import StateResponse from "../state/response-state-handler";
import { IGarage } from "../state/garage-state";
import { IFormProps, CombinedProps, GarageFormMapping } from "../redux-mapping/garage-form-mapping";
import { Image } from "../../../component/control/image-component";
import { File } from "../../../component/control/file-component";
import { CheckboxInline } from "../../../component/control/checkbox-component";
import { TextboxWithLabelHorizontal } from "../../../component/control/textbox-component";
import { DayPickerWithLabelHorizontal } from "../../../component/control/daypicker-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { Hr } from "../../../component/common/common-component";
import * as BaseForm from "core/component/base-form-component";

interface FormState {
    IsValid?: boolean,
    Garage: IGarage
}

class GarageForm extends BaseForm.BaseFormComponent<CombinedProps, FormState, IGarage> {
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Website", effectForAllValues);
        this.errors.add("Name", effectForAllValues);
        this.errors.add("Address", effectForAllValues);
        this.errors.add("District", effectForAllValues);
        this.errors.add("Ward", effectForAllValues);
        this.errors.add("Phone", true);
    }

    initState() {
        this.state = {
            IsValid: false,
            Garage: {
                Id: 0,
                Website: "",
                ExpireDate: "",
                Name: "",
                ShortName: "",
                Address: "",
                District: "",
                Ward: "",
                Phone: "",
                Logo: "",
                SmsPhoneNumber: false,
                EmailSchedule: false
            }
        }
    }

    checkFileType(file, RegExp) {
        return RegExp.test(file.type);
    }

    readLocalImage(file) {
        return new Promise((resolve, reject) => {
            let type = this.checkFileType(file, /\img*/);
            if (type) {
                let reader = new FileReader();
                reader.onload = ((progress) => {
                    resolve(reader.result);
                });
                reader.readAsDataURL(file);
            }
            else {
                alert("Vui lòng chọn file hình ảnh");
            }
        });
    }

    fileChange(event) {
        let file = event.target.files.item(0);

        this.readLocalImage(file).then((image: any) => {
            this.state.Garage.Logo = image;
            this.setState({ Garage: this.state.Garage });
        });
    }

    onSave(event: any) {
        event.preventDefault();

        if (this.state.IsValid)
            this.props.edit(this.state.Garage);
    }

    componentDidMount() {
        this.props.get();
    }
    
    componentWillReceiveProps(nextProps: IFormProps) {
        this.handleResponseFromServerForEditAction(this.props.garageUpdateResult.target, nextProps.garageUpdateResult.target);
        this.setDetailGarageResponseFromServer(nextProps);
    }
    
    setDetailGarageResponseFromServer(nextProps: IFormProps) {
        const newResult = nextProps.garageResult.target;
        const isChanged = this.isPropsChanged(this.props.garageResult.target, newResult);
        
        if (isChanged && newResult.Success) {
            StateResponse.setDetailGarageResponse(
                newResult.Data, 
                () => {
                    if (this.state.Garage.Id > 0) {
                        this.setState({IsValid: true});
                        this.setInitialErrors(true);
                    }
                });
        }
    }
    
    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setState({ 
            Garage: this.inputInteraction.onBindTarget(event.target, this.state.Garage) 
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }

    onChangeExpireDate = (daySelected: Date) => {
        this.setState({ Garage: this.dayPickerInteraction.onBind("ExpireDate", daySelected, this.state.Garage) });
    }

    render() {
        return (
            <React.Fragment>
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Thiết lập garage</h5>
                    </div>
                    <div className="ibox-content">
                        <form className="form-horizontal" onSubmit={this.onSave}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Image src={this.state.Garage.Logo} width="100" height="120" />
                                        </div>
                                        <div className="col-sm-6">
                                            <File name="logo" labelText="Chọn logo" event={this.fileChange.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9">
                                    <TextboxWithLabelHorizontal name="Name" labelText="Tên garage" 
                                                                value={this.state.Garage.Name} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                    <TextboxWithLabelHorizontal name="Phone" labelText="Điện thoại" 
                                                                value={this.state.Garage.Phone} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), true, 10)} />
                                    
                                    <TextboxWithLabelHorizontal name="ShortName" labelText="Tên viết tắt" 
                                                                value={this.state.Garage.ShortName}
                                                                event={this.inputEvent.bind(this)} />

                                    <TextboxWithLabelHorizontal name="Address" labelText="Địa chỉ" 
                                                                value={this.state.Garage.Address} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                    <TextboxWithLabelHorizontal name="District" labelText="Quận / Huyện"
                                                                value={this.state.Garage.District} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                    <TextboxWithLabelHorizontal name="Ward" labelText="Phường / Xã"
                                                                value={this.state.Garage.Ward} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                    <TextboxWithLabelHorizontal name="Ward" labelText="Website"
                                                                value={this.state.Garage.Website} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />

                                    <DayPickerWithLabelHorizontal name="ExpireDate" labelText="Thời gian sử dụng" 
                                                                  value={this.state.Garage.ExpireDate} 
                                                                  dayChangeEvent={this.onChangeExpireDate} />

                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <CheckboxInline style={{ marginRight: "20px" }} name="SmsPhoneNumber"
                                                            labelText="Nhận thông báo qua SMS"
                                                            checked={this.state.Garage.SmsPhoneNumber}
                                                            event={this.inputEvent.bind(this)} />
                                            
                                            <CheckboxInline style={{ marginRight: "20px" }} name="EmailSchedule"
                                                            labelText="Nhận thông báo qua Email"
                                                            checked={this.state.Garage.EmailSchedule}
                                                            event={this.inputEvent.bind(this)} />
                                        </div>
                                    </div>
                                    
                                    <SubmitCenter disabled={!this.state.IsValid} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const connectedComponent = new GarageFormMapping().connectComponent(GarageForm);
export { connectedComponent as GarageForm };
