import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import * as BaseComponent from "core/component/component";
import * as FetchAction from "../../action/fetch-action";
import * as GarageFetchAction from "../../../garage/action/fetch-action";
import * as QuotationFetchAction from "../../../quotation/action/fetch-action";
import * as PrintTemplateFetchAction from "../../../print-template/action/fetch-action";

import { IEmployee } from "../../../employee/model/employee-model";
import { IQuotation, QuotationStatus } from "../../model/quotation-info-model";
import { ICarInfo } from "../../model/car-info-model";
import { ICustomerInfo } from "../../model/customer-info-model";
import { IQuotationItem, IAccessaryItem, IServiceItem } from "../../model/quotation-item-model";
import { IGarage } from "../../../garage/model/garage-model";
import { PrintNavigationFooter } from "../presentation/print/print-navigation-footer";
import { hideLeftAsideForFullPagePrinting } from "core/component/component";

import { 
    returnBooleanOrDefaultValue, returnNumberOrDefaultValue, 
    returnStringOrDefaultValue, formatNumberWithCommaSeparator 
} from "../../../../core/library/data-type";

import { 
    initializeQuotation, initializeCarInfo, 
    initializeCustomerInfo, setStatusForCurrentQuotation 
} from "../../model/initialization";

import { setResponseStateForCar } from "../../../car/model/response-state-transform";
import { setResponseStateForCustomer } from "../../../customer/model/response-state-transform";
import { setResponseStateForQuotation, setResponseStateForQuotationItems } from "../../model/response-state-transform";

interface IPrintFormState {
    Garage: IGarage,
    Quotation: IQuotation,
    Note?: string,
    PrintTemplate: string,
    TotalFeeText: string,
    ShowTextFee: boolean,
    TotalDiscountAccessary: number,
    TotalDiscountService: number,
    CarInfo: ICarInfo,
    CustomerInfo: ICustomerInfo,
    Employees: Array<IEmployee>,
    Items: Array<IQuotationItem>,
    AccessaryItems: Array<IAccessaryItem>,
    ServiceItems: Array<IServiceItem>,
}

class PrintForm extends React.Component<any, IPrintFormState> implements BaseComponent.IComponentState {
    constructor(props: any) {
        super(props);
        this.print = this.print.bind(this);
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
            Note: "",
            PrintTemplate: "",
            TotalFeeText: "",
            ShowTextFee: true,
            TotalDiscountAccessary: 0,
            TotalDiscountService: 0,
            Quotation: initializeQuotation(),
            CarInfo: initializeCarInfo(),
            CustomerInfo: initializeCustomerInfo(),
            Employees: new Array<IEmployee>(),
            Items: new Array<IQuotationItem>(),
            AccessaryItems: new Array<IAccessaryItem>(),
            ServiceItems: new Array<IServiceItem>()
        }
    }

    componentDidMount() {
        hideLeftAsideForFullPagePrinting();

        this.props.getGargeInfo();
        this.props.getAllQuotationInfo();
        this.props.getQuotationNote();
        this.props.getAccessriesWithParentCategory();
        this.props.getServicesWithParentServiceType();
        this.props.getPrintTemplateByStatus(this.props.quotationStatusId);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setCombineResult(nextProps);
        this.setResultForGarage(nextProps);
        this.setResultForQuotationNote(nextProps);
        this.setResultForAccessariesWithParentCategory(nextProps);
        this.setResultForServicesWithParentServiceType(nextProps);
        this.setResultForPrintTemplate(nextProps);
    }
    
    setCombineResult(nextProps) {
        let allQuotationInfoResult = nextProps.allQuotationInfoResult.target;
        if (allQuotationInfoResult != this.props.allQuotationInfoResult.target && allQuotationInfoResult.Success) {
            this.setResultForQuotation(allQuotationInfoResult.Data.Quotation);
            this.setResultForCar(allQuotationInfoResult.Data.Quotation.Car);
            this.setResultForCustomer(allQuotationInfoResult.Data.Quotation.Customer);
            this.setResultForEmployees(allQuotationInfoResult.Data.Employees);
        }
    }
    
    setResultForQuotationNote(nextProps) {
        let specifyQuotationNoteResult = nextProps.specifyQuotationNoteResult.target;
        if (specifyQuotationNoteResult != this.props.specifyQuotationNoteResult.target && specifyQuotationNoteResult.Success)
            this.setState({ 
                Note: specifyQuotationNoteResult.Data ? specifyQuotationNoteResult.Data.Note : "" 
            });
    }

    setResultForPrintTemplate(nextProps) {
        let printTemplateByStatusResult = nextProps.printTemplateByStatusResult.target;
        if (printTemplateByStatusResult != this.props.printTemplateByStatusResult.target 
            && printTemplateByStatusResult.Success) {
            this.setState({ 
                PrintTemplate: returnStringOrDefaultValue(printTemplateByStatusResult.Data.Content) 
            });
        }
    }
    
    setResultForGarage(nextProps) {
        let garageInformationResult = nextProps.garageInformationResult.target;
        if (garageInformationResult != this.props.garageInformationResult.target && garageInformationResult.Success) {
            let dataResponse: IGarage = garageInformationResult.Data;
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
    }

    setResultForCar(dataResponse) {
        if (dataResponse)
            this.setState({ CarInfo: { Car: setResponseStateForCar(dataResponse) } });
    }
    
    setResultForCustomer(dataResponse) {
        this.setState({ CustomerInfo: { Customer: setResponseStateForCustomer(dataResponse) } });
    }
    
    setResultForQuotation(dataResponse) {
        this.setState({ Quotation: setResponseStateForQuotation(dataResponse) });
    }
    
    setResultForEmployees(dataResponse) {
        let employees = new Array<IEmployee>();

        dataResponse.forEach(function (employee, index) {
            let employeeModel: IEmployee = {
                Id: employee.Id,
                GenerateId: employee.GenerateId,
                Name: employee.Name,
                Phone: employee.Phone,
                Email: employee.Email,
                Address: employee.Address,
                Province: employee.Province,
                District: employee.District,
                Ward: employee.Ward,
                Birthday: employee.Birthday,
                IdentityCard: employee.IdentityCard,
                BranchId: employee.BranchId,
                BranchName: employee.BranchName,
            };
            employees.push(employeeModel);
        });
        this.setState({ Employees: employees });
    }

    setResultForAccessariesWithParentCategory(nextProps) {
        let totalDiscountAccessary = 0;

        let quotationItemsGroupByParentCategoriesResult = nextProps.quotationItemsGroupByParentCategoriesResult.target;
        if (quotationItemsGroupByParentCategoriesResult != this.props.quotationItemsGroupByParentCategoriesResult.target &&
            quotationItemsGroupByParentCategoriesResult.Success) {
            
            let accessariesWithParentCategory = new Array<IAccessaryItem>();
            let dataResponse = quotationItemsGroupByParentCategoriesResult.Data;
            dataResponse.forEach(ap => {
                
                let accessaryItems = new Array<IQuotationItem>();
                
                ap.Items.forEach(accessary => {
                    totalDiscountAccessary += accessary.Discount;
                    accessaryItems.push(setResponseStateForQuotationItems(accessary)); 
                });

                let accessary = {
                    ParentCategoryName: ap.ParentCategory.Name,
                    Items: accessaryItems
                };
                accessariesWithParentCategory.push(accessary);
            });
            this.setState({ 
                TotalDiscountAccessary: totalDiscountAccessary,
                AccessaryItems: accessariesWithParentCategory 
            });
        }
    }

    setResultForServicesWithParentServiceType(nextProps) {
        let totalDiscountService = 0;

        let quotationItemsGroupByParentServiceTypesResult = nextProps.quotationItemsGroupByParentServiceTypesResult.target;
        if (quotationItemsGroupByParentServiceTypesResult != this.props.quotationItemsGroupByParentServiceTypesResult.target &&
            quotationItemsGroupByParentServiceTypesResult.Success) {
            
            let servicesWithParentServiceType = new Array<IServiceItem>();
            let dataResponse = quotationItemsGroupByParentServiceTypesResult.Data;
            dataResponse.forEach(sp => {
                let serviceItems = new Array<IQuotationItem>();
                
                sp.Items.forEach(service => { 
                    totalDiscountService += service.Discount;
                    serviceItems.push(setResponseStateForQuotationItems(service)); 
                });

                let service = {
                    ParentServiceTypeName: sp.ParentServiceType.Name,
                    Items: serviceItems
                };
                servicesWithParentServiceType.push(service);
            });
            this.setState({ 
                TotalDiscountService: totalDiscountService,
                ServiceItems: servicesWithParentServiceType 
            });
        }
    }
    
    renderQuotationItems() {
        if (this.props.quotationStatusId != QuotationStatus.RequestFromCustomer) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table className="table print-page">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase">STT</th>
                                        <th className="text-uppercase">Phụ tùng / Công dịch vụ</th>
                                        <th className="text-uppercase">Nhân viên</th>
                                        <th className="text-uppercase text-center">Số lượng</th>
                                        <th className="text-uppercase text-center">ĐVT</th>
                                        {this.canShowItemPrices() && <th className="text-uppercase text-center">Đơn giá</th>}
                                        {this.canShowItemPrices() && <th className="text-uppercase text-center">Thành tiền</th>}
                                        {
                                            this.canShowItemPrices() && 
                                            (this.state.TotalDiscountAccessary > 0 || this.state.TotalDiscountService > 0) && 
                                            <th className="text-uppercase text-center">Giảm giá (%)</th>
                                        }
                                        {this.canShowItemPrices() && <th className="text-uppercase text-center">Thanh toán</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderAccessaryItems()}
                                    {
                                        this.props.quotationStatusId != QuotationStatus.ExportMaterial
                                        && this.renderServiceItems()
                                    }
                                    {this.canShowItemPrices() && this.renderTotalPrice()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    renderAccessaryItems() {
        return (
            this.state.AccessaryItems ?
            this.state.AccessaryItems.map((accessaryWithCategory: IAccessaryItem, i) => { 
                return (
                    <React.Fragment>
                        <tr key={i+10} style={{ backgroundColor: "#f1f1f1ec"}}>
                            <td colSpan={9}>
                                <strong>{accessaryWithCategory.ParentCategoryName.toLocaleUpperCase()}</strong>
                                <span className="text-uppercase font-bold"> (Danh mục)</span>
                            </td>
                        </tr>
                        {
                            accessaryWithCategory.Items.map((item: IQuotationItem, j) => {
                                return (
                                    <tr key={j}>
                                        <td>{j + 1}</td>
                                        <td>{item.AccessaryName}</td>
                                        <td></td>
                                        <td className="text-center">{item.Quantity}</td>
                                        <td className="text-center">{item.UnitName}</td>
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.UnitPrice)}</td>}
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.TotalPrice)}</td>}
                                        {
                                            this.canShowItemPrices() &&
                                            (this.state.TotalDiscountAccessary > 0 || this.state.TotalDiscountService > 0) && 
                                            <td className="text-center">{item.Discount}</td>
                                        }
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.FinalPrice)}</td>}
                                    </tr>
                                )
                            })
                        }
                    </React.Fragment>
                )
            }) : null
        )
    }

    renderServiceItems() {
        return (
            this.state.ServiceItems ?
            this.state.ServiceItems.map((serviceWithCategory: IServiceItem, i) => { 
                return (
                    <React.Fragment>
                        <tr key={i+10} style={{ backgroundColor: "#f1f1f1ec"}}>
                            <td colSpan={9}>
                                <strong>{serviceWithCategory.ParentServiceTypeName.toLocaleUpperCase()}</strong>
                                <span className=" text-uppercase font-bold"> (Loại dịch vụ)</span>
                            </td>
                        </tr>
                        {
                            serviceWithCategory.Items.map((item: IQuotationItem, j) => {
                                return (
                                    <tr key={j}>
                                        <td>{j + 1}</td>
                                        <td>{item.ServiceName}</td>
                                        <td>{item.EmployeeName}</td>
                                        <td className="text-center">{item.Quantity}</td>
                                        <td className="text-center">{item.UnitName}</td>
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.UnitPrice)}</td>}
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.TotalPrice)}</td>}
                                        {
                                            this.canShowItemPrices() &&
                                            (this.state.TotalDiscountAccessary > 0 || this.state.TotalDiscountService > 0) && 
                                            <td className="text-center">{item.Discount}</td>
                                        }
                                        {this.canShowItemPrices() && <td className="text-center">{formatNumberWithCommaSeparator(item.FinalPrice)}</td>}
                                    </tr>
                                )
                            })
                        }
                    </React.Fragment>
                )
            }) : null
        )
    }
    
    renderTotalPrice() {
        if (this.state.AccessaryItems || this.state.ServiceItems) {
            let totalFee = 0;
            this.state.AccessaryItems.forEach(x => { x.Items.forEach(y => totalFee += y.FinalPrice); });
            this.state.ServiceItems.forEach(x => { x.Items.forEach(y => totalFee += y.FinalPrice); });
            let feeSubVAT = (totalFee*10) / 100;
            let finalFeeIncludeVAT = totalFee + feeSubVAT;
            
            return (
                <React.Fragment>
                    <tr key={2}>
                        <td colSpan={2}>Tổng cộng</td>
                        <td>&nbsp;</td> <td>&nbsp;</td> {this.showColSpanBaseOnCondition()}
                        <td className="text-center">{formatNumberWithCommaSeparator(totalFee)}</td>
                    </tr>
                    <tr key={3}>
                        <td colSpan={2}>VAT (10%)</td> 
                        <td>&nbsp;</td> <td>&nbsp;</td> {this.showColSpanBaseOnCondition()}
                        <td className="text-center">{formatNumberWithCommaSeparator(feeSubVAT)}</td>
                    </tr>
                    <tr key={4}>
                        <td colSpan={2}><strong>Tổng chi phí</strong></td>
                        <td>&nbsp;</td> <td>&nbsp;</td> {this.showColSpanBaseOnCondition()}
                        <td className="text-center"><strong>{formatNumberWithCommaSeparator(finalFeeIncludeVAT)}</strong></td>
                    </tr>
                    <tr key={5}>
                        <td colSpan={2}><i>Bằng chữ (VNĐ)</i></td>
                        <td colSpan={2.5}>
                        {
                            this.state.ShowTextFee &&
                            <i>
                                <input type="text" name="TotalFeeText" className="form-control text-right" 
                                       placeholder="Bằng chữ (VNĐ)" value={this.state.TotalFeeText} 
                                       onInput={e => this.inputEvent(e)} />
                            </i>
                        }
                        </td>
                        <td colSpan={5.5} className="text-right">
                            <i>{this.state.TotalFeeText}</i>
                        </td>
                    </tr>
                </React.Fragment>
            )
        }
    }
    
    inputEvent = (event: any) => {
        this.setState({ TotalFeeText: event.target.value });
    }
    
    canShowItemPrices() {
        let quotationStatus = this.props.quotationStatusId;
        if (quotationStatus == QuotationStatus.RepairCommand || 
            quotationStatus == QuotationStatus.ExportMaterial ||  
            quotationStatus == QuotationStatus.Complete) {
            return false;
        }
        return true;
    }
    
    showColSpanBaseOnCondition() {
        let colSpan = new Array<JSX.Element>();
        let totalColSpan = 4;
        
        if (!this.canShowItemPrices())
            totalColSpan -= 3;
        if (!(this.state.TotalDiscountAccessary > 0 || this.state.TotalDiscountService > 0))
            totalColSpan -= 1;
        
        for(var i=0; i<totalColSpan; i++) 
            colSpan.push(<td>&nbsp;</td>);

        return colSpan;
    }
    
    print() {
        this.setState({ ShowTextFee: false }, () => { window.print() });
    }

    renderCustomerInfo() {
        if (this.canShowItemPrices())
            return (
                <React.Fragment>
                    <tr>
                        <td>Khách hàng:</td>
                        <td><strong>{this.state.CustomerInfo.Customer.Name}</strong></td>
                        <td>Điện thoại:</td>
                        <td>{this.state.CustomerInfo.Customer.Phone}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{this.state.CustomerInfo.Customer.Address}</td>
                        <td>Email:</td>
                        <td>{this.state.CustomerInfo.Customer.Email}</td>
                    </tr>
                </React.Fragment>
            );
    }
    
    renderQuotationInfo() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div>
                        <div>
                            <div className="table-responsive">
                                <table className="table print-page">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "18%" }}></th>
                                            <th style={{ width: "32%" }}></th>
                                            <th style={{ width: "25%" }}></th>
                                            <th style={{ width: "25%" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCustomerInfo()}
                                        <tr>
                                            <td>Biển số xe:</td>
                                            <td><strong>{this.state.CarInfo.Car.LicensePlates}</strong></td>
                                            <td>Số vin:</td>
                                            <td><strong>{this.state.CarInfo.Car.VinNumber}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Số Km:</td>
                                            <td>{formatNumberWithCommaSeparator(this.state.CarInfo.Car.Km)}</td>
                                            <td>Màu xe:</td>
                                            <td>{this.state.CarInfo.Car.Color}</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày vào:</td>
                                            <td>{this.state.Quotation.EntryDate}</td>
                                            <td>TG Dự kiến hoàn thành:</td>
                                            <td>{this.state.Quotation.ExpectedCompleteDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Người liên lạc:</td>
                                            <td>{this.state.Quotation.ContactName}</td>
                                            <td>Số Km bảo dưỡng:</td>
                                            <td>{formatNumberWithCommaSeparator(!!this.state.Quotation.NextKm ? this.state.Quotation.NextKm : 0)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>
                                                <strong>Yêu cầu từ khách hàng: </strong>
                                                <p style={{lineHeight: 1.5}}>{this.state.Note}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            <p>Địa chỉ: {this.state.Garage.Address} {this.state.Garage.District} {this.state.Garage.Ward}</p>
                            <p>Điện thoại: {this.state.Garage.Phone}</p>
                            <p>Website: {this.state.Garage.Website}</p>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <div className="information">
                        <div className="form-inline">
                            <div className="form-group" style={{fontSize: 15, marginRight: 20}}>
                                <p>Ngày: <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                                <p>Số: <strong>{this.state.Quotation.Id}</strong></p>
                            </div>
                            {
                                this.state.ShowTextFee &&
                                <div className="form-group">
                                    <i className="fa fa-print fa-2x" title="In" onClick={this.print} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        return (
            <React.Fragment>
                <div id="print-form">
                    {this.renderGarageInfo()}
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h2 className="print-page">
                                    <strong style={{ textTransform: "uppercase" }}>
                                        {setStatusForCurrentQuotation(QuotationStatus[this.props.quotationStatusId])}
                                    </strong>
                                </h2>
                            </div>
                        </div>
                    </div>

                    {this.renderQuotationInfo()}
                    {this.renderQuotationItems()}

                    <PrintNavigationFooter PrintTemplate={this.state.PrintTemplate} QuotationStatus={this.props.quotationStatusId} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        quotationId: ownProps.match.params.quotationId,
        quotationStatusId: ownProps.match.params.quotationStatusId,
        allQuotationInfoResult: state.AllQuotationReducer,
        garageInformationResult: state.GarageInformationReducer,
        specifyQuotationNoteResult: state.SpecifyQuotationNoteReducer,
        quotationItemsGroupByParentCategoriesResult: state.QuotationItemsGroupByParentCategoriesReducer,
        quotationItemsGroupByParentServiceTypesResult: state.QuotationItemsGroupByParentServiceTypesReducer,
        printTemplateByStatusResult: state.GetPrintTemplateByStatusReducer
    };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    let garageInfoAction = new GarageFetchAction.GarageInformationAction();
    let allQuotationInfoAction = new FetchAction.AllQuotationAction();
    let specifyQuotationNoteAction = new QuotationFetchAction.SpecifyQuotationNoteAction();
    let quotationItemsGroupByParentCategoriesAction = new FetchAction.QuotationItemsGroupByParentCategoriesAction();
    let quotationItemsGroupByParentServiceTypesAction = new FetchAction.QuotationItemsGroupByParentServicesAction();
    let prinTemplateByStatusAction = new PrintTemplateFetchAction.PrintTemplateAction();
    
    return {
        getGargeInfo: (entry: any) => dispatch(garageInfoAction.fetch(entry)),

        getAllQuotationInfo: () => dispatch(allQuotationInfoAction.fetch(ownProps.match.params.quotationId)),
        
        getAccessriesWithParentCategory: () => 
            dispatch(quotationItemsGroupByParentCategoriesAction.fetch(ownProps.match.params.quotationId)),

        getServicesWithParentServiceType: () => 
            dispatch(quotationItemsGroupByParentServiceTypesAction.fetch(ownProps.match.params.quotationId)),

        getQuotationNote: (quotationId: string, statusId: number) => 
            dispatch(specifyQuotationNoteAction.fetch({ 
                        quotationId: ownProps.match.params.quotationId, 
                        statusId: ownProps.match.params.quotationStatusId 
                    })),

        getPrintTemplateByStatus: (status: QuotationStatus) => dispatch(prinTemplateByStatusAction.fetch(status)),
    }
}

const connectedPrintForm = connect(mapStateToProps, mapDispatchToProps)(PrintForm);
export { connectedPrintForm as PrintForm };
