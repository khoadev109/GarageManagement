import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class AccessaryCreateAction {
    createNewAccessary(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.AccessaryCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.ACCESSARY_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.ACCESSARY_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.ACCESSARY_CREATE_ERROR, error };
    }
}
export class AccessaryEditAction {
    editAccessary(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.AccessaryEditService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.ACCESSARY_EDIT_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.ACCESSARY_EDIT_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.ACCESSARY_EDIT_ERROR, error };
    }
}
export class AccessaryDeleteAction {
    deleteAccessary(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.AccessaryDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.ACCESSARY_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.ACCESSARY_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.ACCESSARY_DELETE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map