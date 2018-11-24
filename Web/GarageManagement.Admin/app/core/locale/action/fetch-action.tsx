import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class ProvinceAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_PROVICES_REQUEST;
    successAction = AT.GET_PROVICES_SUCCESS;    
    errorAction = AT.GET_PROVICES_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ProvinceService());
    }
}

export class DistrictAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_DISTRICTS_REQUEST;
    successAction = AT.GET_DISTRICTS_SUCCESS;    
    errorAction = AT.GET_DISTRICTS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.DistrictService());
    }
}

export class WardAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_WARDS_REQUEST;
    successAction = AT.GET_WARDS_SUCCESS;    
    errorAction = AT.GET_WARDS_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.WardService());
    }
}
