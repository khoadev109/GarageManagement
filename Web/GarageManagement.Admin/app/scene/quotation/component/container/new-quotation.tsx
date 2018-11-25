import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "moment/locale/it";
import MomentLocaleUtils, { formatDate, parseDate, } from "react-day-picker/moment";

import * as FetchAction from "../../action/fetch-action";
import * as PostAction from "../../action/post-action";
import * as CarFetchAction from "../../../car/action/fetch-action";
import * as CustomerFetchAction from "../../../customer/action/fetch-action";

import * as BaseComponent from "core/component/component";
import { CustomerForm } from "../../../customer/component/customer-form-component";
import { IModal } from "component/control/popup/modal-state";
import { GeneralModal } from "component/common/modal-component";

import { ICar } from "../../../car/model/car-model";
import { IOwnedCar } from "../../../car/model/owned-cars-model";
import { ICustomer } from "../../../customer/model/customer-model";
import { ICustomerLookup } from "../../model/customer-lookup-model";
import { IQuotation, QuotationStatus } from "../../model/quotation-info-model";

import * as Loading from "component/common/loading-icon/loader";
import * as Locale from "core/locale/component/locale";
import * as LocaleAction from "../../../../core/locale/action/fetch-action";
import { Dictionary } from "core/library/dictionary";
import { FormInteraction } from "core/library/interaction/form-interaction";

import { initializeQuotation } from "../../model/initialization";
import { initializeCar } from "../../../car/model/initialization";
import { initializeCustomer } from "../../../customer/model/initialization";

import { setResponseStateForCar } from "../../../car/model/response-state-transform";
import { setResponseStateForCustomer } from "../../../customer/model/response-state-transform";

import { FullCarInfo } from "../presentation/new-quotation/full-car-info-component";
import { FullCustomerInfo } from "../presentation/new-quotation/full-customer-info-component";

interface INewQuotationState extends IModal {
    IsValid?: boolean,
    SelectedOwnedCarId?: string,
    SelectedCustomerId?: string,
    SearchTerm?: string,
    Car?: ICar,
    Customer?: ICustomer,
    Quotation?: IQuotation,
    OwnedCars: Array<IOwnedCar>,
    CustomerCarLookUpResult: Array<ICustomerLookup>,
    Errors: Dictionary.IKeyedCollection<boolean>
}

class NewQuotation extends React.Component<any, INewQuotationState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private initialState: INewQuotationState;
    private readonly errors: Dictionary.IKeyedCollection<boolean>;

    private readonly inputInteraction: FormInteraction.InputInteraction<IQuotation>;
    private readonly dayInteraction: FormInteraction.DayPickerInteraction<IQuotation>;
    private readonly searchTermInputInteraction: FormInteraction.InputInteraction<INewQuotationState>;

    constructor(props: any) {
        super(props);
        this.errors = new Dictionary.KeyedCollection<boolean>();

        this.inputInteraction = new FormInteraction.InputInteraction<IQuotation>();
        this.dayInteraction = new FormInteraction.DayPickerInteraction<IQuotation>();
        this.searchTermInputInteraction = new FormInteraction.InputInteraction<INewQuotationState>();

        this.closeCustomerModal = this.closeCustomerModal.bind(this);
        this.onSearchTermInput = this.onSearchTermInput.bind(this);
        this.lookUpCustomerAndCarAutoComplete = this.lookUpCustomerAndCarAutoComplete.bind(this);
        this.reloadInfoAfterCreateOrUpdateCustomer = this.reloadInfoAfterCreateOrUpdateCustomer.bind(this);
        this.showSpecifyCustomerAndOptionalCarByLookupSelected = this.showSpecifyCustomerAndOptionalCarByLookupSelected.bind(this);

        this.setInitialErrors(false);
        this.initializeState();
    }
    
    setInitialErrors(effectForAllValues: boolean) { }

    initializeState() {
        this.initialState = {
            IsValid: false,
            IsOpenCreateOrUpdateModal: false,
            SelectedOwnedCarId: "",
            SelectedCustomerId: "",
            Car: initializeCar(),
            Customer: initializeCustomer(),
            Quotation: initializeQuotation(),
            OwnedCars: new Array<IOwnedCar>(),
            CustomerCarLookUpResult: new Array<ICustomerLookup>(),
            Errors: this.errors
        };
        this.state = this.initialState;
    }

    closeCustomerModal() {
        this.setState({
            Title: "",
            SelectedOwnedCarId: "",
            SelectedCustomerId: "",
            IsOpenCreateOrUpdateModal: false
        });
    }
    
    showCustomerModal(title: string, selectedOwnedCarId: string = "", selectedCustomerId: string = "") {
        this.setState({
            Title: title,
            SelectedOwnedCarId: selectedOwnedCarId,
            SelectedCustomerId: selectedCustomerId,
            IsOpenCreateOrUpdateModal: true
        });
    }
    
    reloadInfoAfterCreateOrUpdateCustomer(customerId: string, carId: string = "") {
        this.loadSpecifyCustomerAndOptionalCar(customerId, carId);
    }

    componentDidMount() {
        this.props.getProvince();
        this.props.getDistrict();
        this.props.getWard();
        this.props.lookupCustomerAndCar();
    }
    
    componentWillReceiveProps(nextProps) {
        this.redirectToMainQuotationAfterCreatedQuotation(nextProps);
        this.setResultForLookupCustomerAndCarInfo(nextProps);
        this.setResponseStateForOwnedCars(nextProps);
        this.setResponseStateForSpecifyCar(nextProps);
        this.setResponseStateForSpecifyCustomer(nextProps);
    }

    setResultForLookupCustomerAndCarInfo(nextProps) {
        let customerAndCarInfoResult = nextProps.customerAndCarInfoResult.target;
        if (customerAndCarInfoResult != this.props.customerAndCarInfoResult.target && customerAndCarInfoResult.Success) {
            
            let lookUpResult = new Array<ICustomerLookup>();

            customerAndCarInfoResult.Data.forEach(item => {
                let carId = item.Car ? item.Car.Id : "";
                let licensePlates = item.Car ? `- Biển số xe: ${item.Car.LicensePlates}` : "";
                let customerNameAndLicensePlates = `${item.Customer.Name} (${item.Customer.Phone}) ${licensePlates}`;

                lookUpResult.push({
                    Id: item.Id,
                    CustomerId: item.Customer.Id,
                    CustomerName: item.Customer.Name,
                    CustomerPhone: item.Customer.Phone,
                    CarId: carId,
                    LicensePlates: licensePlates,
                    CombineName: customerNameAndLicensePlates
                });
            });
            
            this.setState({ CustomerCarLookUpResult: lookUpResult });
        }
    }
    
    setResponseStateForSpecifyCustomer(nextProps) {
        let specifyCustomerResult = nextProps.specifyCustomerResult.target;
        if (specifyCustomerResult != this.props.specifyCustomerResult.target && specifyCustomerResult.Success) {
            let dataResponse = setResponseStateForCustomer(specifyCustomerResult.Data);

            dataResponse = this.setResultForLocale(nextProps, dataResponse);

            if (dataResponse.GenerateId > 0)
                this.setInitialErrors(true);

            this.setState({ 
                Customer: dataResponse,
                IsValid: dataResponse.GenerateId > 0
            });
        }
    }
    
    setResultForLocale(nextProps, customer: ICustomer) {
        let provinceResult = nextProps.provinceResult.target;
        if (customer.Province)
            customer.Province = Locale.renderProvinceById(provinceResult, customer.Province);

        let districtResult = nextProps.districtResult.target;
        if (customer.District)
            customer.District = Locale.renderDistrictById(districtResult, customer.District);

        let wardResult = nextProps.wardResult.target;
        if (customer.Ward)
            customer.Ward = Locale.renderWardById(wardResult, customer.Ward);

        return customer;
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
                if (this.state.OwnedCars.length == 1)
                    this.props.getCar(this.state.OwnedCars[0].Id);
            });
        }
    }

    setResponseStateForSpecifyCar(nextProps) {
        let specifyCarResult = nextProps.specifyCarResult.target;
        if (specifyCarResult != this.props.specifyCarResult.target && specifyCarResult.Success) {
            let carResponseData = setResponseStateForCar(specifyCarResult.Data);
            this.setState({ Car: carResponseData });
        }
    }
    
    redirectToMainQuotationAfterCreatedQuotation(nextProps) {
        let quotationCreateResult = nextProps.quotationCreateResult.target;
        if (quotationCreateResult !=  this.props.quotationCreateResult.target) {
            if (quotationCreateResult.Success) {
                window.location.href = "/#/admin/waiting-quotes/" + QuotationStatus.RequestFromCustomer;
            }
            else {
                if (quotationCreateResult.Message) 
                    alert(quotationCreateResult.Message[0].ErrorMessage);
            }
        }            
    }

    inputEvent = (event: any) => {
        this.setState({ Quotation: this.inputInteraction.onReceiveTarget(event.target, this.state.Quotation) });
    }

    onChangeEntryDate = (daySelected: Date) => {
        this.setState({ Quotation: this.dayInteraction.onReceive("EntryDate", daySelected, this.state.Quotation) });
    }
    
    onChangeExpectedCompleteDate = (daySelected: Date) => {
        this.setState({ Quotation: this.dayInteraction.onReceive("ExpectedCompleteDate", daySelected, this.state.Quotation) });
    }

    onSearchTermInput = (event: any) => {
        let newSearchTermState = this.searchTermInputInteraction.onReceive("SearchTerm", event.target.value, this.state);
        this.setState({ SearchTerm: newSearchTermState.SearchTerm });
    }

    onSave = (event: any): any => {
        event.preventDefault();
        if (this.state.Quotation.EntryDate && this.state.Quotation.ExpectedCompleteDate && 
            new Date(this.state.Quotation.EntryDate) > new Date(this.state.Quotation.ExpectedCompleteDate)) {
            alert("Ngày dự kiến hoàn thành phải lớn hơn ngày vào");
            return;
        }
        this.state.Quotation.BranchId = this.state.Customer.BranchId;
        let quotationInfo = {
            Quotation: this.state.Quotation,
            CarId: this.state.Car.Id,
            CustomerId: this.state.Customer.Id
        };
        this.props.create(quotationInfo);
    }
    
    refreshCustomerCarInfo() {
        this.props.getCustomer();
        this.props.getCar();
        this.setState({ SearchTerm: "" });
    }
    
    lookUpCustomerAndCarAutoComplete(input: string) {
        if (input) {
            let lookupResult = this.state.CustomerCarLookUpResult
                                .filter(x => x.CustomerName.toLowerCase().indexOf(input.toLowerCase()) > -1 || 
                                            x.CustomerPhone.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                                            x.LicensePlates.toLowerCase().indexOf(input.toLowerCase()) > -1);

            return Promise.resolve({ options: lookupResult});
        }
        else {
            return Promise.resolve({ options: [] });
        }
    }
    
    showSpecifyCustomerAndOptionalCarByLookupSelected(value: any = null) {
        let customerId = value ? value.CustomerId : "";
        let carId = value ? value.CarId : ""; 
        this.loadSpecifyCustomerAndOptionalCar(customerId, carId);
        this.setState({ SearchTerm: value });
    }

    loadSpecifyCustomerAndOptionalCar(customerId: string, carId: string = "") {
        this.props.getCustomer(customerId);
        if (carId && carId != "" && !carId.startsWith("-XE"))
            this.props.getCar(carId);
    }

    loadNewFormToCreateCustomerAndOptionalCar() {
        this.showCustomerModal("Thêm mới");
    }
    
    renderAddNewOrEditCustomerButton() {
        let editCustomerButton = null;
        let addNewCustomerButton = null;
        
        if (this.state.Customer.Id != "" && !this.state.Customer.Id.startsWith("-KH")) {
            let carId = "";
            if (!this.state.Customer.Id.startsWith("-XE"))
                carId = this.state.Car.Id;
            if (this.state.OwnedCars.length) 
                carId = this.state.OwnedCars[0].Id;

            editCustomerButton = <button type="button" onClick={() => this.showCustomerModal("Cập nhật", carId, this.state.Customer.Id)} 
                                         className="btn btn-w-m btn-primary">Cập nhật khách hàng</button>
        }
        else {
            addNewCustomerButton = <button type="button" onClick={() => this.showCustomerModal("Thêm mới khách hàng")}
                                           className="btn btn-w-m btn-primary">Tạo mới khách hàng</button>
        }

        return (
            <div className="form-inline">
                <div className="form-group">
                    {editCustomerButton}
                </div>
                <div className="form-group">
                    {addNewCustomerButton}
                </div>
            </div>
        )
    }
    
    renderSpecifyOwnedCar() {
        if (this.state.OwnedCars.length == 1 || 
           (this.state.Car.Id != "" && !this.state.Car.Id.startsWith("-XE")))   
            return <FullCarInfo car={this.state.Car} />
    }

    renderSpecifyCustomer() {
        if (this.state.Customer.Id != "" && !this.state.Customer.Id.startsWith("-KH"))
           return <FullCustomerInfo customer={this.state.Customer} />
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox float-e-margins">
                                <div className="ibox-content" id="customer-car-lookup">
                                    <div className="row">
                                        <div className="col-md-4 form-group">
                                            <Select.Async autoload={false} options={this.state.CustomerCarLookUpResult} cache={false}
                                                          valueKey="CustomerId" labelKey="CombineName" value={this.state.SearchTerm} 
                                                          placeholder={"Nhập biển số xe / Tên khách hàng hoặc số điện thoại"} 
                                                          onChange={this.showSpecifyCustomerAndOptionalCarByLookupSelected} 
                                                          loadOptions={this.lookUpCustomerAndCarAutoComplete} />
                                        </div>
                                        <div className="col-md-1 form-group text-right">
                                            <button type="button" onClick={() => this.refreshCustomerCarInfo()}
                                                    className="btn btn-w-m btn-primary">Tải lại</button>
                                        </div>
                                        <div className="col-md-7 form-group text-right">
                                            {this.renderAddNewOrEditCustomerButton()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {this.renderSpecifyOwnedCar()}
                    {this.renderSpecifyCustomer()}

                    <div className="row">
                        <div className="col-md-12">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Thông tin báo giá</h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <form role="form">
                                        <div className="row">
                                            <div className="col-md-2 form-group">
                                                <label>Ngày vào</label>
                                                <DayPickerInput name="EntryDate" className="form-control" data-fieldset="Quotation" 
                                                                value={this.state.Quotation.EntryDate}
                                                                onDayChange={this.onChangeEntryDate} 
                                                                formatDate={formatDate}
                                                                parseDate={parseDate}
                                                                dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} />
                                            </div>
                                            <div className="col-md-2 form-group">
                                                <label>Ngày dự kiến hoàn thành</label>
                                                <DayPickerInput name="ExpectedCompleteDate" className="form-control" data-fieldset="Quotation"
                                                                value={this.state.Quotation.ExpectedCompleteDate}
                                                                onDayChange={this.onChangeExpectedCompleteDate} 
                                                                formatDate={formatDate}
                                                                parseDate={parseDate}
                                                                dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Ghi chú</label>                                                                            
                                                <textarea className="form-control" name="Note" /*cols={80}*/ rows={5}
                                                            placeholder="Ghi chú" data-fieldset="Quotation"
                                                            onInput={e => this.inputEvent(e)} value={this.state.Quotation.Note} />
                                            </div>
                                            <div className="col-md-2 text-right form-group">
                                                <button type="button" className="btn btn-w-m btn-primary" style={{marginTop: 20}}
                                                        disabled={!this.state.IsValid} 
                                                        onClick={(e) => this.onSave(e)}>Tạo báo giá</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenCreateOrUpdateModal} close={this.closeCustomerModal}>
                    <CustomerForm customerId={this.state.SelectedCustomerId} selectedOwnedCarId={this.state.SelectedOwnedCarId} closeModal={this.closeCustomerModal} 
                                  reloadCustomerInfoFromQuotation={this.reloadInfoAfterCreateOrUpdateCustomer} />
                </GeneralModal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        specifyCarResult: state.CarReducer,
        specifyCustomerResult: state.CustomerReducer,
        ownedCarsResult: state.OwnedCarsReducer,
        customerAndCarInfoResult: state.CustomerAndOwnedCarsReducer,
        provinceResult: state.ProvincesReducer,
        districtResult: state.DistrictsReducer,
        wardResult: state.WardsReducer,
        quotationCreateResult: state.QuotationCreateReducer,
        quotationNoteUpdateSpecifyStepResult: state.QuotationNoteUpdateSpecifyStepReducer
    };
}

const mapDispatchToProps = (dispatch: any) => {
    let specifyCarAction = new CarFetchAction.CarAction();
    let specifyCustomerAction = new CustomerFetchAction.CustomerAction();
    let ownedCarsAction = new CarFetchAction.OwnedCarsAction();
    let quotationCreateAction = new PostAction.QuotationCreateAction();
    let customerAndOwnedCarsAction = new FetchAction.LoadCustomerAndOwnedCarsAction();
    let quotationNoteUpdateSpecifyStepAction = new PostAction.QuotationNoteUpdateSpecifyStepAction();
    let provinceAction = new LocaleAction.ProvinceAction();
    let districtAction = new LocaleAction.DistrictAction();
    let wardAction = new LocaleAction.WardAction();
    
    return {
        getCar: (carId: string) => dispatch(specifyCarAction.fetch(carId)),
        getCustomer: (customerId: string) => dispatch(specifyCustomerAction.fetch(customerId)),
        getOwnedCars: (customerId: string) => dispatch(ownedCarsAction.fetch(customerId)),
        lookupCustomerAndCar: (searchTerm: string) => dispatch(customerAndOwnedCarsAction.fetch(searchTerm)),
        getProvince: (entry: any) => dispatch(provinceAction.fetch(entry)),
        getDistrict: (entry: any) => dispatch(districtAction.fetch(entry)),
        getWard: (entry: any) => dispatch(wardAction.fetch(entry)),
        create: (request: any) => dispatch(quotationCreateAction.post(request)),
        updateNote: (request) => dispatch(quotationNoteUpdateSpecifyStepAction.post(request)),
    }
}

const connectedQuotation = connect(mapStateToProps, mapDispatchToProps)(NewQuotation);
export { connectedQuotation as NewQuotation };
