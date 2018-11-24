import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class PublicServService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Service/Get"), 
            `?id=${request}`
        );
    }
}

export class AllPublicServsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Service/GetAll")
        );
    }
}

export class PublicServsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                    request.SearchTerm,
                                    request.SortName,
                                    request.SortDirection,
                                    request.PageIndex.toString(),
                                    request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Service/GetFilterServicesWithPaging"), 
            parameters);
    }
}
