import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class AccessaryService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?id=${request}`;
            return apiService.get(APIUrl.ACCESSARY_API, parameters);
        };
    }
}
export class AllAccessariesService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.get(APIUrl.ALL_ACCESSARIES_API);
        };
    }
}
export class AccessariesFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.ACCESSARIES_WITH_PAGING_API, parameters);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map