import { APIService } from "../../../../core/service/fetch-api";
import * as APIUrl from "./fetch-api-url";
export class GarageInformationService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.get(APIUrl.GARAGE_INFORMATION_API);
        };
    }
}
//# sourceMappingURL=fetch-service.js.map