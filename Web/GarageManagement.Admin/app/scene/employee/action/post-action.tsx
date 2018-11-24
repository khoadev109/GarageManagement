import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class EmployeeCreateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.EMPLOYEE_CREATE_REQUEST;
    successAction = AT.EMPLOYEE_CREATE_SUCCESS;    
    errorAction = AT.EMPLOYEE_CREATE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.EmployeeCreateService());
    }
}

export class EmployeeEditAction extends BaseAction implements IPostAction {
    
    requestAction = AT.EMPLOYEE_EDIT_REQUEST;
    successAction = AT.EMPLOYEE_EDIT_SUCCESS;    
    errorAction = AT.EMPLOYEE_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.EmployeeEditService());
    }
}

export class EmployeeDeleteAction extends BaseAction implements IPostAction {
    
    requestAction = AT.EMPLOYEE_DELETE_REQUEST;
    successAction = AT.EMPLOYEE_DELETE_SUCCESS;    
    errorAction = AT.EMPLOYEE_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.EmployeeDeleteService());
    }
}
