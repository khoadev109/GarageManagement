import { ActionType } from "../action/action-type";
import * as CoreReducer from "../../../core/reducer";
export const GarageInformationReducer = (state = CoreReducer.ResponseState, action) => {
    switch (action.type) {
        case ActionType.GET_GARAGE_INFORMATION_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionType.GET_GARAGE_INFORMATION_SUCCESS:
            return Object.assign({}, state, { loading: false, target: action.result });
        case ActionType.GET_GARAGE_INFORMATION_ERROR:
            return Object.assign({}, state, { loading: false, error: action.error });
        default:
            return state;
    }
};
//# sourceMappingURL=fetch-reducer.js.map