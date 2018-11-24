import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class ServiceTypeAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_UNIQUE_SERVICE_TYPE_REQUEST;
    successAction = AT.GET_UNIQUE_SERVICE_TYPE_SUCCESS;    
    errorAction = AT.GET_UNIQUE_SERVICE_TYPE_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ServiceTypeService());
    }
}

export class ParentServiceTypesAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.GET_PARENT_SERVICE_TYPES_REQUEST;
    successAction = AT.GET_PARENT_SERVICE_TYPES_SUCCESS;    
    errorAction = AT.GET_PARENT_SERVICE_TYPES_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ParentCategoriesService());
    }
}

export class ServiceTypePagingAction extends BaseAction implements IFetchAction {
    
    requestAction = AT.LIST_SERVICE_TYPES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_SERVICE_TYPES_WITH_PAGING_SUCCESS;    
    errorAction = AT.LIST_SERVICE_TYPES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.ServiceTypeFilterAndPagingService());
    }
}
