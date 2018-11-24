import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class ServiceUnitAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_UNIQUE_SERVICE_UNIT_REQUEST;
    successAction = AT.GET_UNIQUE_SERVICE_UNIT_SUCCESS;    
    errorAction = AT.GET_UNIQUE_SERVICE_UNIT_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ServiceUnitService());
    }
}

export class ServiceUnitPagingAction extends BaseAction implements IFetchAction {

    requestAction = AT.LIST_SERVICE_UNITS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_SERVICE_UNITS_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_SERVICE_UNITS_WITH_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ServiceUnitFilterAndPagingService());
    }
}
