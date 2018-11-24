import React from "react";
import { connect } from "react-redux";

import * as BaseComponent from "core/component/component";
import { CustomerOwnedCars } from "../../component/presentation/customer-owned-cars";

import * as PostAction from "../../action/post-action";
import * as FetchAction from "../../action/fetch-action";

import { ICar } from "../../model/car-model";
import { Branch } from "../../model/branchmodel";
import { IOwnedCar } from "../../model/owned-cars-model";
import { Manufacturer, Style, Model, Year } from "../../model/common-model";
import { initializeCar } from "../../model/initialization";
import { setResponseStateForCar } from "../../model/response-state-transform";

import * as ToastHelper from "component/common/toast/toast";
import Dictionary  from "core/library/dictionary";
import { FormInteraction } from "core/library/interaction/form-interaction";
import { FormValidation } from "../../../../core/library/extension/validation";
import { FormValidationCombine } from "core/library/extension/validation/validation-combine";

interface ICarState {
    IsValid?: boolean,
    Car: ICar,
    OwnedCars: Array<IOwnedCar>,
    Branches: Array<Branch>,
    Manufacturers: Array<Manufacturer>,
    Styles: Array<Style>,
    Models: Array<Model>,
    Years: Array<Year>,
    Errors: Dictionary.IKeyedCollection<boolean>
}

class CarForm extends React.Component<any, ICarState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private ownedCarsCounting: number = 0;
    private errors: Dictionary.IKeyedCollection<boolean>;
    private readonly inputInteraction: FormInteraction.InputInteraction<ICar>;
    private readonly selectInteraction: FormInteraction.SelectInteraction<ICar>;

    constructor(props: any) {
        super(props);
        this.closePopup = this.closePopup.bind(this);
        this.reloadCustomers = this.reloadCustomers.bind(this);
        this.clearInfoAndAddNewCar = this.clearInfoAndAddNewCar.bind(this);
        this.loadSelectedCarFromOwnedCars = this.loadSelectedCarFromOwnedCars.bind(this);
        this.reloadCustomerInfoFromQuotation = this.reloadCustomerInfoFromQuotation.bind(this);
        this.reloadOwnedCars = this.reloadOwnedCars.bind(this);

        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<ICar>();
        this.selectInteraction = new FormInteraction.SelectInteraction<ICar>();

        this.setInitialErrors(false);
        this.initializeState();
    }
    
    setInitialErrors(effectForAllValues: boolean) {
        this.errors.Add("Km", true);
        this.errors.Add("LicensePlates", effectForAllValues);
        // this.errors.Add("ManufacturerId", effectForAllValues);
        // this.errors.Add("ModelId", effectForAllValues);
        // this.errors.Add("YearId", effectForAllValues);
    }

    initializeState() : ICarState {
        this.state = {
            IsValid: true,
            Car: initializeCar(),
            OwnedCars: new Array<IOwnedCar>(),
            Branches: new Array<Branch>(),
            Manufacturers: new Array<Manufacturer>(),
            Styles: new Array<Style>(),
            Models: new Array<Model>(),
            Years: new Array<Year>(),
            Errors: this.errors
        };
        this.state.Car.CurrentCarOwnerId = this.props.customerId;
        return this.state;
    }

    closePopup() {
        if (this.props.closeModal)
            this.props.closeModal();
    }

    reloadCustomers() {
        if (this.props.reloadCustomers)
            this.props.reloadCustomers();
    }

    reloadCars() {
        if (this.props.reloadCars)
            this.props.reloadCars();
    }

    reloadCustomerInfoFromQuotation(carId: string) {
        if (this.props.reloadCustomerInfoFromQuotation) {
            let customerId = this.props.customerId ? this.props.customerId : this.state.Car.CurrentCarOwnerId;
            this.props.reloadCustomerInfoFromQuotation(customerId, carId);
        }
    }
    
    onSave = (event: any): any => {
        event.preventDefault();
        
        if (this.state.IsValid) {
            this.state.Car.BranchId = this.props.branchId;
            if (this.state.Car.GenerateId == 0)
                this.props.create({ 
                    Car: this.state.Car, 
                    CustomerExchangeId: this.props.customerExchangeId ? this.props.customerExchangeId : 0 
                });
            else
                this.props.edit(this.state.Car);
        }
    }

    componentDidMount() {
        let selectedOwnedCarId = this.props.selectedOwnedCarId;
        if (selectedOwnedCarId != undefined)
            this.loadSpecifyCar(selectedOwnedCarId);
        else
            this.props.getOwnedCars();
    }

    reloadOwnedCars(){
        if(this.props.getOwnedCars)
            this.props.getOwnedCars();
    }

    componentWillReceiveProps(nextProps) {
        this.setResponseStateForOwnedCars(nextProps);
        this.setResponseStateForSpecifyCar(nextProps);
        this.setResponseStateForModelsByManufacturer(nextProps);
        this.setResponseStateForYearsByModel(nextProps);
        this.setResponseStateForCarCreate(nextProps);
        this.setResponseStateForCarEdit(nextProps);
    }
    
    setResponseStateForOwnedCars(nextProps) {
        let ownedCarsResult = nextProps.ownedCarsResult.target;
        if (ownedCarsResult != this.props.ownedCarsResult.target && ownedCarsResult.Success) {
            let ownedCars = new Array<IOwnedCar>();
            
            for (let car of ownedCarsResult.Data) {  
                ownedCars.push({
                    Id: car.Id,
                    LicensePlates: car.LicensePlates,
                    Name: `${car.ManufacturerName} ${car.ModelName} ${car.YearName}`
                });
            }
            
            this.setState({ OwnedCars: ownedCars },
            () => {
                if (this.state.OwnedCars.length > 1) {
                    this.ownedCarsCounting = this.state.OwnedCars.length;
                    return;
                }
                let specifyCarId = this.state.OwnedCars.length == 1 ? this.state.OwnedCars[0].Id : "";
                this.loadSpecifyCar(specifyCarId);
            });
        }
    }

    setResponseStateForSpecifyCar(nextProps) {
        let carResult = nextProps.carResult.target;
        if (carResult != this.props.carResult.target && carResult.Success) {
            let dataResponse = carResult.Data;

            let specifyCarUpdated: ICar = setResponseStateForCar(dataResponse);

            if (!this.props.isCreateNewCustomer)
                specifyCarUpdated.CurrentCarOwnerId = this.props.customerId;

            this.setState({
                IsValid: specifyCarUpdated.GenerateId > 0,
                Car: specifyCarUpdated,
                Branches: this.setResponseStateForBranch(dataResponse.Branches),
                Manufacturers: this.setResponseStateForManufacturers(dataResponse.Manufacturers),
                Errors: this.errors
            },
            () => {
                if (this.state.Car.ManufacturerId > 0)
                    this.props.getModelsManufacturer(this.state.Car.ManufacturerId);
                
                if (this.state.Car.ModelId > 0)
                    this.props.getYearsByModel(this.state.Car.ModelId);

                if (this.state.Car.GenerateId > 0)
                    this.setInitialErrors(true);
            });
        }
    }

    setResponseStateForBranch(branchesResponse) {
        let branches = new Array<Branch>();
        if (branchesResponse)
            branchesResponse.map((branch, i) => { branches.push(new Branch(branch.Id, branch.Name, branch.ShortName)); })
        return branches;        
    }
    
    setResponseStateForManufacturers(dataResponse: any) {
        let manufacturers = new Array<Manufacturer>(new Manufacturer(0, "Chọn hãng sản xuất"));
        if (dataResponse.length)
            dataResponse.map((manufacturer, i) => { manufacturers.push(new Manufacturer(manufacturer.Id, manufacturer.Name )); });
        return manufacturers;
    }

    setResponseStateForModelsByManufacturer(nextProps) {
        let modelsByManufacturerResult = nextProps.modelsByManufacturerResult.target;
        if (modelsByManufacturerResult != this.props.modelsByManufacturerResult.target && modelsByManufacturerResult.Success) {
            
            let models = new Array<Model>(new Model(0, "Chọn dòng xe"));
            if (modelsByManufacturerResult.Data)
                modelsByManufacturerResult.Data.map((model, i) => { models.push(new Model(model.Id, model.Name )); })
            
            this.setState({ Models: models });
        }
    }

    setResponseStateForYearsByModel(nextProps) {
        let yearsByModelResult = nextProps.yearsByModelResult.target;
        if (yearsByModelResult != this.props.yearsByModelResult.target && yearsByModelResult.Success) {
            
            let years = new Array<Year>(new Year(0, "Chọn năm sản xuất"));
            if (yearsByModelResult.Data)
                yearsByModelResult.Data.map((year, i) => { years.push(new Year(year.Id, year.Name )); })
            
            this.setState({ Years: years });
        }
    }
    
    setResponseStateForCarCreate(nextProps) {
        let carCreateResult = nextProps.carCreateResult.target;
        if (carCreateResult != this.props.carCreateResult.target) {
            if (carCreateResult.Success) {
                ToastHelper.notificationSuccess("Tạo mới xe thành công");
                if (this.props.selectedOwnedCarId != undefined) {
                    this.reloadCustomers();
                    this.closePopup();
                    this.reloadCustomerInfoFromQuotation(carCreateResult.Data.Car.Id);
                }
                else {
                    this.props.getOwnedCars();
                }
            }
            else {
                if (carCreateResult.Message)
                    this.showErrorFromServerWhenCreateOrEditCar(carCreateResult.Message[0].ErrorMessage);
            }
        }
    }
    
    setResponseStateForCarEdit(nextProps) {
        let carEditResult = nextProps.carEditResult.target;
        if (carEditResult != this.props.carEditResult.target) {
            if (carEditResult.Success) {
                ToastHelper.notificationSuccess("Cập nhật xe thành công!");
                if (this.props.selectedOwnedCarId != undefined) {
                    this.reloadCustomers();
                    this.closePopup();
                    this.reloadCustomerInfoFromQuotation(carEditResult.Data.Id);
                }
                else {
                    this.props.getOwnedCars();
                }
            }
            else {
                if (carEditResult.Message)
                    this.showErrorFromServerWhenCreateOrEditCar(carEditResult.Message[0].ErrorMessage);
            }
        }
    }
    
    showErrorFromServerWhenCreateOrEditCar(errorMessage: string) {
        if (errorMessage == "Existed Car Machine Number")
            alert("Đã tồn tại số máy này trong hệ thống. Vui lòng nhập tên khác.");
        else if (errorMessage == "Existed Car Vin Number")
            alert("Đã tồn số vin này trong hệ thống. Vui lòng nhập số vin khác.");
        else if (errorMessage == "Existed Car License Plates")
            alert("Đã tồn tại biển số xe này trong hệ thống. Vui lòng nhập biển số xe khác.");
        else
            alert(errorMessage);
    }

    loadBranches() {
        return (
            this.state.Branches.length ? 
            this.state.Branches.map((branch, i) => { 
                return (<option value={branch.Id} key={branch.Id} data-short-name={branch.ShortName}>{branch.Name}</option>) 
            }) : null
        )
    }

    loadManufacturers() {
        return (
            this.state.Manufacturers.length ? 
            this.state.Manufacturers.map((manufacturer, i) => { 
                return (<option value={manufacturer.Id} key={manufacturer.Id}>{manufacturer.Name}</option>)
            }) : null
        )
    }

    loadModelsByManufacturer() {
        return (
            this.state.Models.length ? 
            this.state.Models.map((model, i) => { return (<option value={model.Id} key={model.Id}>{model.Name}</option>) }) : null
        )
    }

    loadYearsByModel() {
        return (
            this.state.Years.length ? 
            this.state.Years.map((year, i) => { return (<option value={year.Id} key={year.Id}>{year.Name}</option>) }) : null
        )
    }

    checkValidOnEveryChange(name: string, valid: boolean) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }

    validateSelectRequired = (name: string, value: any) => {
        let isValid = this.selectInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputRequired = (name: string, value: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
    }

    validateInputNumberAndMaxLength = (name: string, value: any, required: boolean, valueCompare: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
        this.checkValidOnEveryChange(name, isValid);
    }
    
    inputEvent = (event: any, validation?: (name: string, value: any, required?: boolean, valueCompare?: any) => void, 
                  required?: boolean, valueToCompare?: any) => {
        
        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null; 
        
        // http://duncanleung.com/fixing-react-warnings-synthetic-events-in-setstate/

        // if (name == "LicensePlates")
            event.persist();

        this.setState({ Car: this.inputInteraction.onReceiveTarget(event.target, this.state.Car) }, 
            () => { 
                let isValidAlphaNumericLicensePlates = this.limitInputOnlyAlphanumericForLicensePlates(event.target);
                if (isValidAlphaNumericLicensePlates && doValidation)
                    doValidation();
            });
    }

    selectEvent = (event: any, validation?: (name: string, value: any, required?: boolean, valueCompare?: any) => void,
                   required?: boolean, valueToCompare?: any) => {
        
        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null; 
        
        this.setCarIdBaseOnSelectedBranch(event.target);
        this.setManufacturerNameAndFillModelsDropDownListBaseOnSelectedManufacturer(event.target);
        this.setModelNameAndFillYearsDropDownListBaseOnSelectedModel(event.target);
        this.setYearNameBaseOnSelectedYear(event.target);
        
        this.setState({ Car: this.selectInteraction.onReceiveTarget(event.target, this.state.Car) }, doValidation);
    }
    
    setCarIdBaseOnSelectedBranch(target: any) {
        if (target.name == "BranchId") {
            let carIdSegments: Array<string> = this.state.Car.Id.split("-");
            if (carIdSegments[0] != "") {
                carIdSegments[0] = "";
                this.state.Car.Id = carIdSegments.join("-");
            }
            var shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Car.Id = shortName.concat(this.state.Car.Id);
        }
    }

    setManufacturerNameAndFillModelsDropDownListBaseOnSelectedManufacturer(target: any) {
        if (target.name == "ManufacturerId") {
            this.props.getModelsManufacturer(target.value);
            this.state.Car.ManufacturerName = target.options[target.selectedIndex].text.trim();
        }
    }

    setModelNameAndFillYearsDropDownListBaseOnSelectedModel(target: any) {
        if (target.name == "ModelId") {
            this.props.getYearsByModel(target.value);
            this.state.Car.ModelName = target.options[target.selectedIndex].text.trim();
        }
    }

    setYearNameBaseOnSelectedYear(target: any) {
        if (target.name == "YearId")
            this.state.Car.YearName = target.options[target.selectedIndex].text.trim();
    }

    limitInputOnlyAlphanumericForLicensePlates(target: HTMLInputElement) {
        if (target.name == "LicensePlates") {
            let existingErrorElement = target.nextElementSibling;
            if (existingErrorElement != null)
                existingErrorElement.remove();

            if (target.value != "" && new RegExp(/[^A-Za-z0-9]+/g).test(target.value)) {
                let alphaNumericErrorElement = document.createElement("span");
                alphaNumericErrorElement.classList.add("has-errors");
                alphaNumericErrorElement.innerText = "Biển số xe chỉ được nhập chữ và số, không bao gồm ký tự đặc biệt";

                target.insertAdjacentElement("afterend", alphaNumericErrorElement);
                return false;
            }
        }
        return true;
    }
    
    loadOwnedCarsFromParent(customerId: string) {
        this.state.Car.CurrentCarOwnerId = customerId;
        this.setState({ Car: this.state.Car });
    }
    
    loadSpecifyCar(carId: string = "") {
        this.props.getCar(carId);
    }

    clearInfoAndAddNewCar() {
        this.loadSpecifyCar();
        this.setState({ 
            Car: this.state.Car,
            OwnedCars: new Array<IOwnedCar>() 
        });
    }
    
    loadSelectedCarFromOwnedCars(carId: string) {
        this.loadSpecifyCar(carId);
        this.setState({ 
            Car: this.state.Car,
            OwnedCars: new Array<IOwnedCar>() 
        });
    }

    renderOwnerCarsLink() {
        if (this.ownedCarsCounting > 1)
            return (
                <div className="text-right">
                    <h4><a href="javascript:void(0);" onClick={this.props.getOwnedCars}>Danh sách xe</a></h4>
                </div>
            )
    }

    renderAddMoreCarButton() {
        if (this.state.OwnedCars.length == 1)
            return (
                <div className="text-right">
                    <button className="btn btn-primary text-right" type="button" 
                            onClick={this.clearInfoAndAddNewCar}>Thêm xe</button>
                </div>
            )
    }

    renderSingleOwnedCarFormOrListOwnedCarsWhenEditCustomer() {
        if (this.state.OwnedCars.length > 1 && !this.props.selectedOwnedCarId) {
            return <CustomerOwnedCars Cars={this.state.OwnedCars}
                                      CustomerId={this.props.customerId}
                                      CustomerName={this.props.customerName}
                                      ClearInfoAndAddNewCar={this.clearInfoAndAddNewCar}
                                      SelectSpecifyCarToLoad={(carId: string) => this.loadSelectedCarFromOwnedCars(carId)}
                                      reloadOwnedCars={this.reloadOwnedCars} />
        }
        else {
            return (
                <React.Fragment>
                    {this.renderOwnerCarsLink()}

                    {this.renderAddMoreCarButton()}

                    <div className="hr-line-dashed"></div>
                    <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                        <div className="form-group" style={{ display: "none" }}>
                            <label className="col-sm-3 control-label">Mã xe</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" readOnly value={this.state.Car.Id} />
                            </div>
                        </div>
                        {/* <div className="hr-line-dashed"></div> */}
                        <div className="form-group">
                            <label className="col-sm-3 control-label required">Biển số xe</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="LicensePlates"
                                        onInput={e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value))} 
                                        value={this.state.Car.LicensePlates} />
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Hãng xe</label>
                            <div className="col-sm-9">
                                <select className="form-control m-b" name="ManufacturerId"
                                        onChange={e => this.selectEvent(e)} value={this.state.Car.ManufacturerId}>
                                    { this.loadManufacturers() }
                                </select>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Dòng xe</label>
                            <div className="col-sm-9">
                                <select className="form-control m-b" name="ModelId"
                                        onChange={e => this.selectEvent(e)} value={this.state.Car.ModelId}>
                                    { this.loadModelsByManufacturer() }
                                </select>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Năm sản xuất</label>
                            <div className="col-sm-9">
                                <select className="form-control m-b" name="YearId"
                                        onChange={e => this.selectEvent(e)} value={this.state.Car.YearId}>
                                    { this.loadYearsByModel() }
                                </select>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Màu sắc</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="Color"
                                        onInput={e => this.inputEvent(e)}
                                        value={this.state.Car.Color} />
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Số Vin</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="VinNumber"
                                        onInput={e => this.inputEvent(e)} value={this.state.Car.VinNumber} />
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Số máy</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="MachineNumber"
                                        onInput={e => this.inputEvent(e)} value={this.state.Car.MachineNumber} />
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Số Km</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="Km"
                                        onInput={e => this.inputEvent(e, 
                                            (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 30)}
                                        value={this.state.Car.Km} />
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="form-group">
                            <div className="col-sm-12 text-center">
                                <button className="btn btn-primary" disabled={!this.state.IsValid} type="submit">Lưu</button>
                            </div>
                        </div>
                    </form>
                </React.Fragment>
            );
        }
    }

    renderCarFormWithCondition() {
        if (this.state.Car.CurrentCarOwnerId == "")
            return "Tạo mới khách hàng trước khi thêm xe";
        else
            return this.renderSingleOwnedCarFormOrListOwnedCarsWhenEditCustomer();
    }

    render() {
        return (
            <React.Fragment>
                {this.renderCarFormWithCondition()}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        branchId: ownProps.branchId,
        customerId: ownProps.customerId,
        customerName: ownProps.customerName,
        customerExchangeId: ownProps.customerExchangeId,
        selectedOwnedCarId: ownProps.selectedOwnedCarId,
        isCreateNewCustomer: ownProps.isCreateNewCustomer,

        carResult: state.CarReducer,
        ownedCarsResult: state.OwnedCarsReducer,
        allManufacturersResult: state.AllManufacturersReducer,
        modelsByManufacturerResult: state.ModelsByManufacturerReducer,
        yearsByModelResult: state.YearsByModelReducer,
        carCreateResult: state.CarCreateReducer, 
        carEditResult: state.CarEditReducer
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
    let carAction = new FetchAction.CarAction();
    let ownedCarsAction = new FetchAction.OwnedCarsAction();
    let modelsByManufacturerAction = new FetchAction.ModelsByManufacturerAction();
    let yearsByModelAction = new FetchAction.YearsByModelAction();
    let carCreateAction = new PostAction.CarCreateAction();
    let carEditAction = new PostAction.CarEditAction();

    return {
        closeModal: ownProps.closeModal,
        reloadCustomers: ownProps.reloadCustomers,
        reloadCustomerInfoFromQuotation: ownProps.reloadCustomerInfoFromQuotation,
        reloadCars: ownProps.reloadCars,

        edit: (car: ICar) => dispatch(carEditAction.post(car)),
        create: (car: ICar) => dispatch(carCreateAction.post(car)),
        getCar: (carId: string) => dispatch(carAction.fetch(carId)),
        getOwnedCars: () => dispatch(ownedCarsAction.fetch(ownProps.customerId)),
        getYearsByModel: (modelId: number) => dispatch(yearsByModelAction.fetch(modelId)),
        getModelsManufacturer: (manufacturerId: number) => dispatch(modelsByManufacturerAction.fetch(manufacturerId)),
    }
}

const connectedCar = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CarForm);
export { connectedCar as CarForm };
