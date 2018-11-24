interface IQuotationBill {
    Id: number,
    Content: string,
    Attach: string,
    Money: number,
    MoneyText: string,
    CreateDate: string,
    ModifiedDate: string,
    QuotationId: string
}

export interface IReceipts extends IQuotationBill {
    Payer?: string
}

export interface IPaySlip extends IQuotationBill {
    Receiver?: string
}

function initializeQuotationBill() {
    let result: IQuotationBill = {
        Id: 0,
        Content: "",
        Attach: "",
        Money: 0,
        MoneyText: "",
        CreateDate: "",
        ModifiedDate: "",
        QuotationId: ""
    };
    return result;
}

export function initializeReceipts() {
    let result: IReceipts = initializeQuotationBill();
    result.Payer = "";
    return result;
}

export function initializePaySlip() {
    let result: IPaySlip = initializeQuotationBill();
    result.Receiver = "";
    return result;
}
