import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import * as BaseComponent from "core/component/component";
import * as FetchAction from "../../../action/fetch-action";
import * as GarageFetchAction from "../../../../garage/action/fetch-action";

import { IQuotation } from "../../../model/quotation-info-model";
import { ICarInfo } from "../../../model/car-info-model";
import { ICustomerInfo } from "../../../model/customer-info-model";
import { IGarage } from "../../../../garage/model/garage-model";
import { ReceiptsInfo } from "../../presentation/print/bill/receipts-info-component";
import { PaySlipInfo } from "../../presentation/print/bill/payslip-info-component";
import { CustomerCarInfo } from "../../presentation/print/bill/customer-car-info-component";

import { hideLeftAsideForFullPagePrinting } from "core/component/component";
import { returnBooleanOrDefaultValue, returnNumberOrDefaultValue, returnStringOrDefaultValue } from "../../../../../core/library/data-type";

import { IReceipts, IPaySlip, initializeReceipts, initializePaySlip } from "../../../model/bill-model";

import { initializeQuotation, initializeCarInfo, initializeCustomerInfo } from "../../../model/initialization";

import { setResponseStateForCar } from "../../../../car/model/response-state-transform";
import { setResponseStateForCustomer } from "../../../../customer/model/response-state-transform";

interface IBillPrintFormState {
    Garage: IGarage,
    Quotation: IQuotation,
    CarInfo: ICarInfo,
    CustomerInfo: ICustomerInfo,
    ReceiptsInfo?: IReceipts,
    PaySlipInfo?: IPaySlip
}

class BillPrintForm extends React.Component<any, IBillPrintFormState> implements BaseComponent.IComponentState {
    constructor(props: any) {
        super(props);
        this.initializeState();
    }

    initializeState() {
        this.state = {
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
            Quotation: initializeQuotation(),
            CarInfo: initializeCarInfo(),
            CustomerInfo: initializeCustomerInfo(),
            ReceiptsInfo: initializeReceipts(),
            PaySlipInfo: initializePaySlip()
        }
    }

    componentDidMount() {
        hideLeftAsideForFullPagePrinting();

        this.props.getGargeInfo();

        if (this.props.quotationId != "") {
            this.props.getAllQuotationInfo();
        
            if (this.props.billType == "receipts")
                this.props.getReceipts(this.props.id);
            if (this.props.billType == "payslip")
                this.props.getPaySlip(this.props.id);
        }
        else {

        }
    }
    
    componentWillReceiveProps(nextProps) {
        let garageInformationResult = nextProps.garageInformationResult.target;
        if (garageInformationResult != this.props.garageInformationResult.target && garageInformationResult.Success)
            this.setResultForGarage(garageInformationResult.Data);
        
        if (this.props.quotationId != "") {
            let allQuotationInfoResult = nextProps.allQuotationInfoResult.target;
            if (allQuotationInfoResult != this.props.allQuotationInfoResult.target && allQuotationInfoResult.Success) {
                this.setResultForCar(allQuotationInfoResult.Data.Quotation.Car);
                this.setResultForCustomer(allQuotationInfoResult.Data.Quotation.Customer);
            }
        }

        if (this.props.billType == "receipts")
            this.setResponseStateForReceipts(nextProps);
        if (this.props.billType == "payslip")
            this.setResponseStateForPaySlip(nextProps);
    }

    setResponseStateForReceipts(nextProps) {
        if (this.props.quotationId != "") {
            let receiptsResult = nextProps.receiptsResult.target;
            if (receiptsResult != this.props.receiptsResult.target && receiptsResult.Success)
                this.setResponseDataForReceipts(receiptsResult.Data);
        }
        else {

        }
    }

    setResponseDataForReceipts(dataResponse) {
        this.setState({
            ReceiptsInfo: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Payer: returnStringOrDefaultValue(dataResponse.Payer),
                Content: returnStringOrDefaultValue(dataResponse.Content),
                Attach: returnStringOrDefaultValue(dataResponse.Attach),
                Money: returnNumberOrDefaultValue(dataResponse.Money),
                MoneyText: returnStringOrDefaultValue(dataResponse.MoneyText),
                CreateDate: returnStringOrDefaultValue(dataResponse.CreateDate),
                ModifiedDate: returnStringOrDefaultValue(dataResponse.ModifiedDate),
                QuotationId: returnStringOrDefaultValue(dataResponse.QuotationId),
            }
        });        
    }

    setResponseStateForPaySlip(nextProps) {
        if (this.props.quotationId != "") {
            let paySlipResult = nextProps.paySlipResult.target;
            if (paySlipResult != this.props.paySlipResult.target && paySlipResult.Success)
                this.setResultForPaySlip(paySlipResult.Data);
        }
        else {

        }
    }

    setResultForPaySlip(dataResponse) {
        this.setState({
            PaySlipInfo: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Receiver: returnStringOrDefaultValue(dataResponse.Receiver),
                Content: returnStringOrDefaultValue(dataResponse.Content),
                Attach: returnStringOrDefaultValue(dataResponse.Attach),
                Money: returnNumberOrDefaultValue(dataResponse.Money),
                MoneyText: returnStringOrDefaultValue(dataResponse.MoneyText),
                CreateDate: returnStringOrDefaultValue(dataResponse.CreateDate),
                ModifiedDate: returnStringOrDefaultValue(dataResponse.ModifiedDate),
                QuotationId: returnStringOrDefaultValue(dataResponse.QuotationId),
            }
        });
    }

    setResultForGarage(dataResponse: any) {
        this.setState({
            Garage: {
                Id: returnNumberOrDefaultValue(dataResponse.Id),
                Website: returnStringOrDefaultValue(dataResponse.Website),
                ExpireDate: returnStringOrDefaultValue(dataResponse.ExpireDate),
                Name: returnStringOrDefaultValue(dataResponse.Name),
                ShortName: returnStringOrDefaultValue(dataResponse.ShortName),
                Address: returnStringOrDefaultValue(dataResponse.Address),
                District: returnStringOrDefaultValue(dataResponse.District),
                Ward: returnStringOrDefaultValue(dataResponse.Ward),
                Phone: returnStringOrDefaultValue(dataResponse.Phone),
                Logo: returnStringOrDefaultValue(dataResponse.Logo),
                SmsPhoneNumber: returnBooleanOrDefaultValue(dataResponse.SmsPhoneNumber),
                EmailSchedule: returnBooleanOrDefaultValue(dataResponse.EmailSchedule)
            }
        });
    }
    
    setResultForCar(dataResponse) {
        if (dataResponse)
            this.setState({ CarInfo: { Car: setResponseStateForCar(dataResponse) } });
    }
    
    setResultForCustomer(dataResponse) {
        this.setState({ CustomerInfo: { Customer: setResponseStateForCustomer(dataResponse) } });
    }

    setBillTitle() {
        if (this.props.billType == "receipts")
            return "Phiếu thu";
        if (this.props.billType == "payslip")
            return "Phiếu chi";
        return "";
    }

    renderGarageInfo() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="logo-block">
                        <div className="logo">
                            <img alt="" src={this.state.Garage.Logo} className="img-responsive" width="100" />
                        </div>
                        <div className="information" style={{ fontSize: 20, fontFamily: "-WEBKIT-PICTOGRAPH", marginLeft: 10 }}>
                            <p>{this.state.Garage.Name}</p>
                            <p>{this.state.Garage.Address} {this.state.Garage.District} {this.state.Garage.Ward}</p>
                            <p>{this.state.Garage.Phone}</p>
                            <p>{this.state.Garage.Website}</p>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <div className="information">
                        <div className="form-inline">
                            <div className="form-group" style={{fontSize: 15, marginRight: 20}}>
                                <p>Ngày: <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                                {this.props.quotationId != "undefined" && <p>Số: <strong>{this.props.quotationId}</strong></p>}
                            </div>
                            <div className="form-group">
                                <i className="fa fa-print fa-2x" title="In" onClick={window.print} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    renderBillInfo() {
        let customerCarComponent = 
        <CustomerCarInfo 
            BillType={this.props.billType}
            Customer={this.state.CustomerInfo.Customer} 
            Car={this.state.CarInfo.Car} />;

        if (this.props.billType == "receipts")
            return <ReceiptsInfo Information={this.state.ReceiptsInfo} CustomerCar={customerCarComponent} />
        if (this.props.billType == "payslip")
            return <PaySlipInfo Information={this.state.PaySlipInfo} CustomerCar={customerCarComponent} />
    }
    
    render() {
        return (
            <React.Fragment>
                <div id="print-form">
                    {this.renderGarageInfo()}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h2>
                                    <strong className="text-uppercase">
                                        {this.setBillTitle()}
                                    </strong>
                                </h2>
                            </div>
                        </div>
                    </div>

                    {this.renderBillInfo()}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        id: ownProps.match.params.id,
        quotationId: ownProps.match.params.quotationId,
        billType: ownProps.match.params.billType,
        quotationStatusId: ownProps.match.params.quotationStatusId,
        allQuotationInfoResult: state.AllQuotationReducer,
        garageInformationResult: state.GarageInformationReducer,
        receiptsResult: state.ReceiptsReducer,
        paySlipResult: state.PaySlipReducer,
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    let garageInfoAction = new GarageFetchAction.GarageInformationAction();
    let allQuotationInfoAction = new FetchAction.AllQuotationAction();
    let receiptsInfoAction = new FetchAction.ReceiptsAction();
    let paySlipInfoAction = new FetchAction.PaySlipAction();
    
    return {
        getGargeInfo: (entry: any) => dispatch(garageInfoAction.fetch(entry)),
        getReceipts: (receiptId: string) => dispatch(receiptsInfoAction.fetch(receiptId)),
        getPaySlip: (paySlipId: string) => dispatch(paySlipInfoAction.fetch(paySlipId)),
        getAllQuotationInfo: () => dispatch(allQuotationInfoAction.fetch(ownProps.match.params.quotationId))
    }
}

const connectedBillPrintForm = connect(mapStateToProps, mapDispatchToProps)(BillPrintForm);
export { connectedBillPrintForm as BillPrintForm };
