import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class QuotationCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Quotation/Post"), 
            request
        );
    }
}

export class QuotationEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/Put"), 
            request.quotationDTO, 
            `?quotationId=${request.quotationId}`
        );
    }
}

export class QuotationEditOnlyQuotationInfoService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/PutOnlyQuotation"), 
            request
        );
    }
}

export class QuotationChangeStatusService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/PutQuotationStatus"),
            request.statusId, 
            `?quotationId=${request.quotationId}`
        );
    }
}

export class QuotationItemCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Quotation/CreateQuotationItem"), 
            request
        );
    }
}

export class QuotationItemEditService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/EditQuotationItem"), 
            request, 
            `?quotationItemId=${request.Id}`
        );
    }
}

export class QuotationItemDeleteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Delete(
            Environment.GetApiUrl("Quotation/RemoveQuotationItem"),
            `?quotationItemId=${request.quotationItemId}`
        );
    }
}

export class QuotationMultipleItemCreateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Post(
            Environment.GetApiUrl("Quotation/CreateListOfQuotationItems"), 
            request
        );
    }
}

export class QuotationUpdateItemsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/UpdateQuotationItems"), 
            request.items, 
            `?quotationId=${request.quotationId}`
        );
    }
}

export class QuotationUpdateEmployeeService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/UpdateQuotationEmployees"), 
            request.EmployeeIds, 
            `?quotationId=${request.QuotationId}`
        );
    }
}

export class ReceiptsCreateOrUpdateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/CreateOrUpdateReceipts"), 
            request.Receipts, 
            `?receiptsBillId=${request.Id}`
        );
    }
}

export class PaySlipCreateOrUpdateService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/CreateOrUpdatePaySlip"), 
            request.PaySlip, 
            `?paySlipBillId=${request.Id}`
        );
    }
}

export class QuotationNoteUpdateSpecifyStepService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Put(
            Environment.GetApiUrl("Quotation/UpdateNoteForSpecifyStep"),
            request, 
            `?noteId=${request.Id}`
        );
    }
}
