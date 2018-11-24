import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";
import { Dictionary } from "core/library/dictionary";

export class QuotationService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/Get"), 
            `?quotationId=${request.quotationId}&isLoadSelectList=${request.isLoadSelectList}`
        );
    }
}

export class QuotationNoteService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetNote"), 
            `?quotationId=${request.quotationId}&statusId=${request.statusId}`
        );
    }
}

export class AllQuotationInfoService implements ServiceProvider.IService {
    execute = (request: string) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetAllQuotationInfoById"), 
            `?quotationId=${request}`
        );
    }
}

export class QuotationItemService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetQuotationItem"),
            `?quotationItemId=${request.quotationItemId}&quotationId=${request.quotationId}`
        );
    }
}

export class EmployeesQuotationService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetEmployeesByQuotation"), 
            `?quotationId=${request}`
        );
    }
}

export class ReceiptsQuotationService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetReceipt"),
            `?id=${request}`
        );
    }
}

export class PaySlipQuotationService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetPaySlip"), 
            `?id=${request}`
        );
    }
}

export class ReceiptsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                            request.SearchTerm,
                            request.SortName,
                            request.SortDirection,
                            request.PageIndex.toString(),
                            request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetFilterReceiptsWithPaging"), 
            parameters);
    }
}

export class PayslipsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                            request.SearchTerm,
                            request.SortName,
                            request.SortDirection,
                            request.PageIndex.toString(),
                            request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetFilterPayslipsWithPaging"), 
            parameters);
    }
}

export class AllQuotationsBySearchTermService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetAllQuotationsBySearchTerm"), 
            `?searchTerm=${request}`
        );
    }
}

export class PendingQuotationsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetPendingQuotations"), 
            `?statusId=${request.statusId}&searchTerm=${request.searchTerm}`
        );
    }
}

export class AllQuotationItemsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetAllQuotationItemsOfSpecifyQuotation"), 
            `?quotationId=${request}`
        );
    }
}

export class QuotationItemsService implements ServiceProvider.IService {
    execute = (request: string, optionalRequest: any) => {  
        const parameters = new Dictionary.KeyedCollection<string>();
        parameters.Add("quotationId", request);
        parameters.Add("searchTerm", optionalRequest.SearchTerm);
        parameters.Add("sortName", optionalRequest.SortName);
        parameters.Add("sortDirection", optionalRequest.SortDirection);
        parameters.Add("pageIndex", optionalRequest.PageIndex.toString());
        parameters.Add("pageSize", optionalRequest.PageSize.toString());
        
        const queryString = ServiceProvider.GenerateQueryStringFromKeyValuePair(parameters);
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetFilterQuotationItemsByQuotationWithPaging"), 
            queryString
        );
    }
}

export class NewQuotationItemService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/InitializeNewQuotationItem")
        );
    }
}

export class CustomerCarAttachService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Customer/AttachCustomerAndCarIntoQuotation"), 
            `?customerId=${request}`
        );
    }
}

export class CustomerExchangeWithPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                            request.SearchTerm, 
                                            request.SortName, 
                                            request.SortDirection, 
                                            request.PageIndex.toString(), 
                                            request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Customer/FetchFilterCustomersInTransactionWithPaging"), 
            parameters
        );
    }
}

export class SpecifyCustomerCarForQuotationService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/LookupCustomerAndOwnedCars")
        );
    }
}

export class QuotationsPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = new Dictionary.KeyedCollection<string>();
        parameters.Add("searchCondition", request.SearchCondition);
        parameters.Add("sortName", request.SortName);
        parameters.Add("sortDirection", request.SortDirection);
        parameters.Add("pageIndex", request.PageIndex.toString());
        parameters.Add("pageSize", request.PageSize.toString());
        
        const queryString = ServiceProvider.GenerateQueryStringFromKeyValuePair(parameters);

        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/LookupQuotationsWithPaging"), 
            queryString
        );
    }
}

export class QuotationItemsGroupByParentCategoriesService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetAllQuotationItemsWithParentCategoryOfSpecifyQuotation"), 
            `?quotationId=${request}`
        );
    }
}

export class QuotationItemsGroupByParentServiceTypeService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Quotation/GetAllQuotationItemsWithParentServiceTypeOfSpecifyQuotation"), 
            `?quotationId=${request}`
        );
    }
}
