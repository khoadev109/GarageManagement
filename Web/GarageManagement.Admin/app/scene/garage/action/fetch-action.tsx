import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class GarageInformationAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_GARAGE_INFORMATION_REQUEST;
    successAction = AT.GET_GARAGE_INFORMATION_SUCCESS;    
    errorAction = AT.GET_GARAGE_INFORMATION_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.GarageInformationService());
    }
}
