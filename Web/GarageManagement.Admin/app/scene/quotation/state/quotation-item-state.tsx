import { stringOrEmpty, numberOrEmpty, booleanOrEmpty } from "../../../core/library/data-type";

export interface IQuotationItem {
    Id: numberOrEmpty;
    Quantity: numberOrEmpty,
    Duration: numberOrEmpty,
    TotalPrice: numberOrEmpty,
    TotalPriceText: stringOrEmpty,
    Discount: numberOrEmpty,
    FinalPrice: numberOrEmpty,
    VAT: numberOrEmpty,
    UnitId: numberOrEmpty,
    UnitName: stringOrEmpty,
    UnitPrice: numberOrEmpty,
    QuotationId: stringOrEmpty,
    AccessaryId: stringOrEmpty,
    AccessaryName: stringOrEmpty,
    ServiceId: stringOrEmpty,
    ServiceName: stringOrEmpty,
    EmployeeId: stringOrEmpty,
    EmployeeName: stringOrEmpty,
    IsEdittingRow?: boolean,
    IsDisableAddedRow?: boolean
}

export interface IAccessaryItem {
    ParentCategoryName: string,
    Items: Array<IQuotationItem>
}

export interface IServiceItem {
    ParentServiceTypeName: string,
    Items: Array<IQuotationItem>
}
