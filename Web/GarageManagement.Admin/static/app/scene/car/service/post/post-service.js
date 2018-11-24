import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class CarCreateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.CAR_CREATE_API, request);
        };
    }
}
export class CarDeleteService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            let parameters = `?carId=${request.carId}`;
            return apiService.delete(APIUrl.CAR_DELETE_API, parameters);
        };
    }
}
//# sourceMappingURL=post-service.js.map