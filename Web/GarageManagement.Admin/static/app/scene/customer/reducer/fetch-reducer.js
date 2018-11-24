import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CustomerReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_CUSTOMER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_SPECIFY_CUSTOMER_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_SPECIFY_CUSTOMER_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CustomersWithPagingReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LIST_CUSTOMERS_WITH_PAGING_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LIST_CUSTOMERS_WITH_PAGING_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LIST_CUSTOMERS_WITH_PAGING_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map