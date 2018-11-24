import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class ServiceTypeCreateAction {
    createNewServiceType(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.ServiceTypeCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_TYPE_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_TYPE_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_TYPE_DELETE_ERROR, error };
    }
}
export class ServiceTypeEditAction {
    editServiceType(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.ServiceTypeEditService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_TYPE_EDIT_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_TYPE_EDIT_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_TYPE_EDIT_ERROR, error };
    }
}
export class ServiceTypeDeleteAction {
    deleteServiceType(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.ServiceTypeDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_TYPE_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_TYPE_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_TYPE_EDIT_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map