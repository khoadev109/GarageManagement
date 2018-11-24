import * as redux from "redux";
import * as PostService from "../service/post-service";

import { ActionType } from "./action-type";
import { BaseAction, IPostAction } from "core/redux/action";

export class SavePermissionAction extends BaseAction implements IPostAction {

    requestAction = ActionType.SAVE_PERMISSION_REQUEST;
    successAction = ActionType.SAVE_PERMISSION_SUCCESS;
    errorAction = ActionType.SAVE_PERMISSION_ERROR;

    post(entry: any) {
        this.dispatching(entry, new PostService.SavePermissionService());
    }
}