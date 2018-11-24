import { IQuotation } from "../model/quotation-info-model";
import { IQuotationItem } from "../model/quotation-item-model";
import { 
    setNextStatusIdForQuotation,
    setPreviousStatusIdForQuotation,
    setNextStatusForCurrentQuotation,
    setPreviousStatusForCurrentQuotation,
    setStatusForCurrentQuotation 
} from "../model/initialization";
import { returnBooleanOrDefaultValue, returnNumberOrDefaultValue, returnStringOrDefaultValue } from "../../../core/library/data-type";

export function setResponseStateForQuotation(dataResponse: any) {
    let quotation : IQuotation = {
        Id: returnStringOrDefaultValue(dataResponse.Id),
        GenerateId: returnNumberOrDefaultValue(dataResponse.GenerateId),
        CustomerExchangeId: returnNumberOrDefaultValue(dataResponse.CustomerExchangeId),
        EntryDate: returnStringOrDefaultValue(dataResponse.EntryDate),
        StartDate: returnStringOrDefaultValue(dataResponse.StartDate),
        ExpectedCompleteDate: returnStringOrDefaultValue(dataResponse.ExpectedCompleteDate),
        CompleteDate: returnStringOrDefaultValue(dataResponse.CompleteDate),
        ContactName: returnStringOrDefaultValue(dataResponse.ContactName),
        ContactPhone: returnStringOrDefaultValue(dataResponse.ContactPhone),
        Note: returnStringOrDefaultValue(dataResponse.Note),
        Tracking: returnBooleanOrDefaultValue(dataResponse.Tracking),
        StatusId: returnNumberOrDefaultValue(dataResponse.StatusId),
        Status: returnStringOrDefaultValue(setStatusForCurrentQuotation(dataResponse.StatusName)),
        NextStatus: returnStringOrDefaultValue(setNextStatusForCurrentQuotation(dataResponse.StatusName)),
        PrevStatus: returnStringOrDefaultValue(setPreviousStatusForCurrentQuotation(dataResponse.StatusName)),
        NextKm: returnNumberOrDefaultValue(dataResponse.NextKm),
        NextMaintenanceDate: returnStringOrDefaultValue(dataResponse.NextMaintenanceDate)
    };
    return quotation;
}

export function setResponseStateForQuotationItems(dataResponse: any) {
    let quotation : IQuotationItem = {
        Id: returnNumberOrDefaultValue(dataResponse.Id),
        Quantity: returnNumberOrDefaultValue(dataResponse.Quantity),
        Duration: returnNumberOrDefaultValue(dataResponse.Duration),
        TotalPrice: returnNumberOrDefaultValue(dataResponse.TotalPrice),
        TotalPriceText: returnStringOrDefaultValue(dataResponse.TotalPriceText),
        Discount: returnNumberOrDefaultValue(dataResponse.Discount),
        FinalPrice: returnNumberOrDefaultValue(dataResponse.FinalPrice),
        VAT: returnNumberOrDefaultValue(dataResponse.VAT),
        UnitId: returnNumberOrDefaultValue(dataResponse.UnitId),
        UnitName: returnStringOrDefaultValue(dataResponse.UnitName),
        UnitPrice: returnNumberOrDefaultValue(dataResponse.UnitPrice),
        QuotationId: returnStringOrDefaultValue(dataResponse.QuotationId),
        AccessaryId: returnStringOrDefaultValue(dataResponse.AccessaryId),
        AccessaryName: returnStringOrDefaultValue(dataResponse.AccessaryName),
        ServiceId: returnStringOrDefaultValue(dataResponse.ServiceId),
        ServiceName: returnStringOrDefaultValue(dataResponse.ServiceName),
        EmployeeId: returnStringOrDefaultValue(dataResponse.EmployeeId),
        EmployeeName: returnStringOrDefaultValue(dataResponse.EmployeeName),
    };
    return quotation;
}
