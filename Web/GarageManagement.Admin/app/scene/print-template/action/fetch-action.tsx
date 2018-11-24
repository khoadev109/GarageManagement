import { ActionType } from "./action-type";
import { BaseAction, IFetchAction } from "core/redux/action";
import * as FetchService from "../service/fetch-service";

export class PrintTemplateAction extends BaseAction implements IFetchAction {

    requestAction = ActionType.GET_PRINT_TEMPLATE_REQUEST;
    successAction = ActionType.GET_PRINT_TEMPLATE_SUCCESS;    
    errorAction = ActionType.GET_PRINT_TEMPLATE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PrintTemplateService());
    }
}