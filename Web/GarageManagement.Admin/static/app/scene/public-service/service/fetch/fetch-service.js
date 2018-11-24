import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class PublicServService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?id=${request}`;
            return apiService.get(APIUrl.SERVICE_API, parameters);
        };
    }
}
export class AllPublicServsService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.get(APIUrl.SERVICE_API);
        };
    }
}
export class PublicServsFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.SERVICES_WITH_PAGING_API, parameters);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map