import * as PostService from "../service/post/post-service";
import { ActionType } from "./action-type";
export class CategoryCreateAction {
    createNewCategory(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CategoryCreateService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CATEGORY_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CATEGORY_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CATEGORY_CREATE_ERROR, error };
    }
}
export class CategoryEditAction {
    editCategory(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CategoryEditService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CATEGORY_CREATE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CATEGORY_CREATE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CATEGORY_CREATE_ERROR, error };
    }
}
export class CategoryDeleteAction {
    deleteCategory(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new PostService.CategoryDeleteService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.CATEGORY_DELETE_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.CATEGORY_DELETE_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.CATEGORY_DELETE_ERROR, error };
    }
}
//# sourceMappingURL=post-action.js.map