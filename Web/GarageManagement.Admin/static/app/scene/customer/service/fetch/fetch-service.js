import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class CustomerService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?customerId=${request}`;
            return apiService.get(APIUrl.CUSTOMER_API, parameters);
        };
    }
}
export class CustomersFilterAndPagingService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?searchTerm=${request.SearchTerm}`
                .concat(`&sortName=${request.SortName}`)
                .concat(`&sortDirection=${request.SortDirection}`)
                .concat(`&pageIndex=${request.PageIndex.toString()}`)
                .concat(`&pageSize=${request.PageSize.toString()}`);
            return apiService.get(APIUrl.CUSTOMERS_WITH_PAGING_API, parameters);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map