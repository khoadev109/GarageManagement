import { ActionType as AT } from "./action-type";
import { BaseAction, IPostAction } from "../../../core/redux/action";
import * as PostService from "../service/post-service";

export class GarageUpdateAction extends BaseAction implements IPostAction {
    
    requestAction = AT.GARAGE_UPDATE_REQUEST;
    successAction = AT.GARAGE_UPDATE_SUCCESS;    
    errorAction = AT.GARAGE_UPDATE_ERROR;
    
    post(entry: any) {
        this.dispatching(entry, new PostService.GarageUpdateService());
    }
}
