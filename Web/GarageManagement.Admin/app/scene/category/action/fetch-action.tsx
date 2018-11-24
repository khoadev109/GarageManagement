import { ActionType as AT } from "./action-type";
import { BaseAction, IFetchAction } from "../../../core/redux/action";
import * as FetchService from "../service/fetch-service";

export class CategoryAction extends BaseAction implements IFetchAction {
    requestAction = AT.GET_SPECIFIC_CATEGORY_REQUEST;
    successAction = AT.GET_SPECIFIC_CATEGORY_SUCCESS;    
    errorAction = AT.GET_SPECIFIC_CATEGORY_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CategoryService());
    }
}

export class CategoriesPagingAction extends BaseAction implements IFetchAction {
    requestAction = AT.LIST_CATEGORIES_WITH_PAGING_REQUEST;
    successAction = AT.LIST_CATEGORIES_WITH_PAGING_SUCCESS;
    errorAction = AT.LIST_CATEGORIES_WITH_PAGING_ERROR;

    fetch(entry: any) {
        this.dispatching(entry, new FetchService.CategoriesFilterAndPagingService());
    }
}

export class ParentCategoriesAction extends BaseAction implements IFetchAction {
    requestAction = AT.GET_PARENT_CATEGORIES_REQUEST;
    successAction = AT.GET_PARENT_CATEGORIES_SUCCESS;    
    errorAction = AT.GET_PARENT_CATEGORIES_ERROR;
    
    fetch(entry?: any) {
        this.dispatching(entry, new FetchService.ParentCategoriesService());
    }
}
