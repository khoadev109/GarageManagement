import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "moment/locale/it";
import MomentLocaleUtils, { formatDate, parseDate, } from "react-day-picker/moment";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "../../../../core/library/extension/validation-combine";
class GarageForm extends Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid)
                this.props.update(this.state.Garage);
        };
        this.validateInputRequired = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputNumberAndMaxLength = (name, value, required, valueCompare) => {
            let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ Garage: this.inputInteraction.onReceiveTarget(event.target, this.state.Garage) }, doValidation);
        };
        this.dayPickerChangeEvent = (daySelected) => {
            this.setState({ Garage: this.dayPickerInteraction.onReceive("ExpireDate", daySelected, this.state.Garage) });
        };
        this.errors = new Dictionary.KeyedCollection();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.dayPickerInteraction = new UserInteraction.DayPickerInteraction();
        this.setInitialErrors(false);
        this.initializeState();
    }
    setInitialErrors(effectForAllValues) {
        this.errors.Add("Website", effectForAllValues);
        this.errors.Add("Name", effectForAllValues);
        this.errors.Add("Address", effectForAllValues);
        this.errors.Add("District", effectForAllValues);
        this.errors.Add("Ward", effectForAllValues);
        this.errors.Add("Phone", true);
    }
    initializeState() {
        this.state = {
            IsValid: false,
            LoadSucceed: false,
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
            },
            Errors: this.errors
        };
    }
    CheckTypeFile(file, RegExp) {
        if (RegExp.test(file.type))
            return true;
        return false;
    }
    ReadLocalImage(file) {
        return new Promise((resolve, reject) => {
            let type = this.CheckTypeFile(file, /\img*/);
            if (type) {
                let reader = new FileReader();
                reader.onload = ((progress) => {
                    resolve(reader.result);
                });
                reader.readAsDataURL(file);
            }
            else {
                toast("Vui lòng chọn file hình ảnh");
            }
        });
    }
    FileChange(event) {
        let file = event.target.files.item(0);
        this.ReadLocalImage(file).then((image) => {
            this.state.Garage.Logo = image;
            this.setState({ Garage: this.state.Garage });
        });
    }
    componentDidMount() {
        this.props.get();
    }
    componentWillReceiveProps(nextProps) {
        let updateResult = nextProps.garateUpdateResult.target;
        if (updateResult.Success) {
            toast("Cập nhật thông tin garage thành công");
        }
        let getInformationResult = nextProps.garageInformationResult.target;
        if (getInformationResult.Success) {
            this.setResponseState(getInformationResult.Data);
        }
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: false,
            LoadSucceed: true,
            Garage: {
                Id: dataResponse.Id,
                Website: dataResponse.Website,
                ExpireDate: dataResponse.ExpireDate,
                Name: dataResponse.Name,
                ShortName: dataResponse.ShortName,
                Address: dataResponse.Address,
                District: dataResponse.District,
                Ward: dataResponse.Ward,
                Phone: dataResponse.Phone,
                Logo: dataResponse.Logo,
                SmsPhoneNumber: dataResponse.SmsPhoneNumber,
                EmailSchedule: dataResponse.EmailSchedule
            },
            Errors: this.errors
        }, () => {
            if (this.state.Garage.Id > 0) {
                this.setState({ IsValid: true });
                this.setInitialErrors(true);
            }
        });
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    render() {
        return (React.createElement(Fragment, null,
            React.createElement("div", { className: "ibox float-e-margins" },
                React.createElement("div", { className: "ibox-title" },
                    React.createElement("h5", null, "Thi\u1EBFt l\u1EADp garage")),
                React.createElement("div", { className: "ibox-content" },
                    React.createElement("form", { className: "form-horizontal", onSubmit: this.onSave },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-sm-3" },
                                React.createElement("div", { className: "logo-block" },
                                    React.createElement("img", { src: this.state.Garage.Logo, className: "img-responsive" })),
                                React.createElement("br", null),
                                React.createElement("div", { className: "text-center" },
                                    React.createElement("label", { className: "btn btn-success", htmlFor: "logo" }, "Ch\u1ECDn Logo"),
                                    React.createElement("input", { type: "file", className: "sr-only", id: "logo", onChange: this.FileChange.bind(this) }))),
                            React.createElement("div", { className: "col-sm-9" },
                                React.createElement("div", { className: "form-group", style: { display: "none" } },
                                    React.createElement("label", { className: "col-sm-2 control-label" }, "M\u00E3 garage"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.Garage.Id }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label required" }, "T\u00EAn garage"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Garage.Name }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label required" }, "\u0110i\u1EC7n tho\u1EA1i"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "Phone", onInput: e => this.inputEvent(e, (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 10), value: this.state.Garage.Phone }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label" }, "T\u00EAn vi\u1EBFt t\u1EAFt"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "ShortName", onInput: e => this.inputEvent(e), value: this.state.Garage.ShortName }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label required" }, "\u0110\u1ECBa ch\u1EC9"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "Address", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Garage.Address }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label required" }, "Qu\u1EADn/Huy\u1EC7n"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "District", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Garage.District }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label required" }, "Ph\u01B0\u1EDDng/X\u00E3"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "Ward", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Garage.Ward }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label" }, "Website"),
                                    React.createElement("div", { className: "col-sm-10" },
                                        React.createElement("input", { type: "text", className: "form-control", name: "Website", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Garage.Website }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { className: "col-sm-2 control-label" }, "Th\u1EDDi gian s\u1EED d\u1EE5ng"),
                                    React.createElement("div", { className: "col-sm-3" },
                                        React.createElement(DayPickerInput, { name: "ExpireDate", value: this.state.Garage.ExpireDate, onDayChange: this.dayPickerChangeEvent, formatDate: formatDate, parseDate: parseDate, dayPickerProps: {
                                                locale: "vi",
                                                localeUtils: MomentLocaleUtils,
                                            } }))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("div", { className: "col-sm-offset-2 col-sm-10" },
                                        React.createElement("label", { className: "checkbox-inline", style: { marginRight: "20px" } },
                                            React.createElement("input", { type: "checkbox", name: "SmsPhoneNumber", checked: this.state.Garage.SmsPhoneNumber, onChange: e => this.inputEvent(e) }),
                                            " Nh\u1EADn th\u00F4ng b\u00E1o qua SMS"),
                                        React.createElement("label", { className: "checkbox-inline" },
                                            React.createElement("input", { type: "checkbox", name: "EmailSchedule", checked: this.state.Garage.EmailSchedule, onChange: e => this.inputEvent(e) }),
                                            " Nh\u1EADn th\u00F4ng b\u00E1o qua Email"))),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("div", { className: "col-sm-offset-2 col-sm-10" },
                                        React.createElement("button", { type: "submit", disabled: !this.state.IsValid, className: "btn btn-primary" }, "L\u01B0u"))))))))));
    }
}
const mapStateToProps = (state) => {
    return {
        garageInformationResult: state.GarageInformationReducer,
        garateUpdateResult: state.GarageUpdateReducer
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    let garageInfoAction = new FetchAction.GarageInformationAction();
    let garateUpdateAction = new PostAction.GarageUpdateAction();
    return {
        get: (entry) => dispatch(garageInfoAction.get(entry)),
        update: (entry) => dispatch(garateUpdateAction.update(entry)),
    };
};
const connectedGarage = connect(mapStateToProps, mapDispatchToProps)(GarageForm);
export { connectedGarage as GarageForm };
//# sourceMappingURL=garage-form.js.map