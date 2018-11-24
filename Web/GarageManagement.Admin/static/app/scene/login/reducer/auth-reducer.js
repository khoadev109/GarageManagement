import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const LoginReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LOGIN_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LOGIN_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const LogoutReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.LOGOUT_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.LOGOUT_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.LOGOUT_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=auth-reducer.js.map