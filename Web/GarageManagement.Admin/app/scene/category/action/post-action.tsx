import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class CategoryCreateAction extends BaseAction implements IPostAction {
    requestAction = AT.CATEGORY_CREATE_REQUEST;
    successAction = AT.CATEGORY_CREATE_SUCCESS;    
    errorAction = AT.CATEGORY_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.CategoryCreateService());
    }
}

export class CategoryEditAction extends BaseAction implements IPostAction {
    requestAction = AT.CATEGORY_EDIT_REQUEST;
    successAction = AT.CATEGORY_EDIT_SUCCESS;
    errorAction = AT.CATEGORY_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.CategoryEditService());
    }
}

export class CategoryDeleteAction extends BaseAction implements IPostAction {
    requestAction = AT.CATEGORY_DELETE_REQUEST;
    successAction = AT.CATEGORY_DELETE_SUCCESS;
    errorAction = AT.CATEGORY_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CategoryDeleteService());
    }
}
