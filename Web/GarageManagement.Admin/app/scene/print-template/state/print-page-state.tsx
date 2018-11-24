import { QuotationStatus } from "scene/quotation/model/quotation-info-model";

export interface IPrintTemplateState {
    Id: number,
    Content: string,
    StatusId: number,
    SelectedQuotationStep: QuotationStatus
}