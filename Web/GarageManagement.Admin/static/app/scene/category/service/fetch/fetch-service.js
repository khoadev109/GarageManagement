import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class CategoryService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?categoryId=${request}`;
            return apiService.get(APIUrl.CATEGORY_API, parameters);
        };
    }
}
export class ParentCategoriesService {
    constructor() {
        this.execute = () => {
            let apiService = new APIService();
            return apiService.get(APIUrl.PARENT_CATEGORIES_API);
        };
    }
}
export class CategoriesFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.CATEGORYS_WITH_PAGING_API, parameters);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map