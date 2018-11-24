import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class AccessaryCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.ACCESSARY_CREATE_REQUEST;
    successAction = AT.ACCESSARY_CREATE_SUCCESS;    
    errorAction = AT.ACCESSARY_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryCreateService());
    }
}

export class AccessaryEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.ACCESSARY_EDIT_REQUEST;
    successAction = AT.ACCESSARY_EDIT_SUCCESS;    
    errorAction = AT.ACCESSARY_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryEditService());
    }
}

export class AccessaryDeleteAction extends BaseAction implements IPostAction {

    requestAction = AT.ACCESSARY_DELETE_REQUEST;
    successAction = AT.ACCESSARY_DELETE_SUCCESS;    
    errorAction = AT.ACCESSARY_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryDeleteService());
    }
}
