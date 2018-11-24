import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class CustomerCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_CREATE_REQUEST;
    successAction = AT.CUSTOMER_CREATE_SUCCESS;
    errorAction = AT.CUSTOMER_CREATE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerCreateService());
    }
}

export class CustomerEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_EDIT_REQUEST;
    successAction = AT.CUSTOMER_EDIT_SUCCESS;
    errorAction = AT.CUSTOMER_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerEditService());
    }
}

export class CustomerDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_DELETE_REQUEST;
    successAction = AT.CUSTOMER_DELETE_SUCCESS;
    errorAction = AT.CUSTOMER_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerDeleteService());
    }
}
