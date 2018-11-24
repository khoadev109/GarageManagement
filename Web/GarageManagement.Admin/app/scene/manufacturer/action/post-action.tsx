import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class ManufacturerCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.MANUFACTURER_CREATE_REQUEST;
    successAction = AT.MANUFACTURER_CREATE_SUCCESS;    
    errorAction = AT.MANUFACTURER_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ManufacturerCreateService());
    }
}

export class ManufacturerEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.MANUFACTURER_EDIT_REQUEST;
    successAction = AT.MANUFACTURER_EDIT_SUCCESS;    
    errorAction = AT.MANUFACTURER_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ManufacturerEditService());
    }
}

export class ManufacturerDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.MANUFACTURER_DELETE_REQUEST;
    successAction = AT.MANUFACTURER_DELETE_SUCCESS;    
    errorAction = AT.MANUFACTURER_DELETE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.ManufacturerDeleteService());
    }
}
