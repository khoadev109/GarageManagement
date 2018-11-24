import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const ServiceTypeReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_SPECIFY_SERVICE_TYPE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_SPECIFY_SERVICE_TYPE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_SPECIFY_SERVICE_TYPE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const ServiceTypeWithPagingReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LIST_SERVICE_TYPES_WITH_PAGING_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LIST_SERVICE_TYPES_WITH_PAGING_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LIST_SERVICE_TYPES_WITH_PAGING_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map