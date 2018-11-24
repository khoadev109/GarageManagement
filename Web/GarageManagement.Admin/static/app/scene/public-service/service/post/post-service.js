import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class PublicServCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.SERVICE_CREATE_API, request);
        };
    }
}
export class PublicServEditService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.SERVICE_EDIT_API, request);
        };
    }
}
export class PublicServDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `/${request.customerId}`;
            return apiService.delete(APIUrl.SERVICE_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map