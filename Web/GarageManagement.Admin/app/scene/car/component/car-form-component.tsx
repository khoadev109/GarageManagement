import React from "react";
import GeneralState from "../../../core/state/general-state";
import StateResponse from "../state/response-state-handler";
import ToastHelper from "../../../component/common-helper/toast-helper";
import { ICar } from "../state/car-state";
import { IOwnedCar } from "../state/owned-cars-state";
import { IFormProps, CombinedProps, CarFormMapping } from "../redux-mapping/car-form-mapping";
import { OwnedCars } from "../component/owned-cars-component";
import { GeneralFormComponent } from "core/component/base-form-component";
import { Anchor } from "../../../component/control/anchor-component";
import { SelectWithLabelHorizontal } from "../../../component/control/select-component";
import { Button } from "../../../component/control/button-component";
import { Hr } from "../../../component/common/common-component";
import { SubmitCenter } from "../../../component/control/submit-component";
import { TextboxWithLabelHorizontal, TextboxReadOnlyWithLabelHorizontal } from "../../../component/control/textbox-component";

interface FormState {
    IsValid?: boolean,
    Car: ICar,
    OwnedCars: Array<IOwnedCar>,
    Branches: Array<GeneralState.Branch>,
    Manufacturers: Array<GeneralState.Manufacturer>,
    Styles: Array<GeneralState.Style>,
    Models: Array<GeneralState.Model>,
    Years: Array<GeneralState.Year>
}

class CarForm extends GeneralFormComponent<CombinedProps, FormState, ICar> {
    
    constructor(props: CombinedProps, state: FormState) {
        super(props, state);
        this.reloadCustomers = this.reloadCustomers.bind(this);
        this.onClearInfoAndAddNewCar = this.onClearInfoAndAddNewCar.bind(this);
        this.onLoadSelectedCarFromListCustomerCars = this.onLoadSelectedCarFromListCustomerCars.bind(this);
        this.reloadCustomerInfoFromQuotation = this.reloadCustomerInfoFromQuotation.bind(this);
        this.reloadOwnedCars = this.reloadOwnedCars.bind(this);
    }
    
    setInitialErrors(effectForAllValues?: boolean) {
        this.errors.add("Km", true);
        this.errors.add("LicensePlates", effectForAllValues);
    }

    initState() {
        this.state = {
            IsValid: true,
            Car: this.initializeCar(),
            OwnedCars: new Array<IOwnedCar>(),
            Branches: new Array<GeneralState.Branch>(),
            Manufacturers: new Array<GeneralState.Manufacturer>(),
            Styles: new Array<GeneralState.Style>(),
            Models: new Array<GeneralState.Model>(),
            Years: new Array<GeneralState.Year>()
        };
        this.originalState = this.state;
    }

    initializeCar() {
        return {
            Id: "",
            GenerateId: 0,
            Color: "",
            VinNumber: "",
            MachineNumber: "",
            LicensePlates: "",
            Km: 0,
            BranchId: "",
            BranchName: "",
            ManufacturerId: 0,
            ManufacturerName: "",
            StyleId: 0,
            StyleName: "",
            ModelId: 0,
            ModelName: "",
            YearId: 0,
            YearName: "",
            CurrentCarOwnerId: this.props.customerId,
            CurrentCarOwnerName: ""
        };
    }

    refreshCarOrCarOwners(carId: string = "") {
        this.setState({ 
            Car: this.originalState.Car,
            OwnedCars: new Array<IOwnedCar>() 
        }, 
        () => this.props.getCar(carId));
    }

    onClearInfoAndAddNewCar() {
        this.refreshCarOrCarOwners();
    }

    onLoadSelectedCarFromListCustomerCars(carId: string) {
        this.refreshCarOrCarOwners(carId);
    }

    onSave(event: any) {
        event.preventDefault();
        
        if (!this.state.IsValid) {
            return;
        }
            
        this.state.Car.BranchId = this.props.branchId;

        if (this.state.Car.GenerateId === 0) {
            const entryCreate = { 
                car: this.state.Car, 
                customerExchangeId: this.props.customerExchangeId ? this.props.customerExchangeId : 0 
            };

            this.props.create(entryCreate);
        } else {
            this.props.edit(this.state.Car);
        }
    }

    componentDidMount() {
        const selectedOwnedCarId = this.props.selectedOwnedCarId;
        if (selectedOwnedCarId != undefined) {
            this.props.getCar(selectedOwnedCarId);
        } else {
            this.props.getOwnedCars();
        }
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        this.setOwnedCarsResponseFromServer(nextProps);
        this.setUniqueCarResponseFromServer(nextProps);
        this.setModelsByManufacturerResponseFromServer(nextProps);
        this.setYearsByModelResponseFromServer(nextProps);
        this.setCarCreateResponseFromServer(nextProps);
        this.setCarEditResponseFromServer(nextProps);
    }

    setOwnedCarsResponseFromServer(nextProps: IFormProps) {
        const ownedCarsResult = nextProps.ownedCarsResult.target;
        const isChanged = this.isPropsChanged(this.props.ownedCarsResult.target, ownedCarsResult);
        const isSuccess = this.isSuccessResponseFromServer(ownedCarsResult);

        if (isChanged && isSuccess) {
            const ownedCars = new Array<IOwnedCar>();
            
            for (let car of ownedCarsResult.Data) {  
                ownedCars.push({
                    Id: car.Id,
                    LicensePlates: car.LicensePlates,
                    Name: `${car.ManufacturerName} ${car.ModelName} ${car.YearName}`
                });
            }
            
            this.setState({ OwnedCars: ownedCars },
            () => {
                const ownedCarsLoaded = this.state.OwnedCars;
                if (ownedCarsLoaded.length > 1) {
                    return;
                }

                const specifyCarId = ownedCarsLoaded.length == 1 ? ownedCarsLoaded[0].Id : "";
                this.props.getCar(specifyCarId);
            });
        }
    }
    
    setUniqueCarResponseFromServer(nextProps: IFormProps) {
        let carResult = nextProps.carResult.target;
        if (carResult != this.props.carResult.target && carResult.Success) {
            const carResponse = carResult.Data;

            const specifyCarUpdated: ICar = StateResponse.setCarResponse(carResponse);

            if (!this.props.isCreateNewCustomer)
                specifyCarUpdated.CurrentCarOwnerId = this.props.customerId;

            this.setState({
                IsValid: specifyCarUpdated.GenerateId > 0,
                Car: specifyCarUpdated,
                Branches: StateResponse.setBranchResponse(carResponse.Branches),
                Manufacturers: StateResponse.setManufacturersResponse(carResponse.Manufacturers)
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

    setModelsByManufacturerResponseFromServer(nextProps: IFormProps) {
        const modelsResult = nextProps.modelsByManufacturerResult.target;
        const isChanged = this.isPropsChanged(modelsResult, this.props.modelsByManufacturerResult.target);
        const isSuccess = this.isSuccessResponseFromServer(modelsResult);

        if (isChanged && isSuccess) {
            const convertedModels = StateResponse.setModelsByManufacturerResponse(modelsResult.Data);
            this.setState({ Models: convertedModels });
        }
    }

    setYearsByModelResponseFromServer(nextProps: IFormProps) {
        const yearsResult = nextProps.yearsByModelResult.target;
        const isChanged = this.isPropsChanged(yearsResult, this.props.yearsByModelResult.target);
        const isSuccess = this.isSuccessResponseFromServer(yearsResult);

        if (isChanged && isSuccess) {
            const convertedYears = StateResponse.setYearsByModelResponse(yearsResult.Data);
            this.setState({ Years: convertedYears });
        }
    }
    
    setCarCreateResponseFromServer(nextProps: IFormProps) {
        const carCreateResult = nextProps.carCreateResult.target;
        const isChanged = this.isPropsChanged(carCreateResult, this.props.carCreateResult.target);
        
        if (isChanged) {
            const isSuccess = this.isSuccessResponseFromServer(carCreateResult);

            if (isSuccess) {
                if (this.props.selectedOwnedCarId != undefined) {
                    this.reloadCustomers();
                    this.closePopup();
                    this.reloadCustomerInfoFromQuotation(carCreateResult.Data.Car.Id);
                }
                else {
                    this.props.getOwnedCars();
                }

                ToastHelper.notifySuccess("Tạo mới xe thành công");
            }
            else {
                const errorMessage = this.getErrorMessageFromServer(carCreateResult);
                this.showErrorFromServerWhenCreateOrEditCar(errorMessage);
            }
        }
    }
    
    setCarEditResponseFromServer(nextProps: IFormProps) {
        const carEditResult = nextProps.carEditResult.target;
        const isChanged = this.isPropsChanged(carEditResult, this.props.carEditResult.target);

        if (isChanged) {
            const isSuccess = this.isSuccessResponseFromServer(carEditResult);

            if (isSuccess) {
                if (this.props.selectedOwnedCarId != undefined) {
                    this.reloadCustomers();
                    this.closePopup();
                    this.reloadCustomerInfoFromQuotation(carEditResult.Data.Id);
                }
                else {
                    this.props.getOwnedCars();
                }

                ToastHelper.notifySuccess("Cập nhật xe thành công!");
            }
            else {
                const errorMessage = this.getErrorMessageFromServer(carEditResult);
                this.showErrorFromServerWhenCreateOrEditCar(errorMessage);
            }
        }
    }
    
    showErrorFromServerWhenCreateOrEditCar(errorMessage: string) {
        if (errorMessage === "Existed Car Machine Number") {
            alert("Đã tồn tại số máy này trong hệ thống. Vui lòng nhập tên khác.");
        } else if (errorMessage === "Existed Car Vin Number") {
            alert("Đã tồn số vin này trong hệ thống. Vui lòng nhập số vin khác.");
        } else if (errorMessage === "Existed Car License Plates") {
            alert("Đã tồn tại biển số xe này trong hệ thống. Vui lòng nhập biển số xe khác.");
        } else {
            alert(errorMessage);
        }
    }

    inputEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        // http://duncanleung.com/fixing-react-warnings-synthetic-events-in-setstate/

        // if (name == "LicensePlates")
        event.persist();

        this.setState({ 
            Car: this.inputInteraction.onBindTarget(event.target, this.state.Car) 
        }, () => {
            const isValidInputAlphaNumericForLicensePlates = this.limitInputOnlyAlphanumericForLicensePlates(event.target);
            if (isValidInputAlphaNumericForLicensePlates) {
                this.triggerValidation(event, validationFunc, required, valueToCompare);
            }
        });
    }

    limitInputOnlyAlphanumericForLicensePlates(target: HTMLInputElement) {
        const targetName = target.name;
        const targetValue = target.value;

        if (targetName !== "LicensePlates") {
            return true;
        }

        const existingErrorElement = target.nextElementSibling;
        if (existingErrorElement != null) {
            existingErrorElement.remove();
        }

        if (targetValue !== "" && new RegExp(/[^A-Za-z0-9]+/g).test(targetValue)) {
            const alphaNumericErrorElement = document.createElement("span");
            alphaNumericErrorElement.classList.add("has-errors");
            alphaNumericErrorElement.innerText = "Biển số xe chỉ được nhập chữ và số, không bao gồm ký tự đặc biệt";

            target.insertAdjacentElement("afterend", alphaNumericErrorElement);
            return false;
        }

        return true;
    }

    selectEvent(event: any, validationFunc?: any, required?: boolean, valueToCompare?: any) {
        this.setCarIdBaseOnSelectedBranch(event.target);
        this.setManufacturerNameAndFillModelsDropDownListBaseOnSelectedManufacturer(event.target);
        this.setModelNameAndFillYearsDropDownListBaseOnSelectedModel(event.target);
        this.setYearNameBaseOnSelectedYear(event.target);
        
        this.setState({
            Car: this.selectInteraction.onBindTarget(event.target, this.state.Car)
        }, 
        this.triggerValidation(event, validationFunc, required, valueToCompare));
    }
    
    setCarIdBaseOnSelectedBranch(target: any) {
        if (target.name == "BranchId") {
            const carIdSegments: Array<string> = this.state.Car.Id.split("-");
            if (carIdSegments[0] != "") {
                carIdSegments[0] = "";
                this.state.Car.Id = carIdSegments.join("-");
            }
            const shortName = target.options[target.selectedIndex].dataset.shortName;
            this.state.Car.Id = shortName.concat(this.state.Car.Id);
        }
    }

    setManufacturerNameAndFillModelsDropDownListBaseOnSelectedManufacturer(target: any) {
        if (target.name == "ManufacturerId") {
            this.state.Car.ManufacturerName = target.options[target.selectedIndex].text.trim();
            this.props.getModelsManufacturer(target.value);
        }
    }

    setModelNameAndFillYearsDropDownListBaseOnSelectedModel(target: any) {
        if (target.name == "ModelId") {
            this.state.Car.ModelName = target.options[target.selectedIndex].text.trim();
            this.props.getYearsByModel(target.value);
        }
    }

    setYearNameBaseOnSelectedYear(target: any) {
        if (target.name == "YearId") {
            this.state.Car.YearName = target.options[target.selectedIndex].text.trim();
        }
    }

    reloadCustomers() {
        if (this.props.reloadCustomers)
            this.props.reloadCustomers();
    }

    reloadCars() {
        if (this.props.reloadCars)
            this.props.reloadCars();
    }

    reloadOwnedCars() {
        if (this.props.getOwnedCars)
            this.props.getOwnedCars();
    }

    reloadCustomerInfoFromQuotation(carId: string) {
        if (this.props.reloadCustomerInfoFromQuotation) {
            const customerId = this.props.customerId ? this.props.customerId : this.state.Car.CurrentCarOwnerId;
            this.props.reloadCustomerInfoFromQuotation(customerId, carId);
        }
    }

    renderBranches() {
        return (
            this.state.Branches.length ? 
                this.state.Branches.map((branch) => { 
                    return <option value={branch.Id} key={branch.Id} data-short-name={branch.ShortName}>{branch.Name}</option>
                }) : null
        )
    }

    renderManufacturers() {
        return (
            this.state.Manufacturers.length ? 
                this.state.Manufacturers.map((manufacturer) => { 
                    return <option value={manufacturer.Id} key={manufacturer.Id}>{manufacturer.Name}</option>
                }) : null
        )
    }

    renderModelsByManufacturer() {
        return (
            this.state.Models.length ? 
                this.state.Models.map((model) => { 
                    return <option value={model.Id} key={model.Id}>{model.Name}</option>
                }) : null
        )
    }

    renderYearsByModel() {
        return (
            this.state.Years.length ? 
                this.state.Years.map((year) => { 
                    return <option value={year.Id} key={year.Id}>{year.Name}</option>
                }) : null
        )
    }

    renderListCarOwnersLink() {
        return (
            <div className="text-right">
                <h4><Anchor click={this.props.getOwnedCars} content="Danh sách xe" /></h4>
            </div>
        )
    }

    renderAddMoreCarButton() {
        return <Button text="Thêm xe" click={this.onClearInfoAndAddNewCar} textAlign="text-right" />
    }

    renderCustomerOwnedCars() {
        return <OwnedCars cars={this.state.OwnedCars}
                        customerId={this.props.customerId}
                        customerName={this.props.customerName}
                        clearInfoAndAddNewCar={this.onClearInfoAndAddNewCar}
                        selectSpecifyCarToLoad={(carId: string) => this.onLoadSelectedCarFromListCustomerCars(carId)}
                        reloadOwnedCars={this.reloadOwnedCars} />
    }

    render() {
        const isNotExistedCarOwner = this.state.Car.CurrentCarOwnerId === "";
        const isHaveMultipleCarOwnersInList = this.state.OwnedCars.length > 1;
        const canShowCustomerOwnedCars = isHaveMultipleCarOwnersInList && !this.props.selectedOwnedCarId;

        return (
            <React.Fragment>
                {
                    isNotExistedCarOwner ? "Tạo mới khách hàng trước khi thêm xe" 
                    : 
                    (
                        canShowCustomerOwnedCars ? this.renderCustomerOwnedCars() 
                        :
                        (
                            <React.Fragment>
                                {
                                    isHaveMultipleCarOwnersInList ? this.renderListCarOwnersLink() : this.renderAddMoreCarButton()
                                }
                                <Hr />
                                <form method="post" className="form-horizontal" onSubmit={this.onSave}>
                                    <TextboxReadOnlyWithLabelHorizontal labelText="Mã xe" name="Id" value={this.state.Car.Id} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="LicensePlates" labelText="Biển số xe" 
                                                                value={this.state.Car.LicensePlates} isRequired={true}
                                                                event={this.inputEvent.bind(this, (name, value) => this.validateRequiredForInput(name, value))} />
                                    <Hr />
                                    <SelectWithLabelHorizontal labelText="Hãng xe" name="ManufacturerId" 
                                                                value={this.state.Car.ManufacturerId}
                                                                loadDataFunc={this.renderManufacturers} 
                                                                event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <SelectWithLabelHorizontal labelText="Dòng xe" name="ModelId" 
                                                                value={this.state.Car.ModelId}
                                                                loadDataFunc={this.renderModelsByManufacturer} 
                                                                event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <SelectWithLabelHorizontal labelText="Năm sản xuất" name="YearId" 
                                                                value={this.state.Car.YearId}
                                                                loadDataFunc={this.renderYearsByModel} 
                                                                event={this.selectEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Color" labelText="Màu sắc" 
                                                                value={this.state.Car.Color}
                                                                event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="VinNumber" labelText="Số Vin" 
                                                                value={this.state.Car.VinNumber}
                                                                event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="MachineNumber" labelText="Số máy" 
                                                                value={this.state.Car.MachineNumber}
                                                                event={this.inputEvent.bind(this)} />
                                    <Hr />
                                    <TextboxWithLabelHorizontal name="Km" labelText="Số Km" 
                                                                value={this.state.Car.Km}
                                                                event={this.inputEvent.bind(this, 
                                                                (name, value, required, valueCompare) => this.validateNumberAndMaxLengthForInput(name, value, required, valueCompare), false, 30)} />
                                    <Hr />
                                    <SubmitCenter disabled={!this.state.IsValid} />
                                </form>
                            </React.Fragment>
                        )
                    )
                }
            </React.Fragment>
        )
    }
}

const connectedComponent = new CarFormMapping().connectComponent(CarForm);
export { connectedComponent as CarForm };
