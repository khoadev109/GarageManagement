import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class CustomerCreateAction {
    createNewCustomer(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CustomerCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CUSTOMER_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CUSTOMER_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CUSTOMER_CREATE_ERROR, error };
    }
}
export class CustomerEditAction {
    editCustomer(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CustomerEditService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CUSTOMER_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CUSTOMER_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CUSTOMER_CREATE_ERROR, error };
    }
}
export class CustomerDeleteAction {
    deleteCustomer(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CustomerDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CUSTOMER_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CUSTOMER_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CUSTOMER_DELETE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map