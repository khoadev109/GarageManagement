import Environment from "environment";
import FetchApi from "../../../core/service/fetch-api";
import ServiceProvider from "../../../core/service/service-provider";

export class CategoryService implements ServiceProvider.IService {
    execute = (request?: any) => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Category/Get"), 
            `?categoryId=${request}`
        );
    }
}

export class ParentCategoriesService implements ServiceProvider.IService {
    execute = () => {  
        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Category/GetParentCategories")
        );
    }
}

export class CategoriesFilterAndPagingService implements ServiceProvider.IService {
    execute = (request: any) => {  
        const parameters = ServiceProvider.GeneratePagingQueryString(
                                    request.SearchTerm,
                                    request.SortName,
                                    request.SortDirection,
                                    request.PageIndex.toString(),
                                    request.PageSize.toString());

        return new FetchApi.Caller().Get(
            Environment.GetApiUrl("Category/GetFilterCategoriesWithPaging"),
            parameters
        );
    }
}
