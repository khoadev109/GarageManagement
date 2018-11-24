import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class BranchCreateAction extends BaseAction implements IPostAction {
    requestAction = AT.BRANCH_CREATE_REQUEST;
    successAction = AT.BRANCH_CREATE_SUCCESS;    
    errorAction = AT.BRANCH_CREATE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.BranchCreateService());
    }
}

export class BranchEditAction extends BaseAction implements IPostAction {
    requestAction = AT.BRANCH_EDIT_REQUEST;
    successAction = AT.BRANCH_EDIT_SUCCESS;    
    errorAction = AT.BRANCH_EDIT_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.BranchEditService());
    }
}

export class BranchDeleteAction extends BaseAction implements IPostAction {
    requestAction = AT.BRANCH_DELETE_REQUEST;
    successAction = AT.BRANCH_DELETE_SUCCESS;    
    errorAction = AT.BRANCH_DELETE_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.BranchDeleteService());
    }
}
