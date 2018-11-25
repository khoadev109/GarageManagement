import { ICar } from "../../car/model/car-model";
import { ICarInfo } from "../model/car-info-model";
import { ICustomerInfo } from "../model/customer-info-model";
import { ICustomer } from "../../customer/model/customer-model";
import { IQuotationItem, IAccessaryItem, IServiceItem } from "../model/quotation-item-model";
import { QuotationStatus } from "./quotation-info-state";
import { initializeCar } from "../../car/model/initialization";
import { initializeCustomer } from "../../customer/model/initialization";

export function initializeCarInfo() : ICarInfo {
    return { Car: initializeCar() }
}
    
export function initializeCustomerInfo() : ICustomerInfo {
    return { Customer: initializeCustomer() }
}

export function initializeQuotation() {
    return {
        Id: "",
        GenerateId: 0,
        CustomerExchangeId: 0,
        EntryDate: "",
        StartDate: "",
        ExpectedCompleteDate: "",
        CompleteDate: "",
        ContactName: "",
        ContactPhone: "",
        Note: "",
        Tracking: false,
        StatusId: 0,
        Status: "",
        NextStatus: "",
        PrevStatus: ""
    }
}

export function initializeAccessaryItem() {
    let accessaryItems: IAccessaryItem = {
        ParentCategoryName: "",
        Items: new Array<IQuotationItem>()
    };
    return accessaryItems;
}

export function initializeServiceItem() {
    let serviceItems: IServiceItem = {
        ParentServiceTypeName: "",
        Items: new Array<IQuotationItem>()
    };
    return serviceItems;
}

export function initializeQuotationItem() {
    let item: IQuotationItem = {
        Id: 0,
        Quantity: 0,
        Duration: 0,
        TotalPrice: 0,
        TotalPriceText: "",
        Discount: 0,
        FinalPrice: 0,
        VAT: 0,
        UnitId: 0,
        UnitName: "",
        UnitPrice: 0,
        QuotationId: "",
        AccessaryId: "",
        AccessaryName: "",
        ServiceId: "",
        ServiceName: "",
        EmployeeId: "",
        EmployeeName: "",
        IsEdittingRow: false,
        IsDisableAddedRow: true
    };
    return item;
}

export function setNextStatusIdForQuotation(statusId: number) {
    if (statusId == QuotationStatus.RequestFromCustomer)
        return QuotationStatus.Quotation;
    if (statusId == QuotationStatus.Quotation)
        return QuotationStatus.RepairCommand;
    if (statusId == QuotationStatus.RepairCommand)
        return QuotationStatus.ExportMaterial;
    if (statusId == QuotationStatus.ExportMaterial)
        return QuotationStatus.Complete;
    if (statusId == QuotationStatus.Complete)
        return QuotationStatus.CheckUp;
}

export function setPreviousStatusIdForQuotation(statusId: number) {
    if (statusId == QuotationStatus.Quotation)
        return QuotationStatus.RequestFromCustomer;
    if (statusId == QuotationStatus.RepairCommand)
        return QuotationStatus.Quotation;
    if (statusId == QuotationStatus.ExportMaterial)
        return QuotationStatus.RepairCommand;
    if (statusId == QuotationStatus.Complete)
        return QuotationStatus.ExportMaterial;
    if (statusId == QuotationStatus.CheckUp)
        return QuotationStatus.Complete;
}

export function setNextStatusForCurrentQuotation(status: string) {
    if (status == "RequestFromCustomer")
        return "Báo giá";
    if (status == "Quotation")
        return "Lệnh sửa chữa";
    if (status == "RepairCommand")
        return "Yêu cầu xuất vật tư"
    if (status == "ExportMaterial")
        return "Hoàn thành";
    if (status == ("Complete"))
        return "Nghiệm thu";
    if (status == ("CheckUp"))
        return "Hoàn tất";   
}

export function setPreviousStatusForCurrentQuotation(status: string) {
    if (status == "Quotation")
        return "Tiếp nhận xe";
    if (status == "RepairCommand")
        return "Báo giá";
    if (status == "ExportMaterial")
        return "Lệnh sửa chữa"
    if (status == "Complete")
        return "Yêu cầu xuất vật tư";
    if (status == ("CheckUp"))
        return "Hoàn thành";   
}

export function setStatusForCurrentQuotation(status: string) {
    if (status == "RequestFromCustomer")
        return "Tiếp nhận xe";
    if (status == "Quotation")
        return "Báo giá";
    if (status == "Cancel")
        return "Đã hủy";
    if (status == "RepairCommand")
        return "Lệnh sửa chữa";
    if (status == "ExportMaterial")
        return "Yêu cầu xuất vật tư";
    if (status == "Complete")
        return "Hoàn thành";
    if (status == "CheckUp")
        return "Nghiệm thu";
    if (status == "Done")
        return "Hoàn tất";
}

export function setStatusNameByStatusId(statusId: number) : string {
    let quotationStatus = statusId as QuotationStatus;
    let quotationStatusName = QuotationStatus[quotationStatus];
    return quotationStatusName;
}
