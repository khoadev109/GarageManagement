import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class CustomerAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_CUSTOMER_REQUEST;
    successAction = AT.GET_UNIQUE_CUSTOMER_SUCCESS;
    errorAction = AT.GET_CUSTOMERS_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CustomerService());
    }
}

export class CustomersPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_CUSTOMERS_WITH_PAGING_REQUEST;
    successAction = AT.LIST_CUSTOMERS_WITH_PAGING_SUCCESS;
    errorAction = AT.LIST_CUSTOMERS_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CustomersFilterAndPagingService());
    }
}
