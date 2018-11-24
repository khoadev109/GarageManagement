import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class ServiceTypeCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.SERVICE_TYPE_CREATE_API, request);
        };
    }
}
export class ServiceTypeEditService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.SERVICE_TYPE_EDIT_API, request);
        };
    }
}
export class ServiceTypeDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?serviceTypeId=${request.serviceTypeId}`;
            return apiService.delete(APIUrl.SERVICE_TYPE_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map