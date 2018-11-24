import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class ServiceTypeService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("ServiceType/Get"), 
            `?serviceTypeId=${request}`
        );
    }
}

export class ServiceTypeFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                request.SearchTerm,
                                request.SortName,
                                request.SortDirection,
                                request.PageIndex.toString(),
                                request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("ServiceType/GetFilterServiceTypesWithPaging"), 
            parameters
        );
    }
}

export class ParentCategoriesService implements ServiceProvider.IService {
    execute = () => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("ServiceType/GetParentServiceTypes")
        );
    }
}
