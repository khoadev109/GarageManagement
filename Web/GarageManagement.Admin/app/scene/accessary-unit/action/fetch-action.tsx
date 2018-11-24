import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class AccessaryUnitAction extends BaseAction implements IFetchAction {
    requestAction = AT.GET_UNIQUE_ACCESSARY_UNIT_REQUEST;
    successAction = AT.GET_UNIQUE_ACCESSARY_UNIT_SUCCESS;    
    errorAction = AT.GET_UNIQUE_ACCESSARY_UNIT_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AccessaryUnitService());
    }
}

export class AccessaryUnitPagingAction extends BaseAction implements IFetchAction {
    requestAction = AT.LIST_ACCESSARY_UNITS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_ACCESSARY_UNITS_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_ACCESSARY_UNITS_WITH_PAGING_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AccessaryUnitFilterAndPagingService());
    }
}
