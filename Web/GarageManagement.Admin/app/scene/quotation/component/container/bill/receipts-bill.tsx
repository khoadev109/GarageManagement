import React from "react";
import { connect } from "react-redux";

import * as FetchAction from "../../../action/fetch-action";
import * as PostAction from "../../../action/post-action";

import { CarInfo } from "../../presentation/car-info";
import { CustomerInfo } from "../../presentation/customer-info";

import { ICarInfo } from "../../../model/car-info-model";
import { ICustomerInfo } from "../../../model/customer-info-model";
import { IReceipts, initializeReceipts } from "../../../model/bill-model";
import { initializeCarInfo, initializeCustomerInfo } from "../../../model/initialization";
import { setResponseStateForCar } from "../../../../car/model/response-state-transform";
import { setResponseStateForCustomer } from "../../../../customer/model/response-state-transform";

import * as BaseComponent from "core/component/component";
import { Dictionary } from "core/library/dictionary";
import { FormInteraction } from "core/library/interaction/form-interaction";
import { FormValidation } from "../../../../../core/library/extension/validation";
import { FormValidationCombine } from "core/library/extension/validation/validation-combine";
import { returnNumberOrDefaultValue, returnStringOrDefaultValue } from "../../../../../core/library/data-type";

interface IReceiptsBillState {
    IsValid?: boolean,
    Receipts?: IReceipts,
    CarInfo?: ICarInfo,
    CustomerInfo?: ICustomerInfo,
    Quotations: Array<string>,
    Errors: Dictionary.IKeyedCollection<boolean>
}

class ReceiptsBill extends React.Component<any, IReceiptsBillState> implements BaseComponent.IComponentState, BaseComponent.IComponentForm {
    private readonly errors: Dictionary.IKeyedCollection<boolean>;
    private readonly inputInteraction: FormInteraction.InputInteraction<IReceipts>;
    private readonly selectInteraction: FormInteraction.SelectInteraction<IReceipts>;

    constructor(props: any) {
        super(props);
        this.errors = new Dictionary.KeyedCollection<boolean>();
        this.inputInteraction = new FormInteraction.InputInteraction<IReceipts>();
        this.selectInteraction = new FormInteraction.SelectInteraction<IReceipts>();

        this.goToPrintPage = this.goToPrintPage.bind(this);

        this.initializeState();
        this.setInitialErrors(false);
    }

    initializeState() {
        this.state = {
            IsValid: false,
            Receipts: initializeReceipts(),
            CarInfo: initializeCarInfo(),
            CustomerInfo: initializeCustomerInfo(),
            Quotations: new Array<string>(),
            Errors: this.errors
        }
    }

    setInitialErrors(effectForAllValues: boolean) {
        this.errors.Add("Payer", effectForAllValues);
        this.errors.Add("Money", effectForAllValues);
        this.errors.Add("MoneyText", effectForAllValues);
        this.errors.Add("Content", effectForAllValues);
    }
    
    componentDidMount() {
        if (this.props.quotationId) {
            this.state.Receipts.QuotationId = this.props.quotationId;
            this.setState({ Receipts: this.state.Receipts });
            this.props.getQuotation({ quotationId: this.props.quotationId });
        }
        this.props.getReceipts(this.props.receiptId);
        this.props.getAllQuotationsBySearchTerm("");
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.quotationId)
            this.setResponseStateForSpecifyQuotation(nextProps);
            
        this.setResponseStateForSpecifyReceipts(nextProps);
        this.setResponseStateForCreateOrUpdateReceipts(nextProps);
        this.setResultForAllQuotations(nextProps);
    }
    
    setResponseStateForCreateOrUpdateReceipts(nextProps) {
        let createOrUpdateReceiptsResult = nextProps.createOrUpdateReceiptsResult.target;
        if (createOrUpdateReceiptsResult != this.props.createOrUpdateReceiptsResult.target) {
            if (createOrUpdateReceiptsResult.Success)
                alert("Cập nhật phiếu thu thành công.");
            else
                if (createOrUpdateReceiptsResult.Message)
                    alert(createOrUpdateReceiptsResult.Message[0].ErrorMessage);
        }
    }
    
    setResponseStateForSpecifyReceipts(nextProps) {
        let receiptsResult = nextProps.receiptsResult.target;
        if (receiptsResult != this.props.receiptsResult.target && receiptsResult.Success) {
            
            let dataResponse = receiptsResult.Data;
            if (dataResponse.Id > 0)
                this.setInitialErrors(true);

            this.setState({
                IsValid: returnNumberOrDefaultValue(dataResponse.Id) > 0,
                Receipts: {
                    Id: returnNumberOrDefaultValue(dataResponse.Id),
                    Payer: returnStringOrDefaultValue(dataResponse.Payer),
                    Content: returnStringOrDefaultValue(dataResponse.Content),
                    Attach: returnStringOrDefaultValue(dataResponse.Attach),
                    Money: returnNumberOrDefaultValue(dataResponse.Money),
                    MoneyText: returnStringOrDefaultValue(dataResponse.MoneyText),
                    CreateDate: returnStringOrDefaultValue(dataResponse.CreateDate),
                    ModifiedDate: returnStringOrDefaultValue(dataResponse.ModifiedDate),
                    QuotationId: returnStringOrDefaultValue(dataResponse.QuotationId),
                },
                Errors: this.errors
            });
        }
    }

    setResultForAllQuotations(nextProps) {
        let quotationsSearchTermResult = nextProps.quotationsSearchTermResult.target;
        if (quotationsSearchTermResult != this.props.quotationsSearchTermResult.target && quotationsSearchTermResult.Success) {
            this.setState({ Quotations: quotationsSearchTermResult.Data });
        }
    }

    setResponseStateForSpecifyQuotation(nextProps) {
        let quotationResult = nextProps.quotationResult.target;
        if (quotationResult != this.props.quotationResult.target && quotationResult.Success) {
            if (quotationResult.Data.Car)
                this.setResultForCar(quotationResult.Data.Car);

            this.setResultForCustomer(quotationResult.Data.Customer);
        }
    }

    setResultForCar(dataResponse: any) {
        this.setState({ CarInfo: { Car: setResponseStateForCar(dataResponse) } });
    }
    
    setResultForCustomer(dataResponse: any) {
        this.setState({ CustomerInfo: { Customer: setResponseStateForCustomer(dataResponse) } });
    }
    
    loadQuotations() {
        let quotations = new Array<any>();
        quotations.push(<option value="" key={-1}>{"Chọn báo giá"}</option>);

        this.state.Quotations.forEach(quotationId => {
            quotations.push(<option value={quotationId} key={quotationId}>{quotationId}</option>);
        });
        return quotations;
    }

    checkValidOnEveryChange(name: string, valid: boolean) {
        this.state.Errors.SetValue(name, valid);
        this.setState({ IsValid: this.state.Errors.FindByValues(false).length == 0 });
    }

    validateInputRequired = (name: string, value: any) => {
        let isValid = this.inputInteraction.onValidate(new FormValidation.RequiredValidation(name, value));
        this.checkValidOnEveryChange(name, isValid);
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
        
        this.setState({ Receipts: this.inputInteraction.onReceiveTarget(event.target, this.state.Receipts) }, doValidation);
    }

    selectEvent = (event: any, validation?: (name: string, value: any, required: boolean, valueCompare: any) => void,
        required?: boolean, valueToCompare?: any) => {

        let name = event.target.name;
        let value = event.target.value;
        let doValidation = validation != undefined ? () => validation(name, value, required, valueToCompare) : null;

        this.setState({ Receipts: this.selectInteraction.onReceiveTarget(event.target, this.state.Receipts) }, doValidation);
    }

    setTitleForSaveButton() {
        return this.state.Receipts.Id > 0 ? "Cập nhật" : "Tạo mới";
    }
    
    goToPrintPage() {
        window.open(`/#/admin/bill-print/receipts/${this.state.Receipts.Id}/${this.props.quotationId}`, '_blank');
    }

    onSave = (event: any): any => {
        event.preventDefault();

        if (this.state.IsValid) {
            this.state.Receipts.QuotationId = this.state.Receipts.QuotationId ? 
                        this.state.Receipts.QuotationId : this.props.quotationId;
            this.props.createOrUpdateReceipts(this.state.Receipts.Id, this.state.Receipts);
        }
    }

    renderCustomerAndCarInfo() {
        if (this.props.quotationId) {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <CustomerInfo Customer={this.state.CustomerInfo.Customer} />
                    </div>
                    <div className="col-md-6">
                        <CarInfo Car={this.state.CarInfo.Car} />
                    </div>
                </div>
            );
        }
    }

    renderPrintIcon() {
        return this.state.Receipts.Id > 0 ? 
                <i className="fa fa-print fa-2x" style={{cursor: "pointer", float: "right", marginRight: 5}} 
                    title="In" onClick={this.goToPrintPage} /> : null;
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            {this.renderCustomerAndCarInfo()}

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title">
                                            <h3 style={{float: "left"}}>Thông tin phiếu thu</h3>
                                            {this.renderPrintIcon()}
                                            <a href="/#/admin/bills/" style={{float: "right", fontWeight: "bold", marginRight: 10}}>Danh sách phiếu thu</a>
                                        </div>
                                        <div className="ibox-content">
                                            <form role="form" onSubmit={this.onSave}>
                                                <div className="row">
                                                    <div className="col-md-3 form-group">
                                                        <label className="control-label">Báo giá</label>
                                                        <select className="form-control m-b" name="QuotationId"
                                                            onChange={e => this.selectEvent(e)}
                                                            value={this.state.Receipts.QuotationId}>
                                                            {this.loadQuotations()}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="hr-line-dashed"></div>
                                                <div className="row">
                                                    <div className="col-md-4 form-group">
                                                        <label className="control-label required">Người nộp tiền</label>
                                                        <input type="text" name="Payer" placeholder="Người nộp tiền" className="form-control"
                                                               onInput={e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value))}
                                                               value={this.state.Receipts.Payer} />
                                                    </div>
                                                    <div className="col-md-4 form-group">
                                                        <label className="control-label required">Số tiền (bằng số)</label>
                                                        <input type="text" name="Money" placeholder="Số tiền (bằng số)" className="form-control"
                                                               onInput={e => this.inputEvent(e, 
                                                               (name, value, required, valueCompare) => this.validateInputNumberAndMaxLength(name, value, required, valueCompare), true, 12)}
                                                               value={this.state.Receipts.Money} />
                                                    </div>
                                                    <div className="col-md-4 form-group">
                                                        <label className="control-label required">Số tiền (bằng chữ)</label>
                                                        <input type="text" name="MoneyText" placeholder="Số tiền (bằng chữ)" className="form-control"
                                                               onInput={e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value))}
                                                               value={this.state.Receipts.MoneyText} />
                                                    </div>
                                                </div>
                                                <div className="hr-line-dashed"></div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="control-label required">Nội dung</label>
                                                        <textarea className="form-control" name="Content" rows={5}
                                                                  placeholder="Nội dung"
                                                                  onInput={e => this.inputEvent(e, (name, value) => this.validateInputRequired(name, value))}
                                                                  value={this.state.Receipts.Content} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="control-label">Kèm theo</label>
                                                        <textarea className="form-control" name="Attach" rows={5}
                                                                  placeholder="Kèm theo"
                                                                  onInput={e => this.inputEvent(e)} 
                                                                  value={this.state.Receipts.Attach} />
                                                    </div>
                                                </div>
                                                <div className="hr-line-dashed"></div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group text-right">
                                                        <button type="submit" className="btn btn-w-m btn-primary"
                                                                disabled={!this.state.IsValid}>{this.setTitleForSaveButton()}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        receiptId: ownProps.match.params.receiptId,
        quotationId: ownProps.match.params.quotationId,
        quotationResult: state.QuotationReducer,
        quotationsSearchTermResult: state.AllQuotationsBySearchTermReducer,
        receiptsResult: state.ReceiptsReducer,
        createOrUpdateReceiptsResult: state.ReceiptsCreateOrUpdateReducer,
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    let quotationInfoAction = new FetchAction.QuotationAction();
    let receiptsInfoAction = new FetchAction.ReceiptsAction();
    let quotationsSearchTermAction = new FetchAction.AllQuotationsBySearchTermAction();
    let receiptsAction = new PostAction.ReceiptsCreateOrUpdateAction();
    
    return {
        getQuotation: (entry: any) => dispatch(quotationInfoAction.fetch(entry)),
        getReceipts: (receiptId: string) => dispatch(receiptsInfoAction.fetch(receiptId)),
        getAllQuotationsBySearchTerm: (searchTerm: string) => dispatch(quotationsSearchTermAction.fetch(searchTerm)),
        createOrUpdateReceipts: (id: number, receipts: any) => dispatch(receiptsAction.createOrUpdate(id, receipts)),
    }
}

const connectedReceiptsBill = connect(mapStateToProps, mapDispatchToProps)(ReceiptsBill);
export { connectedReceiptsBill as ReceiptsBill };
