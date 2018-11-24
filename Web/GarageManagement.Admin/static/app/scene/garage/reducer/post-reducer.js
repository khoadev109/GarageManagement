import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const GarageUpdateReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GARAGE_UPDATE_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GARAGE_UPDATE_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GARAGE_UPDATE_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=post-reducer.js.map