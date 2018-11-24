import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class GarageUpdateAction {
    update(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.GarageUpdateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GARAGE_UPDATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GARAGE_UPDATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GARAGE_UPDATE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map