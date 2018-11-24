import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class CarCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CAR_CREATE_REQUEST;
    successAction = AT.CAR_CREATE_SUCCESS;
    errorAction = AT.CAR_CREATE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CarCreateService());
    }
}

export class CarEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CAR_EDIT_REQUEST;
    successAction = AT.CAR_EDIT_SUCCESS;
    errorAction = AT.CAR_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CarEditService());
    }
}

export class CarDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CAR_DELETE_REQUEST;
    successAction = AT.CAR_DELETE_SUCCESS;
    errorAction = AT.CAR_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CarDeleteService());
    }
}