import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CategoryReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_CATEGORY_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_SPECIFY_CATEGORY_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_SPECIFY_CATEGORY_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CategoriesWithPagingReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LIST_CATEGORIES_WITH_PAGING_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LIST_CATEGORIES_WITH_PAGING_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LIST_CATEGORIES_WITH_PAGING_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const ParentCategoriesReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.PARENT_CATEGORIES_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.PARENT_CATEGORIES_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.PARENT_CATEGORIES_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map