import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CustomerCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CUSTOMER_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CUSTOMER_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CUSTOMER_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CustomerEditReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CUSTOMER_EDIT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CUSTOMER_EDIT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CUSTOMER_EDIT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CustomerDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CUSTOMER_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CUSTOMER_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CUSTOMER_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map