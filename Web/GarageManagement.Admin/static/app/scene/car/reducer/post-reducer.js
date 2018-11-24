import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const CarCreateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CAR_CREATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CAR_CREATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CAR_CREATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
export const CarDeleteReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.CAR_DELETE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.CAR_DELETE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.CAR_DELETE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map