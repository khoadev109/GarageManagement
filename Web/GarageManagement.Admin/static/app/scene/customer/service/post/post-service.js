import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class CustomerCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.CUSTOMER_CREATE_API, request);
        };
    }
}
export class CustomerEditService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.CUSTOMER_EDIT_API, request);
        };
    }
}
export class CustomerDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?customerId=${request.customerId}`;
            return apiService.delete(APIUrl.CUSTOMER_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map