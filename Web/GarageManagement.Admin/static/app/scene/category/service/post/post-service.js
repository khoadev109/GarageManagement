import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class CategoryCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.CATEGORY_CREATE_API, request);
        };
    }
}
export class CategoryEditService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.CATEGORY_EDIT_API, request);
        };
    }
}
export class CategoryDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?categoryId=${request.categoryId}`;
            return apiService.delete(APIUrl.CATEGORY_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map