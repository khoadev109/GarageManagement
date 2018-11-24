import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class PublicServCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_CREATE_REQUEST;
    successAction = AT.SERVICE_CREATE_SUCCESS;    
    errorAction = AT.SERVICE_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.PublicServCreateService());
    }
}

export class PublicServEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_EDIT_REQUEST;
    successAction = AT.SERVICE_EDIT_SUCCESS;    
    errorAction = AT.SERVICE_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.PublicServEditService());
    }
}

export class PublicServDeleteAction extends BaseAction implements IPostAction {

    requestAction = AT.SERVICE_DELETE_REQUEST;
    successAction = AT.SERVICE_DELETE_SUCCESS;    
    errorAction = AT.SERVICE_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.PublicServDeleteService());
    }
}
