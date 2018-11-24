import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class ServiceUnitCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_UNIT_CREATE_REQUEST;
    successAction = AT.SERVICE_UNIT_CREATE_SUCCESS;    
    errorAction = AT.SERVICE_UNIT_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceUnitCreateService());
    }
}

export class ServiceUnitEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_UNIT_EDIT_REQUEST;
    successAction = AT.SERVICE_UNIT_EDIT_SUCCESS;    
    errorAction = AT.SERVICE_UNIT_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceUnitEditService());
    }
}

export class ServiceUnitDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.SERVICE_UNIT_DELETE_REQUEST;
    successAction = AT.SERVICE_UNIT_DELETE_SUCCESS;    
    errorAction = AT.SERVICE_UNIT_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ServiceUnitDeleteService());
    }
}
