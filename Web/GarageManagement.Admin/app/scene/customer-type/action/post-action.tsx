import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class CustomerTypeCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_TYPE_CREATE_REQUEST;
    successAction = AT.CUSTOMER_TYPE_CREATE_SUCCESS;    
    errorAction = AT.CUSTOMER_TYPE_CREATE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerTypeCreateService());
    }
}

export class CustomerTypeEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_TYPE_EDIT_REQUEST;
    successAction = AT.CUSTOMER_TYPE_EDIT_SUCCESS;    
    errorAction = AT.CUSTOMER_TYPE_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerTypeEditService());
    }
}

export class CustomerTypeDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.CUSTOMER_TYPE_DELETE_REQUEST;
    successAction = AT.CUSTOMER_TYPE_DELETE_SUCCESS;    
    errorAction = AT.CUSTOMER_TYPE_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.CustomerTypeDeleteService());
    }
}
