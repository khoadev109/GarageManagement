import { ActionType } from "./action-type";
import { BaseAction, IPostAction } from "core/redux/action";
import * as PostService from "../service/post-service";

export class AddOrUpdatePrintTemplateAction extends BaseAction implements IPostAction {

    requestAction = ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_REQUEST;
    successAction = ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_REQUEST;
    errorAction = ActionType.ADD_OR_UPDATE_PRINT_TEMPLATE_REQUEST;

    post(entry: any) {
        this.dispatching(entry, new PostService.AddOrUpdatePrintTemplateService());
    }
}