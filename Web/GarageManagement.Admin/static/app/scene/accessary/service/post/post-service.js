import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class AccessaryCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.ACCESSARY_CREATE_API, request);
        };
    }
}
export class AccessaryEditService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.ACCESSARY_EDIT_API, request);
        };
    }
}
export class AccessaryDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `/${request.customerId}`;
            return apiService.delete(APIUrl.ACCESSARY_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map