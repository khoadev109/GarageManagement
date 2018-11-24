import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class YearCreateAction extends BaseAction implements IPostAction {
                                   
    requestAction = AT.YEAR_CREATE_REQUEST;
    successAction = AT.YEAR_CREATE_SUCCESS;    
    errorAction = AT.GET_UNIQUE_YEAR_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.YearCreateService());
    }
}

export class YearEditAction extends BaseAction implements IPostAction {
                                   
    requestAction = AT.YEAR_EDIT_REQUEST;
    successAction = AT.YEAR_EDIT_SUCCESS;    
    errorAction = AT.YEAR_EDIT_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.YearEditService());
    }
}

export class YearDeleteAction extends BaseAction implements IPostAction {
                                   
    requestAction = AT.YEAR_DELETE_REQUEST;
    successAction = AT.YEAR_DELETE_SUCCESS;    
    errorAction = AT.YEAR_DELETE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.YearDeleteService());
    }
}
