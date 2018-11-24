import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class CarModelCreateAction extends BaseAction implements IPostAction {
                                   
    requestAction = AT.CAR_MODEL_CREATE_REQUEST;
    successAction = AT.CAR_MODEL_CREATE_SUCCESS;    
    errorAction = AT.CAR_MODEL_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.CarModelCreateService());
    }
}

export class CarModelEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CAR_MODEL_EDIT_REQUEST;
    successAction = AT.CAR_MODEL_EDIT_SUCCESS;    
    errorAction = AT.CAR_MODEL_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.CarModelEditService());
    }
}

export class CarModelDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CAR_MODEL_DELETE_REQUEST;
    successAction = AT.CAR_MODEL_DELETE_SUCCESS;    
    errorAction = AT.CAR_MODEL_DELETE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.CarModelDeleteService());
    }
}
