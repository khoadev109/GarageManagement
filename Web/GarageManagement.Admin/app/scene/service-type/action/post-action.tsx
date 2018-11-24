import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class ServiceTypeCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_TYPE_CREATE_REQUEST;
    successAction = AT.SERVICE_TYPE_CREATE_SUCCESS;    
    errorAction = AT.SERVICE_TYPE_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceTypeCreateService());
    }
}

export class ServiceTypeEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_TYPE_EDIT_REQUEST;
    successAction = AT.SERVICE_TYPE_EDIT_SUCCESS;    
    errorAction = AT.SERVICE_TYPE_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceTypeEditService());
    }
}

export class ServiceTypeDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_TYPE_DELETE_REQUEST;
    successAction = AT.SERVICE_TYPE_DELETE_SUCCESS;    
    errorAction = AT.SERVICE_TYPE_DELETE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceTypeDeleteService());
    }
}
