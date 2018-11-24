import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class CarCreateAction {
    createNewCar(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CarCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CAR_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CAR_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CAR_CREATE_ERROR, error };
    }
}
export class CarDeleteAction {
    deleteCar(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CarDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CAR_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CAR_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CAR_DELETE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map