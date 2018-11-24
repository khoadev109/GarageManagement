import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class PublicServAction extends BaseAction implements IFetchAction {

    requestAction = AT.GET_SPECIFY_SERVICE_REQUEST;
    successAction = AT.GET_SPECIFY_SERVICE_SUCCESS;
    errorAction = AT.GET_SPECIFY_SERVICE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PublicServService());
    }
}

export class AllPublicServAction extends BaseAction implements IFetchAction {

    requestAction = AT.GET_ALL_SERVICES_REQUEST;
    successAction = AT.GET_ALL_SERVICES_SUCCESS;
    errorAction = AT.GET_ALL_SERVICES_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.AllPublicServsService());
    }
}

export class PublicServsPagingAction extends BaseAction implements IFetchAction {

    requestAction = AT.LIST_SERVICES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_SERVICES_WITH_PAGING_SUCCESS;
    errorAction = AT.LIST_SERVICES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.PublicServsFilterAndPagingService());
    }
}
