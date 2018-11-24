import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class CustomerTypeAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_CUSTOMER_TYPE_REQUEST;
    successAction = AT.GET_UNIQUE_CUSTOMER_TYPE_SUCCESS;    
    errorAction = AT.GET_UNIQUE_CUSTOMER_TYPE_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CustomerTypeService());
    }
}

export class CustomersTypePagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_REQUEST;
    successAction = AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_CUSTOMERS_TYPE_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CustomersTypeFilterAndPagingService());
    }
}


