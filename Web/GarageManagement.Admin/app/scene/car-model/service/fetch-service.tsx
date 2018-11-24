import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class CarModelService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Model/Get"), 
            `?id=${request}`
        );
    }
}

export class AllCarModelsService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Model/GetAll")
        );
    }
}

export class CarModelsFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                            request.SearchTerm,
                            request.SortName,
                            request.SortDirection,
                            request.PageIndex.toString(),
                            request.PageSize.toString());
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Model/GetFilterModelsWithPaging"), 
            parameters
        );
    }
}
