import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const ServiceTypeCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_TYPE_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_TYPE_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_TYPE_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const ServiceTypeEditReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_TYPE_EDIT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_TYPE_EDIT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_TYPE_EDIT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const ServiceTypeDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_TYPE_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_TYPE_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_TYPE_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map