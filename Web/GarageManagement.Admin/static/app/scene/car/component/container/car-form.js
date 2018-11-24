import React from "react";
import { connect } from "react-redux";
import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";
import { Branch } from "../../model/branchmodel";
import { Manufacturer, Model, Year } from "../../model/commonmodel";
import { Dictionary } from "../../../../core/library/extension/dictionary";
import { UserInteraction } from "../../../../core/library/extension/interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
class CarForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = (event) => {
            event.preventDefault();
            if (this.state.IsValid) {
                this.props.create(this.state.Car);
            }
        };
        this.validateSelectRequired = (name, value) => {
            let isValid = this.selectInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.validateInputRequired = (name, value) => {
            let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
            this.checkValidOnEveryChange(name, isValid);
        };
        this.inputEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            this.setState({ Car: this.inputInteraction.onReceiveTarget(event.target, this.state.Car) }, doValidation);
        };
        this.selectEvent = (event, validation, required, valueToCompare) => {
            let name = event.target.name;
            let value = event.target.value;
            //let shortName = this.getShortName(value, event.target.childNodes);
            let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;
            // set CarId base on selected branch
            if (name == "BranchId") {
                let carIdSegments = this.state.Car.Id.split("-");
                if (carIdSegments[0] != "") {
                    carIdSegments[0] = "";
                    this.state.Car.Id = carIdSegments.join("-");
                }
                this.state.Car.Id = value.concat(this.state.Car.Id);
            }
            // fill models dropdownlist when select manufacturer
            if (name == "ManufacturerId") {
                this.props.modelsByManufacturer(value);
            }
            // fill years dropdownlist when select model
            if (name == "ModelId") {
                this.props.yearsByModel(value);
            }
            this.setState({ Car: this.selectInteraction.onReceiveTarget(event.target, this.state.Car) }, doValidation);
        };
        this.initializeState();
        this.inputInteraction = new UserInteraction.InputInteraction();
        this.selectInteraction = new UserInteraction.SelectInteraction();
    }
    initializeState() {
        this.errors = new Dictionary.KeyedCollection();
        this.errors.Add("Name", false);
        this.errors.Add("Km", false);
        this.errors.Add("Color", false);
        this.errors.Add("Vinnumber", false);
        this.errors.Add("LicensePlates", false);
        this.errors.Add("BranchId", false);
        this.errors.Add("ManufacturerId", false);
        this.errors.Add("ModelId", false);
        this.errors.Add("YearId", false);
        this.state = {
            IsValid: true,
            LoadSucceed: false,
            Car: {
                Id: "",
                Name: "",
                Color: "",
                Vinnumber: "",
                LicensePlates: "",
                Km: 0,
                BranchId: 0,
                BranchName: "",
                ManufacturerId: 0,
                ManufacturerName: "",
                StyleId: 0,
                StyleName: "",
                ModelId: 0,
                ModelName: "",
                YearId: 0,
                YearName: "",
                CurrentCarOwnerId: "",
                CurrentCarOwnerName: ""
            },
            Branches: new Array(),
            Manufacturers: new Array(),
            Styles: new Array(),
            Models: new Array(),
            Years: new Array(),
            Errors: this.errors
        };
    }
    componentDidMount() {
        this.props.getCar();
        this.props.getAllManufacturers();
    }
    componentWillReceiveProps(nextProps) {
        let carCreateResult = nextProps.carCreateResult.target;
        if (carCreateResult.Success) {
            alert("Tạo mới xe thành công");
        }
        let result = nextProps.carResult.target;
        if (result.Success) {
            this.setResponseState(result.Data);
        }
        this.bindManufacturers(nextProps.allManufacturersResult);
        this.bindModelsByManufacturer(nextProps.modelsByManufacturerResult);
        this.bindYearsByModel(nextProps.yearsByModelResult);
    }
    bindManufacturers(result) {
        if (result.Success) {
            let manufacturers = new Array();
            if (result.Data) {
                result.Data.map((manufacturer, i) => {
                    manufacturers.push(new Manufacturer(manufacturer.Id, manufacturer.Name));
                });
            }
            this.setState({ Manufacturers: manufacturers });
        }
    }
    bindModelsByManufacturer(result) {
        if (result.Success) {
            let models = new Array();
            if (result.Data) {
                result.Data.map((model, i) => {
                    models.push(new Model(model.Id, model.Name));
                });
            }
            this.setState({ Models: models });
        }
    }
    bindYearsByModel(result) {
        if (result.Success) {
            let years = new Array();
            if (result.Data) {
                result.Data.map((year, i) => {
                    years.push(new Year(year.Id, year.Name));
                });
            }
            this.setState({ Years: years });
        }
    }
    setResponseState(dataResponse) {
        this.setState({
            IsValid: dataResponse.Id != "",
            LoadSucceed: true,
            Car: {
                Id: dataResponse.Id,
                Name: dataResponse.Name,
                Color: dataResponse.Color,
                Vinnumber: dataResponse.Vinnumber,
                LicensePlates: dataResponse.LicensePlates,
                Km: dataResponse.Km,
                BranchId: dataResponse.BranchId,
                BranchName: dataResponse.BranchName,
                ManufacturerId: dataResponse.ManufacturerId,
                ManufacturerName: dataResponse.ManufacturerName,
                StyleId: dataResponse.StyleId,
                StyleName: dataResponse.StyleName,
                ModelId: dataResponse.ModelId,
                ModelName: dataResponse.ModelName,
                YearId: dataResponse.YearId,
                YearName: dataResponse.YearName,
                CurrentCarOwnerId: dataResponse.CurrentCarOwnerId,
                CurrentCarOwnerName: dataResponse.CurrentCarOwnerName
            },
            Branches: this.setResponseStateForBranch(dataResponse.Branches),
            Manufacturers: this.setResponseStateForManufacturer(dataResponse.Manufacturers),
            Errors: this.errors
        });
    }
    setResponseStateForBranch(branchesResponse) {
        let branches = new Array();
        if (branchesResponse) {
            branchesResponse.map((branch, i) => {
                branches.push(new Branch(branch.Id, branch.Name, branch.ShortName));
            });
        }
        return branches;
    }
    setResponseStateForManufacturer(manufacturersResponse) {
        let manufacturers = new Array();
        if (manufacturersResponse) {
            manufacturersResponse.map((manufacturer, i) => {
                manufacturers.push(new Manufacturer(manufacturer.Id, manufacturer.Name));
            });
        }
        return manufacturers;
    }
    loadBranches() {
        if (this.state.LoadSucceed) {
            return (this.state.Branches.length ?
                this.state.Branches.map((branch, i) => {
                    return (React.createElement("option", { value: branch.Id, key: branch.Id, "data-short-name": branch.ShortName }, branch.Name));
                }) : null);
        }
    }
    loadManufacturers() {
        if (this.state.LoadSucceed) {
            return (this.state.Manufacturers.length ?
                this.state.Manufacturers.map((manufacturer, i) => {
                    return (React.createElement("option", { value: manufacturer.Id, key: manufacturer.Id }, manufacturer.Name));
                }) : null);
        }
    }
    loadModelsByManufacturer() {
        return (this.state.Models.length ?
            this.state.Models.map((model, i) => {
                return (React.createElement("option", { value: model.Id, key: model.Id }, model.Name));
            }) : null);
    }
    loadYearsByModel() {
        return (this.state.Years.length ?
            this.state.Years.map((year, i) => {
                return (React.createElement("option", { value: year.Id, key: year.Id }, year.Name));
            }) : null);
    }
    checkValidOnEveryChange(name, valid) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }
    getShortName(selectedValue, target) {
        target.forEach(function (currentElement) {
            if (currentElement.nodeValue == selectedValue) {
                return currentElement.dataset.shortName;
            }
        });
        return "";
    }
    render() {
        return (React.createElement("div", { className: "ibox-content" },
            React.createElement("form", { method: "post", className: "form-horizontal", onSubmit: this.onSave },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label" }, "M\u00E3 xe"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", readOnly: true, value: this.state.Car.Id }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "Bi\u1EC3n s\u1ED1 xe"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", name: "LicensePlates", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Car.LicensePlates }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "Chi nh\u00E1nh"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("select", { className: "form-control m-b", name: "BranchId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Car.BranchId }, this.loadBranches()))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "H\u00E3ng xe"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("select", { className: "form-control m-b", name: "ManufacturerId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Car.ManufacturerId }, this.loadManufacturers()))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "D\u00F2ng xe"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("select", { className: "form-control m-b", name: "ModelId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Car.ModelId }, this.loadModelsByManufacturer()))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "N\u0103m s\u1EA3n xu\u1EA5t"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("select", { className: "form-control m-b", name: "YearId", onChange: e => this.selectEvent(e, (name, value) => this.validateSelectRequired(name, value)), value: this.state.Car.YearId }, this.loadYearsByModel()))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "T\u00EAn xe"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", name: "Name", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Car.Name }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "M\u00E0u s\u1EAFc"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", name: "Color", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Car.Color }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "S\u1ED1 Vin"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", name: "Vinnumber", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Car.Vinnumber }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "col-sm-3 control-label required" }, "S\u1ED1 Km"),
                    React.createElement("div", { className: "col-sm-9" },
                        React.createElement("input", { type: "text", className: "form-control", name: "Km", onInput: e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value)), value: this.state.Car.Km }))),
                React.createElement("div", { className: "hr-line-dashed" }),
                React.createElement("div", { className: "form-group" },
                    React.createElement("div", { className: "col-sm-12 text-center" },
                        React.createElement("button", { className: "btn btn-primary", disabled: !this.state.IsValid, type: "submit" }, "L\u01B0u"))))));
    }
}
function mapStateToProps(state) {
    return {
        carResult: state.CarReducer,
        allManufacturersResult: state.AllManufacturersReducer,
        modelsByManufacturerResult: state.ModelsByManufacturerReducer,
        yearsByModelResult: state.YearsByModelReducer,
        carCreateResult: state.CarCreateReducer,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    let carAction = new FetchAction.CarAction();
    let allManufacturersAction = new FetchAction.AllManufacturersAction();
    let modelsByManufacturerAction = new FetchAction.ModelsByManufacturerAction();
    let yearsByModelAction = new FetchAction.YearsByModelAction();
    let carCreateAction = new PostAction.CarCreateAction();
    return {
        getCar: () => dispatch(carAction.getCar(ownProps.customerId)),
        getAllManufacturers: () => dispatch(allManufacturersAction.getAllManufacturers()),
        getModelsManufacturer: (entry) => dispatch(modelsByManufacturerAction.getModelsByManufacturer(entry)),
        getYearsByModel: (entry) => dispatch(yearsByModelAction.getYearsByModel(entry)),
        create: (entry) => dispatch(carCreateAction.createNewCar(entry)),
    };
}
const connectedCar = connect(mapStateToProps, mapDispatchToProps)(CarForm);
export { connectedCar as CarForm };
//# sourceMappingURL=car-form.js.map