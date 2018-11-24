import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class AccessaryUnitService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("AccessaryUnit/Get"), 
            `?id=${request}`
        );
    }
}

export class AccessaryUnitFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = `?searchTerm=${request.SearchTerm}`
                    .concat(`&sortName=${request.SortName}`)
                    .concat(`&sortDirection=${request.SortDirection}`)
                    .concat(`&pageIndex=${request.PageIndex.toString()}`)
                    .concat(`&pageSize=${request.PageSize.toString()}`);
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("AccessaryUnit/GetFilterAccessaryUnitWithPaging"), 
            parameters
        );
    }
}
