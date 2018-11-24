import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CustomerTypeService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("CustomerType/Get"), 
            `?customerTypeId=${request}`
        );
    }
}

export class CustomersTypeFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                        request.SearchTerm,
                                        request.SortName,
                                        request.SortDirection,
                                        request.PageIndex.toString(),
                                        request.PageSize.toString());
                                        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("CustomerType/GetFilterCustomerTypesWithPaging"), 
            parameters
        );
    }
}
