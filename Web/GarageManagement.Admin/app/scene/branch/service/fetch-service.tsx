import ServiceProvider from "core/service/service-provider";
import FetchApi from "../../../core/service/fetch-api";
import Environment from "environment";

export class BranchService implements ServiceProvider.IService {
    execute = (request: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Branch/Get"), 
            `?branchId=${request}`
        );
    }
}

export class BranchesFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = `?searchTerm=${request.SearchTerm}`
                    .concat(`&sortName=${request.SortName}`)
                    .concat(`&sortDirection=${request.SortDirection}`)
                    .concat(`&pageIndex=${request.PageIndex.toString()}`)
                    .concat(`&pageSize=${request.PageSize.toString()}`);
        
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Branch/GetFilterBranchesWithPaging"), 
            parameters);
    }
}
