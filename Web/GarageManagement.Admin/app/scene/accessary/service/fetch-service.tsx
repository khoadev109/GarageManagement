import FetchApi from "../../../core/service/fetch-api";
import ServiceProvider from "core/service/service-provider";
import Environment from "environment";

export class AccessaryService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Accessary/Get"), 
            `?id=${request}`
        );
    }
}

export class AllAccessariesService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(Environment.GetApiUrl("Accessary/GetAll"));
    }
}

export class AccessariesFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = `?searchTerm=${request.SearchTerm}`
                    .concat(`&sortName=${request.SortName}`)
                    .concat(`&sortDirection=${request.SortDirection}`)
                    .concat(`&pageIndex=${request.PageIndex.toString()}`)
                    .concat(`&pageSize=${request.PageSize.toString()}`);
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Accessary/GetFilterAccessariesWithPaging"), 
            parameters
        );
    }
}
