import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CustomerService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Customer/GetCustomerWithCar"), 
            `?customerId=${request}`
        );
    }
}

export class CustomersFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                        request.SearchTerm, 
                                        request.SortName, request.SortDirection, 
                                        request.PageIndex.toString(), 
                                        request.PageSize.toString());                                
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Customer/GetFilterCustomersWithPaging"),
            parameters
        );
    }
}
