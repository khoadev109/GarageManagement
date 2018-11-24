import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class ServiceTypeService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?serviceTypeId=${request}`;
            return apiService.get(APIUrl.SERVICE_TYPE_API, parameters);
        };
    }
}
export class ServiceTypeFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.SERVICE_TYPE_WITH_PAGING_API, parameters);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map