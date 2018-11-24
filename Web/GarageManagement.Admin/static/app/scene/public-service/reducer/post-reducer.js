import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const PublicServCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const PublicServEditReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_EDIT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_EDIT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_EDIT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const PublicServDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.SERVICE_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.SERVICE_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.SERVICE_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map