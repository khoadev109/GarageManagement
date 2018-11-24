import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class YearService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Year/Get"), 
            `?id=${request}`
        );
    }
}

export class AllYearsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Year/GetAll")
        );
    }
}

export class YearsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                request.SearchTerm,
                                request.SortName,
                                request.SortDirection,
                                request.PageIndex.toString(),
                                request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Year/GetYearsWithPaging"), 
            parameters
        );
    }
}
