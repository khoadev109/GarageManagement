import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class AccessaryAction extends BaseAction implements IFetchAction {

    requestAction = AT.GET_UNIQUE_ACCESSARY_REQUEST;
    successAction = AT.GET_UNIQUE_ACCESSARY_SUCCESS;
    errorAction = AT.GET_UNIQUE_ACCESSARY_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AccessaryService());
    }
}

export class AllAccessariesAction extends BaseAction implements IFetchAction {

    requestAction = AT.GET_ALL_ACCESSARIES_REQUEST;
    successAction = AT.GET_ALL_ACCESSARIES_SUCCESS;
    errorAction = AT.GET_ALL_ACCESSARIES_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllAccessariesService());
    }
}

export class AccessariesPagingAction extends BaseAction implements IFetchAction {

    requestAction = AT.LIST_ACCESSARIES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_ACCESSARIES_WITH_PAGING_SUCCESS;
    errorAction = AT.LIST_ACCESSARIES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AccessariesFilterAndPagingService());
    }
}
