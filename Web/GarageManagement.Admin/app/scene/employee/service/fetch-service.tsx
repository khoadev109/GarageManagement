import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class EmployeeService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Employee/Get"),
            `?employeeId=${request}`
        );
    }
}

export class AllEmployeesService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Employee/GetAll")
        );
    }
}

export class EmployeesFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                request.SearchTerm,
                                request.SortName,
                                request.SortDirection,
                                request.PageIndex.toString(),
                                request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Employee/GetFilterEmployeesWithPaging"), 
            parameters);
    }
}
