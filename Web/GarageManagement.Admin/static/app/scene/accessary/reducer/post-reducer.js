import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const AccessaryCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.ACCESSARY_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.ACCESSARY_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.ACCESSARY_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const AccessaryEditReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.ACCESSARY_EDIT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.ACCESSARY_EDIT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.ACCESSARY_EDIT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const AccessaryDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.ACCESSARY_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.ACCESSARY_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.ACCESSARY_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map