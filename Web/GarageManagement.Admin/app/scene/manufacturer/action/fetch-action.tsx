import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class ManufacturerAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_MANUFACTURER_REQUEST;
    successAction = AT.GET_UNIQUE_MANUFACTURER_SUCCESS;    
    errorAction = AT.GET_UNIQUE_MANUFACTURER_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ManufacturerService());
    }
}

export class AllManufacturerAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_MANUFACTURERS_REQUEST;
    successAction = AT.GET_ALL_MANUFACTURERS_SUCCESS;    
    errorAction = AT.GET_ALL_MANUFACTURERS_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllManufacturerService());
    }
}

export class ManufacturersPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_MANUFACTURERS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_MANUFACTURERS_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_MANUFACTURERS_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ManufacturerFilterAndPagingService());
    }
}
