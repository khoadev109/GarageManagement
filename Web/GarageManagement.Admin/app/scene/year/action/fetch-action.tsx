import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class YearAction extends BaseAction implements IFetchAction {
                                   
    requestAction = AT.GET_UNIQUE_YEAR_REQUEST;
    successAction = AT.GET_UNIQUE_YEAR_SUCCESS;    
    errorAction = AT.GET_UNIQUE_YEAR_ERROR;
    
    fetch(entry: any) {
        this.dispatching(entry, new FetchService.YearService());
    }
}

export class AllYearAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_ALL_YEARS_REQUEST;
    successAction = AT.GET_ALL_YEARS_SUCCESS;    
    errorAction = AT.GET_ALL_YEARS_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllYearsService());
    }
}

export class YearsPagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_YEARS_WITH_PAGING_SUCCESS;
    successAction = AT.GET_ALL_YEARS_SUCCESS;    
    errorAction = AT.LIST_YEARS_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.YearsFilterAndPagingService());
    }
}
