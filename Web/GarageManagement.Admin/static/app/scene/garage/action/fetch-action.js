import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class GarageInformationAction {
    get(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.GarageInformationService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_GARAGE_INFORMATION_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_GARAGE_INFORMATION_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_GARAGE_INFORMATION_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map