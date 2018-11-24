import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class ServiceUnitService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("ServiceUnit/Get"), 
            `?serviceUnitId=${request}`
        );
    }
}

export class ServiceUnitFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                request.SearchTerm,
                                request.SortName,
                                request.SortDirection,
                                request.PageIndex.toString(),
                                request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("ServiceUnit/GetFilterServiceUnitWithPaging"), 
            parameters
        );
    }
}
