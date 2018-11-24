import * as APIUrl from "./post-api-url";
import { APIService } from "../../../../core/service/fetch-api";
export class GarageUpdateService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.put(APIUrl.GARAGE_UPDATE_API, request);
        };
    }
}
//# sourceMappingURL=post-service.js.map