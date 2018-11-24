import { Branch, CustomerType } from "../model/common-model";
import { ICarInfo } from "../model/car-info-model";
import { ICustomerInfo } from "../model/customer-info-model";
import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export enum QuotationStatus {
    None = 0,
    RequestFromCustomer = 1,
    Quotation = 2,
    Cancel = 3,
    RepairCommand = 4,
    ExportMaterial = 5,
    Complete = 6,
    CheckUp = 7,
    Done = 8
}

export const QuotationStatuses = new Array<QuotationStatus>
(
    QuotationStatus.None,
    QuotationStatus.RequestFromCustomer,
    QuotationStatus.Quotation,
    QuotationStatus.Cancel,
    QuotationStatus.RepairCommand,
    QuotationStatus.ExportMaterial,
    QuotationStatus.Complete,
    QuotationStatus.CheckUp,
    QuotationStatus.Done   
)

export interface IQuotationInfo {
    Quotation: IQuotation,
    Car?: ICarInfo,
    Customer?: ICustomerInfo
}

export interface IQuotation {
    Id: stringOrEmpty,
    GenerateId: numberOrEmpty,
    CustomerExchangeId: numberOrEmpty,
    EntryDate: stringOrEmpty,
    StartDate: stringOrEmpty,
    ExpectedCompleteDate: stringOrEmpty,
    CompleteDate: stringOrEmpty,
    ContactName: stringOrEmpty,
    ContactPhone: stringOrEmpty,
    Note: stringOrEmpty,
    Tracking: booleanOrEmpty,
    StatusId: numberOrEmpty,
    Status: stringOrEmpty,
    NextStatus?: stringOrEmpty,
    PrevStatus?: stringOrEmpty,
    NextKm?: numberOrEmpty,
    NextMaintenanceDate?: stringOrEmpty,
    BranchId?: stringOrEmpty,
    AgreeToSwitchToNextOrPreviousStep?: boolean
}

export interface IQuotationLookup {
    Quotation: IQuotation,
    Customer: {
        Id: string,
        Name: string,
        Phone: string,
    },
    Car: {
        Id: string,
        Name: string,
        LicensePlates: string
    }
}
