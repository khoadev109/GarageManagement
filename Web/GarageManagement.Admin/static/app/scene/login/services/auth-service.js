import { APIService } from '../../../core/service/fetch-api';
import * as APIUrl from "./post/post-api-url";
export class LoginService {
    constructor() {
        this.execute = (request) => {
            let apiService = new APIService();
            return apiService.post(APIUrl.LOGIN_API, request);
        };
    }
}
export class LogoutService {
    constructor() {
        this.execute = () => {
            let apiService = new APIService();
            return apiService.get(APIUrl.LOGOUT_API);
        };
    }
}
//# sourceMappingURL=auth-service.js.map