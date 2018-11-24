import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class PublicServCreateAction {
    createNewService(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.PublicServCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_CREATE_ERROR, error };
    }
}
export class PublicServEditAction {
    editService(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.PublicServEditService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_EDIT_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_EDIT_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_EDIT_ERROR, error };
    }
}
export class PublicServDeleteAction {
    deleteService(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.PublicServDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.SERVICE_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.SERVICE_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.SERVICE_DELETE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map