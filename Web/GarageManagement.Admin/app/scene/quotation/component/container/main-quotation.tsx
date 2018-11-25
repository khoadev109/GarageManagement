import React from "react";
import { connect } from "react-redux";

import DayPickerInput from "react-day-picker/DayPickerInput";

import "moment/locale/it";
import MomentLocaleUtils, { formatDate, parseDate, } from "react-day-picker/moment";

import { ToastContainer } from "react-toastify";
import * as ToastHelper from "component/common/toast/toast";

import * as FetchAction from "../../action/fetch-action";
import * as CarFetchAction from "../../../../scene/car/action/fetch-action";
import * as PostAction from "../../action/post-action";

import * as BaseComponent from "core/component/component";
import * as Loading from "component/common/loading-icon/loader";
import { IModal } from "component/control/popup/modal-state";
import { GeneralModal } from "component/common/modal-component";
import { CustomerForm } from "../../../customer/component/customer-form-component";
import { QuotationItemsEdit } from "../container/quotation-items-edit";

import { CarInfo } from "../presentation/car-info-component";
import { CustomerInfo } from "../presentation/customer-info-component";
import { PendingQuotations } from "../presentation/pending-quotations-component";
import { QuotationMenu } from "../presentation/quotation-menu-component";
import { QuotationFunctional } from "../presentation/quotation-functional-component";

import { ICarInfo } from "../../model/car-info-model";
import { IEmployee } from "../../model/employee-info-model";
import { ICustomerInfo } from "../../model/customer-info-model";
import { IQuotationItem } from "../../model/quotation-item-model";
import { IQuotation, QuotationStatus } from "../../model/quotation-info-model";

import { Dictionary } from "core/library/dictionary";
import { FormInteraction } from "core/library/interaction/form-interaction";
import { FormValidationCombine } from "core/library/extension/validation/validation-combine";
import { returnNumberOrDefaultValue, returnStringOrDefaultValue } from "../../../../core/library/data-type";

import { setResponseStateForCar } from "../../../car/model/response-state-transform";
import { setResponseStateForCustomer } from "../../../customer/model/response-state-transform";
import { setResponseStateForQuotation } from "../../model/response-state-transform";

import { 
    initializeQuotation, initializeCarInfo, initializeCustomerInfo, 
    setNextStatusIdForQuotation, setPreviousStatusIdForQuotation,
    setNextStatusForCurrentQuotation, setPreviousStatusForCurrentQuotation
} from "../../model/initialization";
import { MainQuotationMapping } from "scene/quotation/redux-mapping/main-quotation-mapping";

interface IQuotationNote {
    Id: number,
    QuotationId: string,
    StatusId: number,
    Note: string
}

interface IMainQuotationState extends IModal {
    IsValid?: boolean,
    SelectedCustomerId: string,
    SelectedQuotationId?: string,
    CarInfo?: ICarInfo,
    CustomerInfo?: ICustomerInfo,
    QuotationInfo?: { Quotation: IQuotation },
    QuotationNote: IQuotationNote,
    Items: Array<IQuotationItem>,
    Employees: Array<IEmployee>,
    PendingQuotations: Array<string>,
    FirstQuotation?: { FirstQuotationId: string },
    Errors: Dictionary.IKeyedCollection<boolean>
}

class MainQuotation extends React.Component<any, IMainQuotationState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private quotationItemsComponent: any;
    private isLoadedFirstQuotation: boolean;
    private readonly errors: Dictionary.IKeyedCollection<boolean>;
    private readonly inputInteraction: FormInteraction.InputInteraction<IQuotation>;
    private readonly inputNoteInteraction: FormInteraction.InputInteraction<IQuotationNote>;
    private readonly dayPickerInteraction: FormInteraction.DayPickerInteraction<IQuotation>;

    constructor(props: any) {
        super(props);
        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<IQuotation>();
        this.inputNoteInteraction = new FormInteraction.InputInteraction<IQuotationNote>();
        this.dayPickerInteraction = new FormInteraction.DayPickerInteraction<IQuotation>();
        
        this.reloadInfoAfterUpdateCustomer = this.reloadInfoAfterUpdateCustomer.bind(this);
        this.closeCreateOrUpdateModal = this.closeCreateOrUpdateModal.bind(this);

        this.setInitialErrors(false);
        this.initializeState();
    }

    setInitialErrors(effectForAllValues: boolean) { }

    initializeState() {
        this.state = {
            IsValid: false,
            SelectedCustomerId: "",
            IsOpenGeneralModal: false,
            IsOpenCreateOrUpdateModal: false,
            PendingQuotations: new Array<string>(),
            QuotationNote : this.initializeNote(),
            CarInfo: initializeCarInfo(),
            CustomerInfo: initializeCustomerInfo(),
            QuotationInfo: { Quotation: initializeQuotation() },
            Items: new Array<IQuotationItem>(),
            Employees: new Array<IEmployee>(),
            Errors: this.errors
        }
    }

    initializeNote() {
        return { Id: 0, QuotationId: "", StatusId: 0, Note: "" };
    }

    closeCreateOrUpdateModal() {
        this.setState({
            Title: "",
            SelectedCustomerId: "",
            IsOpenCreateOrUpdateModal: false
        });
    }

    showCreateOrUpdateCustomerModal() {
        this.setState({
            Title: "Cập nhật khách hàng",
            SelectedCustomerId: this.state.CustomerInfo.Customer.Id,
            IsOpenCreateOrUpdateModal: true
        });
    }

    reloadInfoAfterUpdateCustomer() {
        if (this.state.CustomerInfo.Customer.Id != "") {
            this.props.getQuotation({ quotationId: this.state.FirstQuotation.FirstQuotationId });
        }
    }
    
    componentDidMount() {
        this.loadAllInitialInfo(this.props.quotationStatusId);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setResultForSpecifyQuotation(nextProps);
        this.setResultForSpecifyQuotationNote(nextProps);
        this.setResultForPendingQuotations(nextProps);
        this.setResultForUpdateQuotationAndItems(nextProps);
        this.setResultForChangeQuotationStatus(nextProps);
    }
    
    setResultForPendingQuotations(nextProps) {
        Loading.showLoading(nextProps.pendingQuotationsResult.loading, "pending-quotations");
        
        let pendingQuotationsResult = nextProps.pendingQuotationsResult.target;
        if (pendingQuotationsResult != this.props.pendingQuotationsResult.target && pendingQuotationsResult.Success) {
            let firstQuotationId : string = "";

            if (pendingQuotationsResult.Data.length)
                firstQuotationId = pendingQuotationsResult.Data[0].split(",", 1);

            this.setState({ 
                PendingQuotations: pendingQuotationsResult.Data,
                FirstQuotation: { FirstQuotationId: firstQuotationId }
            },
            () => {
                let firstQuotationId = this.state.FirstQuotation.FirstQuotationId;
                if (this.isLoadedFirstQuotation == undefined || this.isLoadedFirstQuotation == false) {
                    this.props.getQuotation({ quotationId: firstQuotationId });
                    this.loadQuotationItemsFromChildComponent(firstQuotationId);
                    this.isLoadedFirstQuotation = true;
                }
            });
        }
    }
    
    setResultForSpecifyQuotationNote(nextProps) {
        let specifyQuotationNoteResult = nextProps.specifyQuotationNoteResult.target;
        if (specifyQuotationNoteResult != this.props.specifyQuotationNoteResult.target && specifyQuotationNoteResult.Success) {
            let dataResponse = specifyQuotationNoteResult.Data;
            this.setState({
                QuotationNote: {
                    Id: returnNumberOrDefaultValue(dataResponse.Id),
                    QuotationId: returnStringOrDefaultValue(dataResponse.QuotationId),
                    StatusId: returnNumberOrDefaultValue(dataResponse.StatusId),
                    Note: returnStringOrDefaultValue(dataResponse.Note)
                }
            });
        }
    }
    
    setResultForSpecifyQuotation(nextProps) {
        Loading.showLoading(nextProps.quotationResult.loading, "quotation-info");
        Loading.showLoading(nextProps.quotationResult.loading, "customer-info");
        Loading.showLoading(nextProps.quotationResult.loading, "car-info");

        let quotationResult = nextProps.quotationResult.target;
        if (quotationResult != this.props.quotationResult.target && quotationResult.Success) {
            if (quotationResult.Data.Car)
                this.setResultForCar(quotationResult.Data.Car);
            else
                this.setState( { CarInfo : initializeCarInfo() });

            this.setResultForCustomer(quotationResult.Data.Customer);
            this.setResultForQuotation(quotationResult.Data);
        }
    }

    setResultForCar(dataResponse: any) {
        this.setState({ CarInfo: { Car: setResponseStateForCar(dataResponse) } });
    }
    
    setResultForCustomer(dataResponse: any) {
        this.setState({ CustomerInfo: { Customer: setResponseStateForCustomer(dataResponse) } });
    }
    
    setResultForQuotation(dataResponse: any) {
        this.setInitialErrors(true);
        this.setState({
            IsValid: true,
            Errors: this.errors,
            QuotationInfo: { Quotation: setResponseStateForQuotation(dataResponse) }
        },
        () => {
            this.props.getQuotationNote(this.state.QuotationInfo.Quotation.Id, this.state.QuotationInfo.Quotation.StatusId);
        });
    }
    
    setResultForUpdateQuotationAndItems(nextProps) {
        let updateQuotationItemsResult = nextProps.updateQuotationItemsResult.target;
        if (updateQuotationItemsResult != this.props.updateQuotationItemsResult.target) {
            if (updateQuotationItemsResult.length) {
                if (updateQuotationItemsResult.Success) {
                    ToastHelper.notificationSuccess(updateQuotationItemsResult.Message);
                    if (updateQuotationItemsResult.Data.length) {
                        this.setState({ Items: updateQuotationItemsResult.Data },
                        () => { 
                            this.setResponseStateForUpdatedQuotationWithOrWithoutItems(nextProps, true);
                        });
                    }
                    else { this.setResponseStateForUpdatedQuotationWithOrWithoutItems(nextProps); }
                }
            }
            else { this.setResponseStateForUpdatedQuotationWithOrWithoutItems(nextProps); }
        }
    }
    
    setResponseStateForUpdatedQuotationWithOrWithoutItems(nextProps, includeSaveItems: boolean = false) {
        let updateQuotationResult = nextProps.updateQuotationResult.target;
        let isSucceedUpdated = includeSaveItems 
                                ? (updateQuotationResult.Success && this.state.Items.length) 
                                : updateQuotationResult.Success;
        if (isSucceedUpdated)
            alert("Cập nhật thông tin báo giá thành công");
        else
            alert("Cập nhật thông tin báo giá thất bại");
    }
    
    setResultForChangeQuotationStatus(nextProps) {
        let changeQuotationStatusResult = nextProps.changeQuotationsStatusResult.target;
        if (changeQuotationStatusResult != this.props.changeQuotationsStatusResult.target && changeQuotationStatusResult.Success) {
            if (changeQuotationStatusResult.Data == QuotationStatus.Cancel) {
                window.location.reload();
            }
            else {
                let changedStatus = changeQuotationStatusResult.Data;
                this.selectQuotationStatus(changedStatus);
                window.location.href = `/#/admin/waiting-quotes/${changedStatus}`;
                alert(`Đã chuyển bước ${setNextStatusForCurrentQuotation(QuotationStatus[changedStatus])}`);
            }
        }
    }
    
    selectQuotationStatus(statusId: QuotationStatus) {
        this.state.QuotationInfo.Quotation.AgreeToSwitchToNextOrPreviousStep = false;
        this.setState({ QuotationInfo : this.state.QuotationInfo })
        this.loadAllInitialInfo(statusId);
    }
    
    loadAllInitialInfo(statusId: number) {
        this.isLoadedFirstQuotation = false;
        this.searchPendingQuotations(statusId, "");
    }

    searchPendingQuotations(statusId: number, searchTerm: string) {
        this.props.getPendingQuotations(statusId, searchTerm);
    }

    showAllInfoBySpecifyQuotation(quotationId: string) {
        this.props.getQuotation({ quotationId: quotationId });
        this.loadQuotationItemsFromChildComponent(quotationId);
    }

    loadQuotationItemsFromChildComponent(quotationId: string) {
        if (this.quotationItemsComponent)
            this.quotationItemsComponent.wrappedInstance.loadAllQuotationItems(quotationId);
    }
    
    printQuotation() {
        window.open(
            ["#/admin/quotation-print",
            this.state.QuotationInfo.Quotation.Id,
            this.state.QuotationInfo.Quotation.StatusId.toString()].join("/"),
            '_blank'
          );
    }
    
    changeToNextQuotationStatus() {
        if (!this.state.QuotationInfo.Quotation.AgreeToSwitchToNextOrPreviousStep) {
            alert(`Vui lòng duyệt bước -> ${this.state.QuotationInfo.Quotation.Status}, trước khi chuyển sang bước -> ${this.state.QuotationInfo.Quotation.NextStatus}`);
            return;
        }

        let quotationItems: any;
        if (this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.RequestFromCustomer)
            quotationItems = this.quotationItemsComponent.wrappedInstance.state.Items.Target.filter(x => !x.IsEdittingRow);
        
        if (this.state.QuotationInfo.Quotation.StatusId == QuotationStatus.RequestFromCustomer || (quotationItems && quotationItems.length)) {
            this.props.changeQuotationStatus({ 
                quotationId: this.state.QuotationInfo.Quotation.Id, 
                statusId: setNextStatusIdForQuotation(this.state.QuotationInfo.Quotation.StatusId)
            });
        }
        else {
            let nextStatus = setNextStatusForCurrentQuotation(QuotationStatus[this.props.quotationStatusId]);
            alert(`Chưa nhập phụ tùng hay công dịch vụ. Cần nhập phụ tùng hay công dịch vụ trước khi chuyển sang bước: ${nextStatus}`);
        }
    }

    changeToPreviousQuotationStatus() {
        if (!this.state.QuotationInfo.Quotation.AgreeToSwitchToNextOrPreviousStep) {
            alert(`Vui lòng duyệt bước -> ${this.state.QuotationInfo.Quotation.Status}, trước khi chuyển sang bước -> ${this.state.QuotationInfo.Quotation.PrevStatus}`);
            return;
        }

        let quotationItems: any;
        if (this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.RequestFromCustomer)
            quotationItems = this.quotationItemsComponent.wrappedInstance.state.Items.Target.filter(x => !x.IsEdittingRow);
        
        if (this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.RequestFromCustomer || (quotationItems && quotationItems.length)) {
            this.props.changeQuotationStatus({ 
                quotationId: this.state.QuotationInfo.Quotation.Id, 
                statusId: setPreviousStatusIdForQuotation(this.state.QuotationInfo.Quotation.StatusId)
            });
        }
        else {
            let prevStatus = setPreviousStatusForCurrentQuotation(QuotationStatus[this.props.quotationStatusId]);
            alert(`Chưa nhập phụ tùng hay công dịch vụ. Cần nhập phụ tùng hay công dịch vụ trước khi chuyển sang bước: ${prevStatus}`);
        }
    }

    agreeThisStepOfQuotation(event: any) {
        let element = event.target as HTMLInputElement;
        this.state.QuotationInfo.Quotation.AgreeToSwitchToNextOrPreviousStep = element.checked;
        this.setState({ QuotationInfo : this.state.QuotationInfo });
    }

    cancelQuotation() {
        if (this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.CheckUp) {
            this.props.changeQuotationStatus({ 
                quotationId: this.state.QuotationInfo.Quotation.Id, 
                statusId: QuotationStatus.Cancel
            });
        }
    }
    
    onSave = (event: any) => {
        if (this.state.IsValid) {
            if (this.state.QuotationInfo.Quotation.EntryDate && this.state.QuotationInfo.Quotation.ExpectedCompleteDate && 
                new Date(this.state.QuotationInfo.Quotation.EntryDate) > new Date(this.state.QuotationInfo.Quotation.ExpectedCompleteDate)) {
                alert("Ngày dự kiến hoàn thành phải lớn hơn ngày vào");
                return;
            }
            
            this.saveQuotationAndQuotationItemsInfo();
            this.saveQuotationNote();
        }
    }
    
    saveQuotationAndQuotationItemsInfo() {
        this.state.QuotationInfo.Quotation.BranchId = this.state.CustomerInfo.Customer.BranchId;
        this.props.updateQuotationInfo(this.state.QuotationInfo.Quotation.Id, this.state.QuotationInfo.Quotation);

        if (this.quotationItemsComponent) {
            let quotationItems: any = this.quotationItemsComponent.wrappedInstance.state.Items.Target.filter(x => !x.IsEdittingRow);
            if (quotationItems && quotationItems.length)
                this.props.updateQuotationItems(this.state.QuotationInfo.Quotation.Id, quotationItems);
        } 
    }
    
    saveQuotationNote() {
        this.state.QuotationNote.QuotationId = this.state.QuotationInfo.Quotation.Id;
        this.state.QuotationNote.StatusId = this.state.QuotationInfo.Quotation.StatusId;
        this.props.updateNote(this.state.QuotationNote);
    }
    
    checkValidOnEveryChange(name: string, valid: boolean) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }

    validateInputNumberAndMaxLength = (name: string, value: any, required: boolean, valueCompare: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidationCombine.MaxLengthAndNumberValidation(name, value, required, valueCompare));
        this.checkValidOnEveryChange(name, isValid);
    }

    inputEvent = (event: any, validation?: (name: string, value: any, required: boolean, valueCompare: any) => void, 
                  required?: boolean, valueToCompare?: any) => {

        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null; 
        
        this.setState({ QuotationInfo: { Quotation: this.inputInteraction.onReceiveTarget(event.target, this.state.QuotationInfo.Quotation) } }, doValidation);
    }

    inputNoteEvent = (event: any) => {
        this.setState({ QuotationNote: this.inputNoteInteraction.onReceiveTarget(event.target, this.state.QuotationNote) });
    }

    onChangeEntryDate = (daySelected: Date) => {
        this.setState({ QuotationInfo: { Quotation: this.dayPickerInteraction.onReceive("EntryDate", daySelected, this.state.QuotationInfo.Quotation) } });
    }
    
    onChangeExpectedCompleteDate = (daySelected: Date) => {
        this.setState({ QuotationInfo: { Quotation: this.dayPickerInteraction.onReceive("ExpectedCompleteDate", daySelected, this.state.QuotationInfo.Quotation) } });
    }

    onChangeNextMaitenanceDate = (daySelected: Date) => {
        this.setState({ QuotationInfo: { Quotation: this.dayPickerInteraction.onReceive("NextMaintenanceDate", daySelected, this.state.QuotationInfo.Quotation) } });
    }
    
    // using refs with redux: 
    // 1. ref={"quotationItemsEditReference"}, access: this.refs["quotationItemsEditReference"]
    // 2. ref={component => { this.quotationItemsComponentRef = component }}, access: this.quotationItemsComponentRef
    // https://redux.js.org/basics/usage-with-react
    // https://itnext.io/advanced-react-redux-techniques-how-to-use-refs-on-connected-components-e27b55c06e34
    
    setStyleFunctionalWhenPendingQuotationsIsEmpty() {
        return this.state.QuotationInfo.Quotation.Id == "" ? { display: "none" } : { };
    }
    
    renderQuotationFunctional() {
        if (this.state.QuotationInfo.Quotation.Id != "")
            return(
                <div className="row">
                    <div className="col-lg-12">
                        <QuotationFunctional IsValid={this.state.IsValid}
                        IsAgree={this.state.QuotationInfo.Quotation.AgreeToSwitchToNextOrPreviousStep}
                        StatusId={this.state.QuotationInfo.Quotation.StatusId}
                        CurrentStatus={this.state.QuotationInfo.Quotation.Status}
                        NextStatus={this.state.QuotationInfo.Quotation.NextStatus}
                        PreviousStatus={this.state.QuotationInfo.Quotation.PrevStatus}
                        PrintQuotation={() => this.printQuotation()}
                        CancelQuotation={() => this.cancelQuotation()}
                        OpenCustomerForm={() => this.showCreateOrUpdateCustomerModal()}
                        SaveQuotation={() => this.onSave(null)}
                        ChangeToPreviousQuotationStatus={() => this.changeToPreviousQuotationStatus()}
                        ChangeToNextQuotationStatus={() => this.changeToNextQuotationStatus()} 
                        AgreeThisStep ={(event: any) => this.agreeThisStepOfQuotation(event)} />
                    </div>
                </div>
            );
    }
    
    renderQuotationItems() {
        if (this.state.QuotationInfo.Quotation.Id != "" && this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.RequestFromCustomer) {
            return (
                <QuotationItemsEdit ref={component => { this.quotationItemsComponent = component }}
                quotationId={this.state.QuotationInfo.Quotation.Id}
                quotationStatusId={this.state.QuotationInfo.Quotation.StatusId}
                employees={this.state.Employees} />
            );
        }
    }

    renderNextMaintenanceDate() {
        if (this.state.QuotationInfo.Quotation.StatusId == QuotationStatus.CheckUp)
            return <DayPickerInput name="NextMaintenanceDate" className="form-control"
                                   onDayChange={this.onChangeNextMaitenanceDate} 
                                   formatDate={formatDate}
                                   parseDate={parseDate}
                                   dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} 
                                   value={this.state.QuotationInfo.Quotation.NextMaintenanceDate} />
        else
            return <input readOnly type="text" name="NextMaintenanceDate" placeholder="YYYY-MM-DD" className="form-control" />
    }

    renderNextMaintenanceKm() {
        let disableWhenInCheckupStep = this.state.QuotationInfo.Quotation.StatusId != QuotationStatus.CheckUp && { "disabled": true };

        return <input type="text" name="NextKm" placeholder="Số Km bảo dưỡng" className="form-control"
                    {...disableWhenInCheckupStep}
                    onInput={e => this.inputEvent(e, (name, value, required, valueCompare) => 
                        this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10)}
                    value={this.state.QuotationInfo.Quotation.NextKm} />
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <QuotationMenu activeStatus={this.props.quotationStatusId}
                                           onSelectQuotationStatus={(status: QuotationStatus) => this.selectQuotationStatus(status)} />
                        </div>
                    </div>
                    
                    {this.renderQuotationFunctional()}
                    
                    <div className="row">
                        <div className="col-lg-2">
                            <PendingQuotations SelectingQuotationId={this.state.QuotationInfo.Quotation.Id}
                            Quotations={this.state.PendingQuotations}
                            StatusId={this.props.quotationStatusId}
                            OnSelectQuotation={(quotationId: string) => this.showAllInfoBySpecifyQuotation(quotationId)}
                            OnSearchQuotations={(statusId: number, searchTerm: string) => this.searchPendingQuotations(statusId, searchTerm)} />
                        </div>
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomerInfo Customer={this.state.CustomerInfo.Customer} />
                                </div>
                                <div className="col-md-6">
                                    <CarInfo Car={this.state.CarInfo.Car} />
                                </div>
                            </div>
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
                                        <div className="ibox-content" id="quotation-info">
                                            <Loading.loadingIcon container="quotation-info" />
                                            <form role="form">
                                                <div className="row">
                                                    <div className="col-md-7">
                                                        <div className="row">
                                                            <div className="col-md-4 form-group">
                                                                <label>Ngày bảo dưỡng</label>
                                                                {this.renderNextMaintenanceDate()}
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label>Ngày vào</label>
                                                                <DayPickerInput name="EntryDate" className="form-control"
                                                                                value={this.state.QuotationInfo.Quotation.EntryDate}
                                                                                onDayChange={this.onChangeEntryDate} 
                                                                                formatDate={formatDate}
                                                                                parseDate={parseDate}
                                                                                dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} />
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label>Dự kiến hoàn thành</label>
                                                                <DayPickerInput name="ExpectedCompleteDate" className="form-control"
                                                                                value={this.state.QuotationInfo.Quotation.ExpectedCompleteDate}
                                                                                onDayChange={this.onChangeExpectedCompleteDate} 
                                                                                formatDate={formatDate}
                                                                                parseDate={parseDate}
                                                                                dayPickerProps={{ locale: "vi", localeUtils: MomentLocaleUtils }} />
                                                            </div>
                                                        </div>
                                                        <div className="hr-line-dashed"></div>
                                                        <div className="row">
                                                            <div className="col-md-4 form-group">
                                                                <label>Số Km bảo dưỡng</label>
                                                                {this.renderNextMaintenanceKm()}
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label>Cố vấn dịch vụ</label>
                                                                <input readOnly type="text" name="ContactName" placeholder="Cố vấn dịch vụ" className="form-control"
                                                                       onInput={e => this.inputEvent(e)}
                                                                       value={this.state.QuotationInfo.Quotation.ContactName} />
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label>Điện thoại</label>
                                                                <input readOnly type="text" name="ContactPhone" placeholder="Điện thoại" className="form-control" 
                                                                       onInput={e => this.inputEvent(e, 
                                                                                (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), false, 10)} 
                                                                       value={this.state.QuotationInfo.Quotation.ContactPhone} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label>Yêu cầu từ khách hàng</label>
                                                            <textarea className="form-control" name="Note" rows={5} placeholder="Yêu cầu từ khách hàng"
                                                                      onInput={e => this.inputNoteEvent(e)} value={this.state.QuotationNote.Note} />
                                                        </div>                              
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.renderQuotationItems()}
                </div>

                <GeneralModal size={"large"} title={this.state.Title} isOpen={this.state.IsOpenCreateOrUpdateModal} close={this.closeCreateOrUpdateModal}>
                    <CustomerForm customerId={this.state.CustomerInfo.Customer.Id} selectedOwnedCarId={this.state.CarInfo.Car.Id}
                                  closeModal={this.closeCreateOrUpdateModal} reloadCustomerInfoFromQuotation={this.reloadInfoAfterUpdateCustomer}  />
                </GeneralModal>

                <ToastContainer autoClose={5000} />
            </React.Fragment>
        );
    }
}

const connectedComponent = new MainQuotationMapping().connectComponent(MainQuotation);
export { connectedComponent as MainQuotation };
