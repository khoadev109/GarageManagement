import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class AccessaryUnitCreateAction extends BaseAction implements IPostAction {
    requestAction = AT.ACCESSARY_UNIT_CREATE_REQUEST;
    successAction = AT.ACCESSARY_UNIT_CREATE_SUCCESS;    
    errorAction = AT.ACCESSARY_UNIT_CREATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryUnitCreateService());
    }
}

export class AccessaryUnitEditAction extends BaseAction implements IPostAction {
    requestAction = AT.ACCESSARY_UNIT_EDIT_REQUEST;
    successAction = AT.ACCESSARY_UNIT_EDIT_SUCCESS;    
    errorAction = AT.ACCESSARY_UNIT_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryUnitEditService());
    }
}

export class AccessaryUnitDeleteAction extends BaseAction implements IPostAction {
    requestAction = AT.ACCESSARY_UNIT_DELETE_REQUEST;
    successAction = AT.ACCESSARY_UNIT_DELETE_SUCCESS;    
    errorAction = AT.ACCESSARY_UNIT_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.AccessaryUnitDeleteService());
    }
}
