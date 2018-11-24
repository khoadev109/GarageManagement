import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const AccessaryReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_ACCESSARIES_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_ACCESSARIES_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_ACCESSARIES_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const AllAccessariesReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_ACCESSARIES_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_ALL_ACCESSARIES_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_ALL_ACCESSARIES_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const AccessariesWithPagingReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LIST_ACCESSARIES_WITH_PAGING_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LIST_ACCESSARIES_WITH_PAGING_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LIST_ACCESSARIES_WITH_PAGING_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map