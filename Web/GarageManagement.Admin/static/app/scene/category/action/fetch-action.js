import * as FetchService from "../service/fetch/fetch-service";
import { ActionType } from "./action-type";
export class CategoryAction {
    getCategory(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CategoryService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.GET_SPECIFY_CATEGORY_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.GET_SPECIFY_CATEGORY_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.GET_SPECIFY_CATEGORY_ERROR, error };
    }
}
export class CategoriesPagingAction {
    listCategoriesWithPaging(entry) {
        return (dispatch) => {
            dispatch(this.request(entry));
            let service = new FetchService.CategoriesFilterAndPagingService();
            service.execute(entry).then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request(entry) {
        return { type: ActionType.LIST_CATEGORIES_WITH_PAGING_REQUEST, entry };
    }
    success(result) {
        return { type: ActionType.LIST_CATEGORIES_WITH_PAGING_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.LIST_CATEGORIES_WITH_PAGING_ERROR, error };
    }
}
export class ParentCategoriesAction {
    getParentCategories() {
        return (dispatch) => {
            dispatch(this.request());
            let service = new FetchService.ParentCategoriesService();
            service.execute().then(result => dispatch(this.success(result)), error => dispatch(this.failure(error)));
        };
    }
    request() {
        return { type: ActionType.PARENT_CATEGORIES_REQUEST };
    }
    success(result) {
        return { type: ActionType.PARENT_CATEGORIES_SUCCESS, result };
    }
    failure(error) {
        return { type: ActionType.PARENT_CATEGORIES_ERROR, error };
    }
}
//# sourceMappingURL=fetch-action.js.map